"use client";

import { useState } from "react";
import MyProfileSummary from "./MyProfileSummary";
import ProfileEditModal from "./ProfileEditModal";
import { SessionUser } from "@/lib/getSessionUser";
import DeleteAccountModal from "./DeleteAccountModal";
import MyInfo from "./MyInfo";

type Props = {
    user: SessionUser;
    children: React.ReactNode;
};

export default function ProfileEditController ({ user, children }: Props) {
    const [modal, setModal] = useState<"edit" | "delete" | null>(null);

    return (
        <>
            <MyProfileSummary 
                user={user} 
                openEditModal={() => setModal("edit")} />

            <div 
                className="
                    flex flex-col gap-2
                    lg:flex-row">
                <MyInfo user={user} openDeleteModal={() => setModal("delete")} />
                {children}
            </div>
            
            {modal === "edit" && 
                <ProfileEditModal 
                    user={user} 
                    closeEditModal={() => setModal(null)}/>
            }
            {modal === "delete" && 
                <DeleteAccountModal 
                    closeDeleteModal={() => setModal(null)}/>
            }
        </>
    )
}