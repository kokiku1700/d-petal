"use client";
import { useState } from "react";
import MyProfileSummary from "./MyProfileSummary";
import ProfileEditModal from "./ProfileEditModal";
import { SessionUser } from "@/lib/getSessionUser";

type Props = {
    user: SessionUser;
    children: React.ReactNode;
}

export default function ProfileEditController ({ user, children}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <MyProfileSummary 
                user={user} 
                openEditModal={() => setIsOpen(true)} />

            {children}

            {isOpen && 
                <ProfileEditModal 
                    user={user} 
                    closeEditModal={() => setIsOpen(false)}/>
            }
        </>
    )
}