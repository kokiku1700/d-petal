"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

type Props = {
    closeEditModal: () => void;
}

export default function ProfileImageEdit ( { closeEditModal }: Props ) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const queryClient = useQueryClient();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if ( !selectedFile ) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const imageUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ( !file ) return;
        
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("/api/profile/image", {
            method: "PATCH",
            body: formData,
        });

        if ( res.ok ) {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            closeEditModal();
            router.refresh();
            setFile(null);
            setPreview("");
        };
        
    };

    return (
        <form onSubmit={imageUpdate} className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <div 
                    className="
                        w-full flex justify-center
                        rounded-full
                        overflow-hidden">
                    {preview 
                        ? <Image 
                            src={preview} alt="미리보기" 
                            width={100} height={100} 
                            className="w-full object-cover"/>
                        : "미리보기"
                    }
                </div>
                <div className="w-full">
                    <input 
                        name="file" type="file"
                        accept="image/"
                        onChange={handleChange}
                        className="
                            p-5 rounded-xl
                            border border-dashed border-pink-300"/>
                </div>
            </div>
            <div className="w-[70%] mx-auto flex gap-3">
                <Button 
                    type="button" object="취소" variant="submit" onClick={closeEditModal}/>
                <Button 
                    type="submit" object="저장" variant="submit"/>
            </div>
        </form>
    )
}