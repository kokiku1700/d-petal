type Variant = "submit" | "duplication" | "category" | "emotion";

type Props = {
    type: "submit" | "button" | "reset";
    object: string;
    variant: Variant;
    color?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
};

type ButtonStyle = React.CSSProperties & {
    "--category-color"?: string;
};

const styles = {
    submit: "w-full px-4 py-2 text-xl rounded-4xl bg-[#f3dff0] hover:bg-[#e6cfe1]",
    duplication: "w-full px-2 py-1.5 rounded-lg hover:bg-[#e6cfe1]",
    category: "px-3 py-2 rounded-lg bg-white hover:bg-[var(--category-color)]",
    emotion: "px-2 py-1.5 rounded-lg bg-white hover:bg-gray-100",
} as const;

export default function Button ({ type, object, variant, onClick, color, style }: Props) {
    const buttonStyle: ButtonStyle = {
        ...style,
        "--category-color": `${color}40`
    };

    return (
        <button 
            type={type}
            onClick={onClick}
            style={buttonStyle}
            className={`
                ${styles[variant]}
                text-[#3b2f4a]
                cursor-pointer whitespace-nowrap   
                transition-color duration-300`}>
            {object}
        </button>
    )
}