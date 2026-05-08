"use client";

import { SessionUser } from "@/lib/getSessionUser"
import close from "@/public/close.png";
import Image from "next/image";
import { useProfileEditTabStore } from "@/hooks/useProfileEditTabStore";
import ProfileInfoEdit from "./ProfileInfoEdit";
import ProfileImageEdit from "./ProfileImageEdit";
import PasswordEdit from "./PasswordEdit";

type Props = {
    user: SessionUser;
    closeEditModal: () => void;
};

const tabs = [
    {key: "info", label: "기본 정보"},
    {key: "image", label: "프로필 사진"},
    {key: "password", label: "비밀번호"},
] as const;

export default function ProfileEditModal ( { user, closeEditModal }: Props ) {
    const selectedTab = useProfileEditTabStore(state => state.selectedTab);
    const setSelectedTab = useProfileEditTabStore(state => state.setSelectedTab);

    return (
        <div 
            className="
                fixed inset-0
                flex justify-center items-center 
                z-50
                bg-black/30">
            <div
                className="
                    w-[80%] max-w-4xl p-6
                    rounded-xl
                    bg-white">
                <div 
                    className="
                        flex justify-between items-center
                        px-2 pb-3
                        border-b border-gray-300">
                    <h2 className="text-lg font-semibold">프로필 수정</h2>
                    <Image 
                        src={close} alt="닫기"
                        width={25}
                        onClick={() => {closeEditModal(); setSelectedTab("info")}}
                        className="cursor-pointer" />  
                </div>
                <div className="flex items-center pt-2">
                    <aside className="basis-2/7">
                        {tabs.map(tab => (
                            <button
                                key={tab.key} type="button"
                                onClick={() => setSelectedTab(tab.key)}
                                className={`
                                    relative
                                    w-full mb-2 px-4 py-3 
                                    text-md font-medium
                                    rounded-lg 
                                    cursor-pointer
                                    ${selectedTab === tab.key 
                                        ? "bg-fuchsia-50 text-fuchsia-700"
                                        : "text-gray-500 hover:bg-gray-50"
                                    }`}>
                                {tab.label}
                                <span 
                                    className={` 
                                        ${selectedTab === tab.key
                                            ? "absolute top-0 right-0 p-1 h-full bg-pink-300"
                                            : null
                                        }`}/>
                            </button>
                        ))}
                    </aside>
                    <section className="basis-5/7 p-4">
                        {selectedTab === "info" && <ProfileInfoEdit user={user} closeEditModal={closeEditModal} />}
                        {selectedTab === "image" && <ProfileImageEdit closeEditModal={closeEditModal} />}
                        {selectedTab === "password" && <PasswordEdit user={user} closeEditModal={closeEditModal} />}
                    </section>
                </div>
            </div>
        </div>
    );
};