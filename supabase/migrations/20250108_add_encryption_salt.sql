-- Migración: Agregar campo encryption_salt a user_user
-- Este campo guarda el salt único de cada usuario para derivar la clave de encriptación

-- Agregar columna encryption_salt
ALTER TABLE user_user
ADD COLUMN encryption_salt TEXT;

-- Comentario para documentar el propósito del campo
COMMENT ON COLUMN user_user.encryption_salt IS 'Salt único del usuario usado para derivar la clave de encriptación (AES-256). Se combina con la master key para encriptar datos sensibles.';
