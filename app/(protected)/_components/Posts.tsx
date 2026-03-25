"use client"

import { useFilterStore } from "@/hooks/useCategoryStore";
import { usePostsQuery } from "@/hooks/usePostsQuery"
import Post from "./Post";

export default function Posts () {
    const { data } = usePostsQuery();
    const { selectedCategory } = useFilterStore();
    const { selectedDate } = useFilterStore();

    const selectedPosts = data?.filter(post => {
        const matchCategory = 
            selectedCategory === null 
                ? true
                : post.category_name === selectedCategory;
        const matchDate = 
            selectedDate === null   
                ? true
                : post.activity_date.slice(0, 10) === selectedDate;
        
        return matchCategory && matchDate;
    });

    return (
        <ul 
            className="
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