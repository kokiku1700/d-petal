"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import Refresh from "@/components/Refresh";
import { useCategoriesChartQuery } from "@/hooks/useCategoriesChartQuery"
import { useFilterStore } from "@/hooks/useFilterStore";

export default function CategoriesTop3 () {
    const { data, isLoading, isError, refetch } = useCategoriesChartQuery();
    const top3 = data?.slice(0, 3).filter(top => top.value > 0) || [];
    const { selectedCategory, setCategory } = useFilterStore();

    if ( isLoading ) return <LoadingSpinner height="full" />

    if ( isError ) return <Refresh onClick={refetch} />

    return (
        <section 
            className={`
                w-full 
                rounded-lg
                bg-white shadow-md 
                ${top3[0] ? `shadow-[${top3[0].color}]` : "shadow-gray-200 text-center"}`}>
            <ol>
                {top3?.length > 0 ?
                top3?.map((top, idx) => (
                    <li 
                        key={top.id}
                        onClick={() => setCategory(top.name)}
                        className={`
                            ${selectedCategory === top.name ? "border" : ""}`}>
                        {idx + 1}.{top.name}
                    </li>
                ))
                :
                <p>기록을 남겨주세요.</p>
                }
            </ol> 
        </section>
    )
}