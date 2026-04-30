import { create } from "zustand";

type ProfileEditTab = "info" | "image" | "password";

type ProfileEditTabStore = {
    selectedTab: ProfileEditTab;
    setSelectedTab: (tab: ProfileEditTab) => void;
};

export const useProfileEditTabStore = create<ProfileEditTabStore>(set => ({
    selectedTab: "info",
    setSelectedTab: tab => set({ selectedTab: tab }),
}));