import axios from "axios";
import { Modal } from "../Modal";
import { Input } from "../Input";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { useLogInModal, useRegisterModal } from "@/hooks";
import { useCurrentUser } from "@/context";

export const LoginModal = () => {
    const loginModal = useLogInModal();
    const registerModal = useRegisterModal();

    const {
        setIsSignedIn,
        setEmail: Email,
        setUserID: UserID,
        setUsername: Username,
    } = useCurrentUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading) return;
        
        loginModal.onClose()
        registerModal.onOpen();
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async() => {
        // if(email === '' || password === '') {
        //     toast.error('You must input your authentication!!!');
        //     return;
        // }
        try {
            const response = await fetch('https://9el95rywh4.execute-api.us-east-1.amazonaws.com/dev/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            })
            const { username, email: userEmail, userID } = await response.json();
            
            UserID(userID);
            Email(userEmail);
            Username(username);
            setIsLoading(true);
            setIsSignedIn(true);
            toast.success('You signed in!!!');
            loginModal.onClose();
        } catch (error) { console.log(error) } finally {
            setIsLoading(false);
        }
    }, [loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                type="email"
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                type="password"
                placeholder="Password"
                onChange={(ev) => setPassword(ev.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p className="text-inherit">First time using This app?
                <span className="text-white cursor-pointer hover:underline ml-2" onClick={onToggle}>
                    Create an account
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}