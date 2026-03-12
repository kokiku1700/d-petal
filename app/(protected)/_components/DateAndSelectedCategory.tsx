"use client"

import { useCategoryStore } from "@/hooks/useCategoryStore"

export default function DateAndSelectedCategory () {
    const { selectedCategory } = useCategoryStore();

    return (
        <>
            {selectedCategory === null ? "전체" : selectedCategory}
        </>
    )
}