"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { SessionUser } from "@/lib/getSessionUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    user: SessionUser;
    closeEditModal: () => void;
};

export default function ProfileInfoEdit ({ user, closeEditModal }: Props) {
    const [nickname, setNickname] = useState(user.user_nickname);
    const [bio, setBio] = useState(user.user_bio);
    const [message, setMessage] = useState("");
    const [nicknameState, setNicknameState] = useState(false);
    const router = useRouter();
    
    const handleNicknameCheck = async () => {
        const res = await fetch(`/api/nickname-check/profile?nickname=${encodeURIComponent(nickname)}&id=${user.user_id}`);
        const data = await res.json();

        console.log(data);

        if ( !data.isDuplicate ) {
            setNicknameState(true);
            setMessage("사용 가능합니다.");
        } else {
            setNicknameState(false);
            setMessage("이미 존재하는 닉네임입니다.");
        };
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/profile/my-info", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                bio: bio,
                nickname: nickname,
            }),
        });

        if ( res.ok ) {
            closeEditModal();
            router.refresh();         
        };
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold">
                    문구
                </label>
                <textarea 
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="
                        p-2
                        rounded-xl border border-gray-600
                        resize-none
                        focus:outline-none
                        focus:ring focus:ring-[#e5c9dd] 
                        focus:border-[#e5c9dd]" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">
                    닉네임
                </label>
                <div className="flex gap-2">
                    <Input 
                        name="nickname" type="text" 
                        value={nickname} 
                        onChange={e =>setNickname(e.target.value)}
                        variant="signup"/>
                    <span className="basis-2/5">
                        <Button type="button" object="중복" variant="submit" onClick={handleNicknameCheck} />
                    </span>
                </div>
                <p className={`${nicknameState ? "text-green-400" : "text-red-400"}`}>
                    {message}
                </p>
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