"use client"

import { useMeQuery } from "@/hooks/useMeQuery"

export default function Profile () {
    const { data } = useMeQuery();

    const onClick = () => {
        console.log(data);
    }

    return (
        <aside 
            onClick={onClick} 
            className="
                w-full flex gap-2
                p-3">
            <span>
                사진
            </span>
            <span>
                {data.user.user_nickname}
            </span>
        </aside>
    )
}