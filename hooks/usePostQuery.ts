import { Post } from "@/types/post"
import { useQuery } from "@tanstack/react-query"


export const usePostQuery = (id: string) => {
    return useQuery<Post>({
        queryKey: ["post"],
        queryFn: async () => {
            const res = await fetch(`/api/posts/${id}`, {
                method: "GET",
            });

            if ( !res.ok ) {
                throw new Error("post fetch error");
            };

            const post = await res.json();

            return post.rows;
        },
        staleTime: 1000 * 60 * 5,
    });
};