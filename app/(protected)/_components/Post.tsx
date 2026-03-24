import { emotionsObj } from "@/constant/emotions";
import type { Post } from "@/types/post"
import Image from "next/image";
import cardMenu from "@/public/cardMenu.png";
import CardMenu from "./CardMenu";
import { useEffect, useRef, useState } from "react";

type Props = {
    data: Post;
}

// 카테고리 텍스트를 배경보다 진하게 만들어주기 위한 함수.
function darkenColor ( hex: string, amount = 40 ) {
    if ( !hex ) {
        return;
    };
    
    const num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) - amount;
    let g = ((num >> 8) & 0x00ff) - amount;
    let b = (num & 0x0000ff) - amount;

    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);

    const newColor = "#" + [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("");

    return newColor;
};

export default function Post ({ data }: Props) {
    const [menuToggleState, setMenuToggleState] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuToggle = () => {
        setMenuToggleState(!menuToggleState);
    };

    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if ( menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuToggleState(false);
            };
        };

        document.addEventListener("mousedown", handleClickOutSide);

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, []);

    return (
        <article 
            style={
                {
                    boxShadow: `0px 4px 10px ${data.category_color}`, 
                    backgroundColor: `${data.category_color}10`
                }
            }
            className={`
                w-full max-w-[500px] p-3
                flex flex-col gap-3
                rounded-lg bg-white
                `}>
            <div className="relative flex gap-1">
                <span
                    style={{color: darkenColor(data.category_color)}}
                    className="font-black">
                    {data.category_name}
                </span>
                <span className="text-gray-600">{`(${data.activity_date.slice(0, 10)})`}</span>
                <div ref={menuRef} className="absolute top-0 right-0 cursor-pointer">
                    <Image 
                        src={cardMenu} alt="menu" 
                        onClick={handleMenuToggle}/>
                    <CardMenu 
                        postId={data.post_id}
                        state={menuToggleState} 
                        onClose={() => setMenuToggleState(false)} />
                </div> 
            </div>  
            <h1 className="text-xl font-bold truncate">{data.title}</h1>
            <div 
                style={
                    {
                        backgroundColor: `${data.category_color}40`,
                        border: `2px solid ${data.category_color}`
                    }
                }
                className="
                w-fit px-3 py-1
                flex justify-center items-center gap-1 
                rounded-4xl">
                <span>{emotionsObj[data.emotion].emoji}</span>
                <span>{emotionsObj[data.emotion].label}</span>
            </div>
            <p className="truncate">{data.content}</p>
            <span 
                className="
                    p-1
                    text-gray-300
                    border-t border-gray-200">
                작성일: {data.created_at.slice(0, 10)}
            </span>
        </article>
    )
}