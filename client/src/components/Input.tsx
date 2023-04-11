import { ChangeEvent, FC } from "react";

interface InputProps {
    placeholder: string;
    value?: string;
    type?: string;
    hidden?: boolean;
    disabled: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({
    type,
    value,
    hidden,
    disabled,
    onChange,
    placeholder,
}) => {
    return (
        <input 
            type={type} 
            value={value}
            hidden={hidden}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className="
                w-full 
                p-4 
                text-lg 
                border-2 
                border-white
                rounded-md 
                outline-none 
                focus:border-fuchsia-500
                focus:border-2 
                transition 
                disabled:bg-neutral-900 
                disabled:opacity-70 
                disabled:cursor-not-allowed 
            "
        />
    );
}