import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

interface value {
    email: string;
    userID: string;
    username: string;
    isSignedIn: boolean
    setEmail: (email: string) => void;
    setUserID: (userID: string) => void;
    setIsSignedIn: (el: boolean) => void;
    setUsername: (username: string) => void;
}

const CurrentUserContext = createContext<any>(null);

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [email, setEmail] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const value: value = {
        email,
        userID,
        username,
        setEmail,
        setUserID,
        isSignedIn,
        setUsername,
        setIsSignedIn,
    }
    return (
        <CurrentUserContext.Provider value={value}>
            { children }
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => useContext(CurrentUserContext);