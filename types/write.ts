export type Write = {
    date: string;
    category: number;
    emotion: string;
    satisfaction: number;
    title: string;
    content: string;
};

export type WriteProps = {
    write: Write;
    onChange: React.Dispatch<React.SetStateAction<Write>>;
};