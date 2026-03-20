"use client"

import { useCategoryStore } from "@/hooks/useCategoryStore";
import { usePostsQuery } from "@/hooks/usePostsQuery"
import Post from "./Post";

export default function Posts () {
    const { data } = usePostsQuery();
    const { selectedCategory } = useCategoryStore();
    const selectedPosts = selectedCategory === null ? data : data?.filter(post => post.category_name === selectedCategory);


    return (
        <ul className="
            w-full px-2
            grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {selectedPosts?.map((post) => (
                <li
                    key={post.post_id}>
                    <Post data={post} />
                </li>
            ))}
        </ul>
    )
}