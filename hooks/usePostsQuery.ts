import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/types/post";
import { useFilterStore } from "./useFilterStore";

type PostsResponse = {
    ok: boolean;
    posts: Post[];
    pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
    };
};

const LIMIT = 12;

// 글 목록을 가져온다. 
export const usePostsQuery = () => {
    const selectedCategory = useFilterStore(state => state.selectedCategory);
    const selectedDate = useFilterStore(state => state.selectedDate);
    const searchText = useFilterStore(state => state.searchText);
    const page = useFilterStore(state => state.page);

    return useQuery<PostsResponse>({
        queryKey: ["posts", page, selectedCategory, selectedDate, searchText],
        queryFn: async () => {
            const params = new URLSearchParams();

            params.set("page", String(page));
            params.set("limit", String(LIMIT));

            if ( selectedCategory ) {
                params.set("category", selectedCategory);
            };

            if ( selectedDate ) {
                params.set("date", selectedDate);
            };

            if ( searchText.trim() ) {
                params.set("search", searchText.trim() );
            };

            const res = await fetch(`/api/posts?${params.toString()}`);

            if ( !res.ok ) {
                throw new Error("게시글을 불러오지 못했습니다.");
            };

            return res.json();
        },
        staleTime: 1000 * 60 * 5,
    });
};