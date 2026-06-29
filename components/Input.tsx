import { 
    ChangeEventHandler, 
    FocusEventHandler, 
    KeyboardEventHandler,
    forwardRef } from "react";

type Variant = "signin" | "signup" | "main" | "filter" | "code";

type Props = {
    name: string;
    type: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
    readonly?: boolean;
    variant: Variant;
    maxLength?: number;
};

const styles = {
    signin: "rounded-lg py-1 px-4",
    signup: "rounded-lg py-1 px-2",
    main: "rounded-lg py-1 px-2 border-1 border-gray-400",
    filter: "rounded-4xl py-2 px-6 ring-2 ring-pink-200 border-none focus:ring-2 focus:ring-pink-400",
    code: "rounded-lg py-2 px-1 text-center",
} as const;

const Input = forwardRef <HTMLInputElement, Props>(
    (
        { 
            name, 
            type, 
            value, 
            onChange, 
            onKeyDown, 
            onBlur, 
            placeholder, 
            readonly,
             variant, 
            maxLength 
        }, 
        ref
    ) => {

        return (
            <input
                ref={ref}
                name={name} type={type} value={value}
                onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} 
                className={`
                    w-full
                    text-base ${name === "date" || name === "month" || name === "year" ? "text-center" : ""}
                    ${styles[variant]}
                    border-1 border-[#3b2f4a] bg-white
                    focus:outline-none
                    focus:ring focus:ring-[#e5c9dd] focus:border-[#e5c9dd]
                    read-only:pointer-events-none
                    read-only:cursor-default
                    read-only:bg-pink-100/70
                    read-only:text-gray-400
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border p-2
                    lg:text-lg`}
                placeholder={placeholder}
                readOnly={readonly}
                autoComplete="off"
                maxLength={maxLength}
            />
        )
    }
)

Input.displayName = "Input";

export default Input;