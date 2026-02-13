import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty({ message: "이름을 입력해주세요." })
        .min(2, { message: "최소 2자 이상 입력해주세요." })
        .max(5, { message: "최대 5자까지 입력 가능합니다." })
        .regex(/^[가-힣]+$/, { message: "이름은 한글만 가능합니다." }),
    nickname: z
        .string()
        .trim()
        .nonempty({ message: "닉네임을 입력해주세요." })
        .min(2, { message: "최소 2자 이상 입력해주세요." })
        .max(16, { message: "최대 16자까지 입력 가능합니다." })
        .regex(/^[a-zA-Z0-9가-힣]+$/, { message: "영문/한글/숫자만 가능합니다."}),
    provider: z.enum(["local", "google", "github", "kakao", "naver"]),
    email: z.email({ message: "이메일을 정확히 입력해주세요."}),
    password: z
        .string()
        .nonempty({ message: "비밀번호를 입력해주세요." })
        .min(8, { message: "최소 8자 이상 입력해주세요." })
        .max(16, { message: "최대 16자까지 입력 가능합니다." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).+$/, 
            { message: "영문 소문자, 대문자, 숫자, 특수기호가 각각 1자 이상 포함되어야 합니다."}),
    birth: z
        .string()
        .trim()
        .nonempty({ message: "생년월일을 입력해주세요." }),
    sex: z
        .string()
        .nonempty({ message: "성별을 선택해주세요." })
});