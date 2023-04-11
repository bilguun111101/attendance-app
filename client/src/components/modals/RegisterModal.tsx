import axios from "axios";
import { Modal } from "../Modal";
import { Input } from "../Input";
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
    const [approachUrl, setApproachUrl] = useState('');
    const [windowImage, setWindowImage] = useState('');
    const [selectedFile, setSelectedFile] = useState("");

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
        try {
            setIsLoading(true);

            const response = await axios({
                method: 'POST',
                url: 'https://obz850tlyf.execute-api.us-east-1.amazonaws.com/dev/signup',
                data: {
                    email,
                    username,
                    password
                }
            })
            console.log(response.data);
            toast.success('Account created.');

            registerModal.onClose();
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, password, username])

    const handleImage = async(target: any) => {
        if(!target.files) return;
        const file = target.files[0];
        // setWindowImage(URL.createObjectURL(file));
        if(!file) return;
        // const response = await axios({
        //     method: 'POST',
        //     url: 'https://ecx00kuntd.execute-api.us-east-1.amazonaws.com/dev/url',
        //     data: {
        //         Key: file.name,
        //         ContentType: file.type
        //     }
        // })
        const response = await axios.post('https://t4o2577tg3.execute-api.us-east-1.amazonaws.com/dev/url', {
            Key: file.name,
            ContentType: file.type
        })
        toast.success('responsed url!!!')
        console.log(response.data);
        setSelectedFile(file);
    }


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
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent} 
            footer={footerContent}
            upload="upload"
            uploadOnClick={handleImage}
        />
    );
}