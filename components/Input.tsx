import { ChangeEventHandler } from "react";

type Variant = "signin" | "signup";

type Props = {
    type: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    readonly?: boolean;
    variant: Variant;
};

const styles = {
    signin: "rounded-4xl py-2 px-4",
    signup: "rounded-lg py-1 px-2"
} as const;

export default function Input ({ type, value, onChange, placeholder, readonly, variant }: Props) {


    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={`
            w-full
            text-xl
            ${styles[variant]}
            border-1 border-[#3b2f4a]
            focus:outline-none
            focus:ring focus:ring-[#e5c9dd] focus:border-[#e5c9dd]
            read-only:pointer-events-none
            read-only:cursor-default
            read-only:bg-pink-100/70
            read-only:text-gray-400
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border p-2`}
            placeholder={placeholder}
            readOnly={readonly}
        />
    )
}