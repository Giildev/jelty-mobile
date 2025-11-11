/**
 * Grocery Store
 *
 * Zustand store for managing grocery list state with persistence
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GroceryItem,
  GroceryViewMode,
  StorageType,
  AddCustomItemFormData,
} from "@/types/grocery";
import { MOCK_GROCERY_ITEMS } from "@/constants/mockData";
import { generateGroceryItemId } from "@/utils/groceryHelpers";

/**
 * Grocery store state and actions
 */
interface GroceryStoreState {
  // State
  items: GroceryItem[];
  viewMode: GroceryViewMode;
  storageFilter: StorageType | "all";

  // Actions
  setViewMode: (mode: GroceryViewMode) => void;
  setStorageFilter: (filter: StorageType | "all") => void;
  toggleItemCheck: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  addCustomItem: (itemData: AddCustomItemFormData) => void;
  removeItem: (itemId: string) => void;
  resetItems: () => void;
  clearCheckedItems: () => void;
}

/**
 * Grocery store with persistence
 */
export const useGroceryStore = create<GroceryStoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: MOCK_GROCERY_ITEMS,
      viewMode: "all",
      storageFilter: "all",

      // Actions
      setViewMode: (mode: GroceryViewMode) => {
        set({ viewMode: mode });
      },

      setStorageFilter: (filter: StorageType | "all") => {
        set({ storageFilter: filter });
      },

      toggleItemCheck: (itemId: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
          ),
        }));
      },

      updateItemQuantity: (itemId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity, customQuantity: quantity }
              : item
          ),
        }));
      },

      addCustomItem: (itemData: AddCustomItemFormData) => {
        const currentItems = get().items;
        const newId = generateGroceryItemId(currentItems);

        const newItem: GroceryItem = {
          id: newId,
          ingredientId: `custom-${newId}`,
          name: itemData.name,
          quantity: itemData.quantity,
          unit: itemData.unit,
          category: itemData.category,
          purchaseFrequency: itemData.purchaseFrequency,
          storageType: itemData.storageType,
          isChecked: false,
          isCustom: true,
        };

        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      resetItems: () => {
        set({
          items: MOCK_GROCERY_ITEMS,
          viewMode: "all",
          storageFilter: "all",
        });
      },

      clearCheckedItems: () => {
        set((state) => ({
          items: state.items.filter((item) => !item.isChecked),
        }));
      },
    }),
    {
      name: "grocery-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
