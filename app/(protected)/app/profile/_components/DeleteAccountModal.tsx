"use client";

import Image from "next/image";
import close from "@/public/close.png";
import Input from "@/components/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    closeDeleteModal: () => void;
};

export default function DeleteAccountModal ({ closeDeleteModal }: Props) {
    const [deleteAccount, setDeleteAccount] = useState("");
    const router = useRouter();

    const handleDeleteAccount = async () => {
        const res = await fetch("/api/delete-account", {
            method: "DELETE",
        });

        if ( res.ok ) {
            router.replace("/");
            router.refresh();
        };
    }

    return (
        <div 
            className="
                fixed inset-0
                flex justify-center items-center 
                z-50
                bg-black/30">
            <div
                className="
                    w-[80%] max-w-2xl p-6
                    rounded-xl
                    bg-white">
                <div  
                    className="
                        flex justify-between items-center
                        px-2 pb-3
                        border-b border-gray-300">
                    <h2 
                        className="text-lg text-red-500 font-semibold ">
                        회원탈퇴
                    </h2>
                    <Image 
                        src={close} alt="닫기"
                        width={25}
                        onClick={() => closeDeleteModal()}
                        className="cursor-pointer" /> 
                </div>
                <p className="px-2 py-1">
                    탈퇴를 계속 진행하려면 아래에 <b className="font-semibold">"회원탈퇴"</b>를 입력해주세요
                </p>
                <Input 
                    name="delete" type="text" value={deleteAccount}
                    onChange={e => setDeleteAccount(e.target.value)}
                    variant="main"/>
                <div className="w-full flex justify-end pt-2">
                    <button 
                        onClick={handleDeleteAccount}
                        className="
                            p-2 
                            text-white
                            bg-red-500
                            cursor-pointer
                            disabled:bg-gray-200 disabled:cursor-default"
                        disabled={deleteAccount === "회원탈퇴" ? false : true }>
                        회원탈퇴
                    </button>
                </div>
            </div>
        </div>
    )
}