import axios from "axios";
import { Modal } from "../Modal";
import { Input } from "../Input";
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { useLogInModal, useRegisterModal } from "@/hooks";

export const RegisterModal = () => {
    const loginModal = useLogInModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState("");
    const [confirm, setConfirm] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userID, setUserID] = useState<string>('');
    const [approachUrl, setApproachUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    const onToggle = useCallback(() => {
        if (isLoading) return;
        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async() => {
        if(!email || !username || !confirm || !password) {
            toast.error("You must input your some information!!!")
            return;
        }
        if(!(password === confirm)) {
            toast.error('Your confirm password is wrong!!!');
            return;
        }
        if(!selectedFile && !approachUrl) {
            toast.error('You have to choose file!!!');
            return;
        };
        try {
            setIsLoading(true);
            await fetch(approachUrl, {
                method: 'PUT',
                body: selectedFile
            })
            const response = await fetch('https://ksjy63w4f3.execute-api.us-east-1.amazonaws.com/dev/register', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    userID,
                    username,
                    password
                })
            })
            setEmail('');
            setUserID('');
            setUsername('');
            setPassword('');
            toast.success('Account created.');
            registerModal.onClose();
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, password, username, approachUrl, selectedFile])

    const handleImage = async(target: any) => {
        if(!target.files) return;
        const file = target.files[0];
        if(!file) return;
        const userId = uuidv4();
        const newFile = new File([file], `${userId}.${file.name.split('.').at(-1)}`, { type: file.type });
        const response = await axios.post('https://ksjy63w4f3.execute-api.us-east-1.amazonaws.com/dev/url', {
            Key: newFile.name,
            ContentType: newFile.type,
            Bucket: "leaf3bbbilguun0426"
        });
        setUserID(userId);
        setSelectedFile(newFile);
        setApproachUrl(response.data);
        toast.success('uploaded!!!');
    };


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
                type="text"
                placeholder="Username"
                onChange={(ev) => setUsername(ev.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                type="password"
                placeholder="Password"
                onChange={(ev) => setPassword(ev.target.value)}
                value={password}
                disabled={isLoading}
            />
            <Input
                type="password"
                placeholder="Confirm password"
                onChange={(ev) => setConfirm(ev.target.value)}
                value={confirm}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p className="text-inherit">Already have an account? 
                <span className="text-white cursor-pointer hover:underline ml-2" onClick={onToggle}>
                    Sign in
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Create an account'
            actionLabel="Register"
            // onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent} 
            footer={footerContent}
            upload="upload"
            uploadOnClick={handleImage}
        />
    );
}