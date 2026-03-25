import { create } from "zustand";

type FilterStore = {
    selectedCategory: string | null;
    selectedDate: string | null;
    searchText: string;

    setCategory: (category: string | null) => void;
    setDate: (date: string | null) => void;
    setSearchText: (text: string) => void;
    resetFilter: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
    selectedCategory: null,
    selectedDate: null,
    searchText: "",

    setCategory: category => set({ selectedCategory: category }),
    setDate: date => set({ selectedDate: date }),
    setSearchText: text => set({ searchText: text }),
    resetFilter: () => set({
        selectedDate: null,
    }),
}));