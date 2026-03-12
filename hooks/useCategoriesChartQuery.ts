import { useQuery } from "@tanstack/react-query";

export type CategoryChartItem = {
    id: number,
    name: string;
    value: number;
    color: string;
};

export const useCategoriesChartQuery = () => {
    return useQuery<CategoryChartItem[]>({
        queryKey: ["category-chart"],
        queryFn: async () => {
            const res = await fetch("/api/category-chart");

            if ( !res.ok ) {
                throw new Error("카테고리 차트를 불러오지 못했습니다.");
            };

            return res.json();
        },
        staleTime: 1000 * 60 * 5,
    });
};