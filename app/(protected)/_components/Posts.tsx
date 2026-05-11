"use client"

import { useFilterStore } from "@/hooks/useFilterStore";
import { usePostsQuery } from "@/hooks/usePostsQuery"
import Post from "./Post";

export default function Posts () {
    const { data, isLoading, isError } = usePostsQuery();
    const page = useFilterStore(state => state.page);
    const setPage = useFilterStore(state => state.setPage);

    if ( isLoading ) {
        return <p>기록을 불러오는 중입니다.</p>
    };

    if ( isError ) {
        return <p>기록을 불러오지 못했습니댜.</p>
    };

    const posts = data?.posts ?? [];
    const pagination = data?.pagination;

    return (
        <div className="min-h-[655px]">
            <ul 
                className="
                    w-full px-2
                    grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                {posts?.map((post) => (
                    <li
                        key={post.post_id}>
                        <Post data={post} />
                    </li>
                ))}
            </ul>

            {posts.length === 0 && (
                <p>
                    조건에 맞는 기록이 없습니다.
                </p>
            )}

            {pagination && pagination.totalPages > 1 && (
                <div className="w-full flex gap-2 items-center m-2">
                    <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="
                            px-1 rounded border 
                            bg-white
                            cursor-pointer
                            disabled:bg-gray-300
                            disabled:opacity-40
                            disabled:cursor-default">
                        이전
                    </button>

                    <span>
                        {page} / {pagination.totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage(page + 1)}
                        className="
                            px-1 rounded border 
                            bg-white
                            cursor-pointer
                            disabled:bg-gray-300
                            disabled:opacity-40
                            disabled:cursor-default">
                        다음
                    </button>
                </div>
            )}
        </div>
        
    )
}