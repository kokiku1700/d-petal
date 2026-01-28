
type Props = {
    onSwitch: () => void;
};

export default function SignUpForm ({onSwitch}: Props) {

    return (
        <div>
            <span onClick={onSwitch} className="cursor-pointer">
                로그인으로 가기
            </span>
        </div>
    )
}