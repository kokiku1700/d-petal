"use client"

import { useCategoriesQuery } from "@/hooks/useCategoriesQuery"
import { useCategoryStore } from "@/hooks/useCategoryStore";

export default function Categories () {
    const allCategory = {
        category_id: 0,
        name: "전체",
        color: "#fee1e8",
    };
    const { data } = useCategoriesQuery();
    const { selectedCategory, setCategory } = useCategoryStore();


    return (
        <ul className="w-full">
            <li 
                key={allCategory.category_id}
                onClick={() => setCategory(null)}
                    style={{ background: allCategory.color }}
                    className={`
                        py-5 
                        text-center cursor-pointer
                        ${selectedCategory === null ? "border-1" : ""}`}>
                {allCategory.name}
            </li>
            {data?.map((category) => (
                <li 
                    key={category.category_id}
                    onClick={() => setCategory(category.name)}
                    style={{ background: category.color }}
                    className={`
                        py-5 
                        text-center cursor-pointer
                        ${selectedCategory === category.name ? "border-1" : ""}`}>
                    {category.name}
                </li>  
            ))}
        </ul>
    )
}