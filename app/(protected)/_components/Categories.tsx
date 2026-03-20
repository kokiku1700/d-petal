"use client"

import { useCategoriesChartQuery } from "@/hooks/useCategoriesChartQuery";
import { useCategoryStore } from "@/hooks/useCategoryStore";

export default function Categories () {
    const { data } = useCategoriesChartQuery();
    const { selectedCategory, setCategory } = useCategoryStore();
    const totalCategory = data?.reduce((acc, cur) => acc + Number(cur.value), 0) ?? 0;
    const allCategory = {
        category_id: 0,
        name: "전체",
        color: "#fee1e8",
    };

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
                <span className="ml-1">({totalCategory})</span>
            </li>
            {data?.map((category) => (
                <li 
                    key={category.id}
                    onClick={() => setCategory(category.name)}
                    style={{ background: category.color }}
                    className={`
                        py-5 
                        text-center cursor-pointer
                        ${selectedCategory === category.name ? "border-1" : ""}`}>
                    {category.name}
                    <span className="ml-1">({category.value})</span>
                </li>  
            ))}
        </ul>
    )
}