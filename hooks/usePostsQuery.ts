import { useQuery } from "@tanstack/react-query";

type Post = {
    post_id: number;
    title: string;
    content: string;
    activity_date: string;
    category_name: string;
    category_color: string;
}

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