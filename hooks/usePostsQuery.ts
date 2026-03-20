import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/types/post";

// 글 목록 전체를 가져온다. 
export const usePostsQuery = () => {
    return useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch("/api/posts");

            if ( !res.ok ) {
                throw new Error("posts fetch error");
            };

            return res.json();
        },
        staleTime: 1000 * 60 * 5,
    });
};