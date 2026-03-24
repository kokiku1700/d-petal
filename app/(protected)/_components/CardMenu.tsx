import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

type Props = {
    postId: number;
    state: boolean;
    onClose: () => void;
}

export default function CardMenu ({ postId, state, onClose }: Props) {
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        // 모달로 바꾸기
        const answer = confirm("삭제하시겠습니까?");
        
        if ( answer ) {
            const res = await fetch(`/api/posts/${postId}`, {
                method: "DELETE"
            });

            if ( res.ok ) {
                await queryClient.invalidateQueries({ queryKey: ["posts"] });
            };
        };
    };

    return (
        <ul 
            className={`
                ${state ? "block" : "hidden"}
                absolute top-7 right-2
                p-2 whitespace-nowrap
                rounded-lg shadow-sm
                bg-white`}>
            <li 
                onClick={onClose}
                className="
                    p-1 rounded-lg 
                    cursor-pointer
                    hover:bg-gray-100">
                <Link href={`/app/write/${postId}/edit`}>
                    수정하기
                </Link>
            </li>
            <li 
                onClick={() => {onClose(); handleDelete()}}
                className="
                    p-1 rounded-lg 
                    cursor-pointer
                    hover:bg-gray-100">
                삭제하기
            </li>
        </ul>
    );
};