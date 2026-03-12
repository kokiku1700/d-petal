"use client"

import { useCategoryStore } from "@/hooks/useCategoryStore";
import { usePostsQuery } from "@/hooks/usePostsQuery"

export default function Posts () {
    const { data } = usePostsQuery();
    const { selectedCategory } = useCategoryStore();
    const selectedPosts = selectedCategory === null ? data : data?.filter(post => post.category_name === selectedCategory);
    
    return (
        <ul className="w-full">
            {selectedPosts?.map((post) => (
                <li
                    key={post.post_id}>
                    {post.title}
                </li>
            ))}
        </ul>
    )
}