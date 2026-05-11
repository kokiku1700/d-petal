import { create } from "zustand";

type FilterStore = {
    selectedCategory: string | null;
    selectedDate: string | null;
    searchText: string;
    page: number;

    setCategory: (category: string | null) => void;
    setDate: (date: string | null) => void;
    setSearchText: (text: string) => void;
    setPage: (page: number) => void;
    resetFilter: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
    selectedCategory: null,
    selectedDate: null,
    searchText: "",
    page: 1,

    setCategory: category => set({ selectedCategory: category }),
    setDate: date => set({ selectedDate: date }),
    setSearchText: text => set({ searchText: text }),
    setPage: page => set({ page }),
    resetFilter: () => set({
        selectedDate: null,
    }),
}));