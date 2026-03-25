"use client"

import { useFilterStore } from "@/hooks/useCategoryStore"

export default function DateAndSelectedCategory () {
    const { selectedCategory } = useFilterStore();

    return (
        <>
            {selectedCategory === null ? "전체" : selectedCategory}
        </>
    )
}