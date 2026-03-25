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
import { generateGroceryItemId } from "@/utils/groceryHelpers";
import { fetchLatestGroceryList, toggleGroceryItem } from "@/services/api/grocery";

/**
 * Grocery store state and actions
 */
interface GroceryStoreState {
  // State
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  toggleItemCheck: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  addCustomItem: (itemData: AddCustomItemFormData) => void;
  removeItem: (itemId: string) => void;
  resetItems: () => void;
  clearCheckedItems: () => void;
  fetchItems: (userId: string) => Promise<void>;
  toggleItem: (itemId: string, userId: string) => Promise<void>;
}

/**
 * Grocery store with persistence
 */
export const useGroceryStore = create<GroceryStoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isLoading: false,
      error: null,

      // Actions

      toggleItemCheck: (itemId: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
          ),
        }));
      },

      toggleItem: async (itemId: string, userId: string) => {
        // Optimistic update
        const previousItems = get().items;
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
          ),
        }));

        try {
          await toggleGroceryItem(itemId, userId);
        } catch (error) {
          // Rollback on error
          set({ items: previousItems });
          console.error("Failed to toggle grocery item:", error);
        }
      },

      fetchItems: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const items = await fetchLatestGroceryList(userId);
          set({ items, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch grocery list",
            isLoading: false
          });
        }
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
          items: [],
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
