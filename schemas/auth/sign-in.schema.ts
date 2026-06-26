import { z } from "zod";

export const signInSchema = z.object({
    email: z.email({ message: "이메일을 정확히 입력해주세요."}),
    password: z
        .string()
        .nonempty({ message: "비밀번호를 입력해주세요." })
        .min(8, { message: "최소 8자 이상 입력해주세요." })
        .max(16, { message: "최대 16자까지 입력 가능합니다." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).+$/, 
            { message: "영문 소문자, 대문자, 숫자, 특수기호가 각각 1자 이상 포함되어야 합니다."}),
});