import CryptoJS from "crypto-js";
import * as Crypto from "expo-crypto";

/**
 * Servicio de Encriptación con Clave Maestra + Salt por Usuario
 *
 * Arquitectura:
 * - Clave maestra almacenada en EXPO_PUBLIC_ENCRYPTION_KEY (.env)
 * - Cada usuario tiene un salt único guardado en BD
 * - Clave de encriptación real = deriv(MASTER_KEY + SALT + USER_ID)
 *
 * Seguridad:
 * - Aunque roben la clave maestra, necesitan también el salt específico
 * - El usuario NO pierde datos al desinstalar la app
 * - Los datos en BD están encriptados y solo descifrables con master key + salt
 */

const MASTER_KEY = process.env.EXPO_PUBLIC_ENCRYPTION_KEY;

if (!MASTER_KEY) {
  console.warn("⚠️ EXPO_PUBLIC_ENCRYPTION_KEY no está configurada. La encriptación NO funcionará.");
}

/**
 * Genera un salt aleatorio de 32 bytes (64 caracteres hex)
 * Este salt se guarda en la BD junto al usuario
 */
export function generateUserSalt(): string {
  const randomBytes = Crypto.getRandomBytes(32);
  return Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Deriva una clave de encriptación única por usuario
 * Combina: MASTER_KEY + USER_SALT + USER_ID
 *
 * @param userSalt - Salt único del usuario (guardado en BD)
 * @param userId - ID del usuario (clerk_user_id o supabase uuid)
 * @returns Clave derivada de 256 bits para AES
 */
function deriveEncryptionKey(userSalt: string, userId: string): string {
  if (!MASTER_KEY) {
    throw new Error("Master encryption key not configured");
  }

  // Combinar master key + salt + userId para generar clave única
  const combined = `${MASTER_KEY}-${userSalt}-${userId}`;

  // Derivar clave usando PBKDF2 (más seguro que simple hash)
  const key = CryptoJS.PBKDF2(combined, userSalt, {
    keySize: 256 / 32, // 256 bits
    iterations: 1000,
  });

  return key.toString();
}

/**
 * Encripta datos usando AES-256-CBC
 *
 * @param data - Dato a encriptar (string, number, object)
 * @param userSalt - Salt del usuario
 * @param userId - ID del usuario
 * @returns String encriptado en base64
 */
export function encryptData(
  data: string | number | object | null | undefined,
  userSalt: string,
  userId: string
): string | null {
  try {
    // Si el dato es null/undefined, retornar null
    if (data === null || data === undefined) {
      return null;
    }

    const key = deriveEncryptionKey(userSalt, userId);

    // Convertir a string si es necesario
    const dataString = typeof data === "object" ? JSON.stringify(data) : String(data);

    // Generar IV aleatorio usando expo-crypto (compatible con React Native)
    const ivBytes = Crypto.getRandomBytes(16);
    const ivWordArray = CryptoJS.lib.WordArray.create(ivBytes);

    // Encriptar usando AES-256-CBC
    const encrypted = CryptoJS.AES.encrypt(dataString, CryptoJS.enc.Hex.parse(key), {
      iv: ivWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Retornar IV + Encrypted en base64 (separados por :)
    return `${ivWordArray.toString(CryptoJS.enc.Base64)}:${encrypted.toString()}`;
  } catch (error) {
    console.error("Error encrypting data:", error);
    throw new Error("Encryption failed");
  }
}

/**
 * Desencripta datos encriptados con AES-256-CBC
 *
 * @param encryptedData - String encriptado en formato "IV:CIPHERTEXT"
 * @param userSalt - Salt del usuario
 * @param userId - ID del usuario
 * @returns Dato desencriptado (tipo original)
 */
export function decryptData(
  encryptedData: string | null | undefined,
  userSalt: string,
  userId: string
): any {
  try {
    // Si no hay dato encriptado, retornar null
    if (!encryptedData) {
      return null;
    }

    const key = deriveEncryptionKey(userSalt, userId);

    // Separar IV y ciphertext
    const [ivBase64, ciphertext] = encryptedData.split(":");

    if (!ivBase64 || !ciphertext) {
      throw new Error("Invalid encrypted data format");
    }

    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    // Desencriptar
    const decrypted = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Hex.parse(key), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      // String vacío es válido (campos como first_name/last_name pueden estar vacíos)
      return "";
    }

    // Intentar parsear como JSON si es un objeto
    try {
      return JSON.parse(decryptedString);
    } catch {
      // Si no es JSON, retornar como string
      return decryptedString;
    }
  } catch (error) {
    console.error("Error decrypting data:", error);
    throw new Error("Decryption failed");
  }
}

/**
 * Encripta todos los campos sensibles de un usuario
 *
 * Campos encriptados:
 * - first_name, last_name
 * - phone
 * - birth_date
 * - height_cm, weight_kg, bodyfat_percentage
 * - country, city, address, zip_code, country_code
 *
 * @param userData - Datos del usuario sin encriptar
 * @param userSalt - Salt único del usuario
 * @param userId - ID del usuario
 * @returns Datos con campos encriptados
 */
export function encryptUserFields(
  userData: Record<string, any>,
  userSalt: string,
  userId: string
): Record<string, any> {
  const encryptedData = { ...userData };

  // Lista de campos a encriptar
  const fieldsToEncrypt = [
    "first_name",
    "last_name",
    "phone",
    "birth_date",
    "height_cm",
    "weight_kg",
    "bodyfat_percentage",
    "country",
    "city",
    "address",
    "zip_code",
    "country_code",
  ];

  fieldsToEncrypt.forEach((field) => {
    if (field in userData) {
      encryptedData[field] = encryptData(userData[field], userSalt, userId);
    }
  });

  return encryptedData;
}

/**
 * Desencripta todos los campos sensibles de un usuario
 *
 * @param encryptedData - Datos del usuario encriptados
 * @param userSalt - Salt único del usuario
 * @param userId - ID del usuario
 * @returns Datos con campos desencriptados
 */
export function decryptUserFields(
  encryptedData: Record<string, any>,
  userSalt: string,
  userId: string
): Record<string, any> {
  const decryptedData = { ...encryptedData };

  // Lista de campos a desencriptar
  const fieldsToDecrypt = [
    "first_name",
    "last_name",
    "phone",
    "birth_date",
    "height_cm",
    "weight_kg",
    "bodyfat_percentage",
    "country",
    "city",
    "address",
    "zip_code",
    "country_code",
  ];

  // Campos que deben ser strings (no números) después de desencriptar
  const stringFields = ["phone", "zip_code", "country_code"];

  // Campos numéricos que deben parsearse como number
  const numericFields = ["height_cm", "weight_kg", "bodyfat_percentage"];

  fieldsToDecrypt.forEach((field) => {
    if (field in encryptedData && encryptedData[field] !== null) {
      try {
        const decrypted = decryptData(encryptedData[field], userSalt, userId);

        // Asegurar que campos de texto se retornen como string
        if (stringFields.includes(field)) {
          decryptedData[field] = String(decrypted);
        }
        // Campos numéricos como number
        else if (numericFields.includes(field)) {
          decryptedData[field] = decrypted ? Number(decrypted) : null;
        }
        // Otros campos (first_name, last_name, etc.) mantener tipo original
        else {
          decryptedData[field] = decrypted;
        }
      } catch (error) {
        console.error(`Error decrypting field ${field}:`, error);
        // En caso de error, dejar el valor encriptado (no crashear)
        decryptedData[field] = null;
      }
    }
  });

  return decryptedData;
}

/**
 * Encripta todos los campos sensibles de objetivos del usuario
 *
 * Campos encriptados:
 * - target_weight_kg
 * - target_bodyfat_pct
 * - timeframe
 *
 * @param goalData - Datos del objetivo sin encriptar
 * @param userSalt - Salt único del usuario
 * @param userId - ID del usuario
 * @returns Datos con campos encriptados
 */
export function encryptGoalFields(
  goalData: Record<string, any>,
  userSalt: string,
  userId: string
): Record<string, any> {
  const encryptedData = { ...goalData };

  // Lista de campos a encriptar
  const fieldsToEncrypt = ["target_weight_kg", "target_bodyfat_pct", "timeframe"];

  fieldsToEncrypt.forEach((field) => {
    if (field in goalData) {
      encryptedData[field] = encryptData(goalData[field], userSalt, userId);
    }
  });

  return encryptedData;
}

/**
 * Desencripta todos los campos sensibles de objetivos del usuario
 *
 * @param encryptedData - Datos del objetivo encriptados
 * @param userSalt - Salt único del usuario
 * @param userId - ID del usuario
 * @returns Datos con campos desencriptados
 */
export function decryptGoalFields(
  encryptedData: Record<string, any>,
  userSalt: string,
  userId: string
): Record<string, any> {
  const decryptedData = { ...encryptedData };

  // Lista de campos a desencriptar
  const fieldsToDecrypt = ["target_weight_kg", "target_bodyfat_pct", "timeframe"];

  // Campos numéricos
  const numericFields = ["target_weight_kg", "target_bodyfat_pct"];

  fieldsToDecrypt.forEach((field) => {
    if (field in encryptedData && encryptedData[field] !== null) {
      try {
        const decrypted = decryptData(encryptedData[field], userSalt, userId);

        // Campos numéricos como number
        if (numericFields.includes(field)) {
          decryptedData[field] = decrypted ? Number(decrypted) : null;
        }
        // Otros campos mantener tipo original
        else {
          decryptedData[field] = decrypted;
        }
      } catch (error) {
        console.error(`Error decrypting field ${field}:`, error);
        decryptedData[field] = null;
      }
    }
  });

  return decryptedData;
}

/**
 * Encripta todos los campos de medidas corporales objetivo
 *
 * Campos encriptados:
 * - chest_cm, waist_cm, hips_cm, biceps_cm, thighs_cm
 * - neck_cm, shoulders_cm, forearms_cm, calves_cm
 *
 * @param bodyGoalData - Datos de medidas corporales sin encriptar
 * @param userSalt - Salt único del usuario
 * @param userId - ID del usuario
 * @returns Datos con campos encriptados
 */
export function encryptBodyGoalFields(
  bodyGoalData: Record<string, any>,
  userSalt: string,
  userId: string
): Record<string, any> {
  const encryptedData = { ...bodyGoalData };

  // Lista de campos a encriptar
  const fieldsToEncrypt = [
    "chest_cm",
    "waist_cm",
    "hips_cm",
    "biceps_cm",
    "thighs_cm",
    "neck_cm",
    "shoulders_cm",
    "forearms_cm",
    "calves_cm",
  ];

  fieldsToEncrypt.forEach((field) => {
    if (field in bodyGoalData) {
      encryptedData[field] = encryptData(bodyGoalData[field], userSalt, userId);
    }
  });

  return encryptedData;
}

/**
 * Desencripta todos los campos de medidas corporales objetivo
 *
 * @param encryptedData - Datos de medidas corporales encriptadas
 * @param userSalt - Salt único del usuario
 * @param userId - ID del usuario
 * @returns Datos con campos desencriptados
 */
export function decryptBodyGoalFields(
  encryptedData: Record<string, any>,
  userSalt: string,
  userId: string
): Record<string, any> {
  const decryptedData = { ...encryptedData };

  // Lista de campos a desencriptar (todos son numéricos)
  const fieldsToDecrypt = [
    "chest_cm",
    "waist_cm",
    "hips_cm",
    "biceps_cm",
    "thighs_cm",
    "neck_cm",
    "shoulders_cm",
    "forearms_cm",
    "calves_cm",
  ];

  fieldsToDecrypt.forEach((field) => {
    if (field in encryptedData && encryptedData[field] !== null) {
      try {
        const decrypted = decryptData(encryptedData[field], userSalt, userId);
        // Todos son numéricos
        decryptedData[field] = decrypted ? Number(decrypted) : null;
      } catch (error) {
        console.error(`Error decrypting field ${field}:`, error);
        decryptedData[field] = null;
      }
    }
  });

  return decryptedData;
}
