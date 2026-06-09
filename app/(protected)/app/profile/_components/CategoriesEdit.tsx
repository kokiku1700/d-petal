"use client";

import { HexColorPicker } from "react-colorful"
import { useState } from "react";
import Input from "@/components/Input";
import { useCategoriesChartQuery } from "@/hooks/useCategoriesChartQuery";
import Button from "@/components/Button";
import { useQueryClient } from "@tanstack/react-query";

export default function CategoriesEdit () {
    const { data } = useCategoriesChartQuery();
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("#e812d6")
    const queryClient = useQueryClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                color: color,
                category: category,
            }),
        });

        if ( res.ok ) {
            await queryClient.invalidateQueries({queryKey: ["categories"]});
            alert(`${category} 카테고리가 추가되었습니다.`);
            setCategory("");
            setColor("#e812d6");
        };
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="
                w-full flex-col p-2
                border-1 border-gray-400 
                rounded-xl bg-white">
            <header 
                className="
                    flex justify-between items-center
                    w-full pl-5 py-1 
                    border-b border-gray-300
                    lg:py-2 ">
                <h1 
                    className="
                        text-lg font-bold 
                        lg:text-xl">
                    카테고리 수정
                </h1>
                <span className="w-[30%] lg:w-[15%]">
                    <Button type="submit" object="저장" variant="submit" />
                </span>
            </header>
            <div className="flex flex-col lg:flex-row">
                <ul 
                    className="
                        basis-2/5 p-2
                        flex flex-wrap justify-center items-center gap-2">
                    {data?.map(c => (
                        <li 
                            key={c.id}
                            style={{ backgroundColor: c.color }}
                            className="
                                px-4 py-2
                                rounded-full">
                            {c.name} 
                        </li>
                    ))}
                </ul>
                <div className="basis-3/5 p-2 flex flex-col gap-2">
                    <div className="flex flex-col items-center lg:flex-row">
                        <div className="w-full flex flex-col gap-3">
                            <div 
                                className="
                                    w-full flex items-center gap-2
                                    mx-auto
                                    md:w-[70%]
                                    lg:w-full">
                                <label className="font-semibold whitespace-nowrap">
                                    카테고리 이름
                                </label>
                                <Input 
                                    name="category" type="text" 
                                    value={category} 
                                    variant="main"
                                    onChange={(e) => setCategory(e.target.value)} />    
                            </div>
                            <output
                                style={{ backgroundColor: `${color}20` }}
                                className="min-h-16 p-5">
                                {category}
                            </output>
                            <p className="pl-2">※투명도가 적용된 상태입니다.</p>
                        </div>
                        
                        <div className="w-full flex flex-col items-center text-center gap-1">
                            <HexColorPicker color={color} onChange={setColor} />
                            <output 
                                style={{ color: color }}
                                className="text-xl font-semibold italic">{color}</output>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};