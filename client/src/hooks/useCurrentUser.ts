import { create } from 'zustand';

interface CurrentUser {
    email: string;
    userID: string;
    username: string;
    onEmail: (el: string) => void;
    onUserID: (el: string) => void;
    onUsername: (el: string) => void;
}

export const useCurrentUser = create<CurrentUser>((set) => ({
    email: '',
    userID: '',
    username: '',
    onEmail: (el) => set({ email: el }),
    onUserID: (el) => set({ userID: el }),
    onUsername: (el) => set({ username: el })
}))