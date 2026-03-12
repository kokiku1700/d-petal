import { useQuery } from "@tanstack/react-query";

type Category = {
    category_id: number;
    user_id: number;
    name: string;
    color: string;
    is_defalut: boolean;
    sort_order: number;
    created_at: string;
}

export const useCategoriesQuery = () => {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("/api/categories");

            if ( !res.ok ) {
                throw new Error("카테고리 불러오기 실패");
            }

            return res.json();
        },
        staleTime: 1000 * 60 * 10,
    });
};