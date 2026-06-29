"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import Refresh from "@/components/Refresh";
import { useCategoriesChartQuery } from "@/hooks/useCategoriesChartQuery";
import { useFilterStore } from "@/hooks/useFilterStore";

export default function Categories () {
    const { data, isLoading, isError, refetch } = useCategoriesChartQuery();
    const { selectedCategory, setCategory } = useFilterStore();
    const totalCategory = data?.reduce((acc, cur) => acc + Number(cur.value), 0) ?? 0;
    const allCategory = {
        category_id: 0,
        name: "전체",
        color: "#fee1e8",
    };

    if ( isLoading ) return <LoadingSpinner height="full" />;

    if ( isError ) return <Refresh onClick={refetch} />;

    return (
        <ul 
            className="
                w-full grid grid-cols-2 gap-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:flex xl:flex-col">
            <li 
                key={allCategory.category_id}
                onClick={() => setCategory(null)}
                    style={{ 
                        background: selectedCategory === null ? `linear-gradient(135deg, ${allCategory.color}10, ${allCategory.color}90)` : `${allCategory.color}20`, 
                        boxShadow: selectedCategory === null ? `0px 4px 2px ${allCategory.color}` : undefined
                    }}
                    className={`
                        w-full py-5 
                        text-center cursor-pointer transition`}>
                {allCategory.name}
                <span className="ml-1">({totalCategory})</span>
            </li>
            {data?.map((category) => (
                <li 
                    key={category.id}
                    onClick={() => setCategory(category.name)}
                    style={{ 
                        background: selectedCategory === category.name ? `linear-gradient(135deg, ${category.color}10, ${category.color}90)` : `${category.color}20`,
                        boxShadow: selectedCategory === category.name ? `0px 4px 2px ${category.color}` : undefined
                    }}
                    className={`
                        w-full py-5 
                        text-center cursor-pointer transition`}>
                    {category.name}
                    <span className="ml-1">({category.value})</span>
                </li>  
            ))}
        </ul>
    )
}