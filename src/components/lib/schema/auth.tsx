import * as z from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "メールアドレスを入力してください" })
        .email({ message: "正しいメールアドレス形式で入力してください" }),
    password: z
        .string()
        .min(1, { message: "パスワードを入力してください" })
        .min(4, { message: "パスワードは4文字以上である必要があります" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;