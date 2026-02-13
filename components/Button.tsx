type Variant = "submit" | "duplication";

type Props = {
    type: "submit" | "button" | "reset";
    object: string;
    variant: Variant;
    onClick?: () => void;
};

const styles = {
    submit: "px-4 py-2 text-xl rounded-4xl",
    duplication: "px-2 py-1.5 rounded-lg",
} as const;

export default function Button ({ type, object, variant, onClick }: Props) {

    return (
        <button 
            type={type}
            onClick={onClick}
            className={`
            w-full 
             ${styles[variant]}
            text-[#3b2f4a]
            bg-[#f3dff0]  
            cursor-pointer
            whitespace-nowrap
            hover:bg-[#e6cfe1]
            transition-color duration-200`}>
            {object}
        </button>
    )
}