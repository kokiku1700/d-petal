import { create } from "zustand";

type CategoryStore = {
    selectedCategory: string | null;
    setCategory: (category: string | null) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
    selectedCategory: null,
    setCategory: category => set({ selectedCategory: category })
}));