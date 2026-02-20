import { ChangeEventHandler, FocusEventHandler } from "react";

type Variant = "signin" | "signup";

type Props = {
    name: string;
    type: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
    readonly?: boolean;
    variant: Variant;
    maxLength?: number;
};

const styles = {
    signin: "rounded-4xl py-2 px-4",
    signup: "rounded-lg py-1 px-2"
} as const;

export default function Input ({ name, type, value, onChange, onBlur, placeholder, readonly, variant, maxLength }: Props) {


    return (
        <input
            name={name} type={type} value={value}
            onChange={onChange} onBlur={onBlur}
            className={`
            w-full
            text-xl ${name === "date" || name === "month" || name === "year" ? "text-center" : ""}
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
            autoComplete="off"
            maxLength={maxLength}
        />
    )
}