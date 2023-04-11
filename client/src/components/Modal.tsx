import { Button } from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import { FC, ReactElement, useCallback } from "react";

interface ModalProps {
    title?: string;
    upload?: string;
    isOpen?: boolean;
    disabled?: boolean;
    actionLabel: string;
    body?: ReactElement;
    onClose: () => void;
    onSubmit: () => void;
    footer?: ReactElement;
    uploadOnClick?: any;
}

export const Modal: FC<ModalProps> = ({
    body,
    title,
    footer,
    upload,
    isOpen,
    onClose,
    onSubmit,
    disabled,
    actionLabel,
    uploadOnClick
}) => {
    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        onClose();
    }, [disabled, onClose])
    const handleSubmit = useCallback(() => {
        if(disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit])
    if(!isOpen) {
        return null;
    }
    return (
        <>
            <div
                className="
                    justify-center 
                    items-center 
                    flex 
                    overflow-x-hidden 
                    overflow-y-auto 
                    fixed 
                    inset-0 
                    z-50 
                    outline-none 
                    focus:outline-none 
                    bg-black 
                "
            >
                <div
                    className="
                        relative 
                        w-full 
                        lg:w-3/6 
                        my-6 
                        mx-auto 
                        lg:max-w-3xl 
                        h-full 
                        lg:h-auto
                    "
                >
                    <div
                        className="
                            h-full 
                            lg:h-auto 
                            border-0 
                            rounded-lg 
                            shadow-lg 
                            relative 
                            flex 
                            flex-col 
                            w-full 
                            bg-black 
                            outline-none 
                            focus:outline-none
                        "
                    >
                        <div
                            className="
                                flex 
                                items-center 
                                justify-center 
                                p-10 
                                rounded-t
                            "
                        >
                            <h3 className="text-3xl font-semibold text-white">
                                { title }
                            </h3>
                            <button
                                onClick={handleClose}
                                className="
                                    p-1 
                                    ml-auto 
                                    border-0 
                                    text-white 
                                    hover:opacity-70 
                                    transition
                                "
                            >
                                <AiOutlineClose size={20} />
                            </button>
                        </div>
                        <div className="relative p-10 flex-auto">
                            { body }
                        </div>
                        <div className="flex flex-col gap-2 p-10">
                            <Button 
                                disabled={disabled}
                                label={actionLabel}
                                secondary
                                fullWidth
                                large
                                onClick={handleSubmit}
                            />
                            {
                                upload ?
                                    <label 
                                        htmlFor={upload} 
                                        className="
                                            disabled:opacity-70 
                                            disabled:cursor-now-allowed 
                                            rounded-full 
                                            font-semibold 
                                            hover:opacity-80 
                                            transition 
                                            border-2 
                                            px-5
                                            py-3
                                            bg-white
                                            flex 
                                            justify-center
                                            text-xl
                                            cursor-pointer
                                        ">
                                            <input 
                                                type="file" 
                                                disabled={disabled}
                                                onChange={({ target }) => uploadOnClick(target)}
                                            />
                                            { upload }
                                    </label>
                                        :
                                    null
                            }
                            { footer }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}