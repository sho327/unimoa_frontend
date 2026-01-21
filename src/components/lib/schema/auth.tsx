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

export const signupSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "メールアドレスを入力してください" })
            .email({ message: "正しいメールアドレス形式で入力してください" }),
        password: z
            .string()
            .min(1, { message: "パスワードを入力してください" })
            .min(8, { message: "パスワードは8文字以上である必要があります" }),
        passwordConfirm: z
            .string()
            .min(1, { message: "パスワード（確認）を入力してください" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "パスワードが一致しません",
        path: ["passwordConfirm"],
    });

export const passwordResetRequestSchema = z.object({
    email: z
        .string()
        .min(1, { message: "メールアドレスを入力してください" })
        .email({ message: "正しいメールアドレス形式で入力してください" }),
});

export const passwordResetSchema = z
    .object({
        password: z
            .string()
            .min(1, { message: "新しいパスワードを入力してください" })
            .min(8, { message: "パスワードは8文字以上である必要があります" }),
        passwordConfirm: z
            .string()
            .min(1, { message: "パスワード（確認）を入力してください" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "パスワードが一致しません",
        path: ["passwordConfirm"],
    });

export const quickSetupSchema = z
    .object({
        nickname: z
            .string()
            .min(1, { message: "ニックネームを入力してください" })
            .max(20, { message: "ニックネームは20文字以内で入力してください" }),
        password: z
            .string()
            .min(1, { message: "パスワードを入力してください" })
            .min(8, { message: "パスワードは8文字以上である必要があります" }),
        passwordConfirm: z
            .string()
            .min(1, { message: "パスワード（確認）を入力してください" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "パスワードが一致しません",
        path: ["passwordConfirm"],
    });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type PasswordResetRequestFormValues = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;
export type QuickSetupFormValues = z.infer<typeof quickSetupSchema>;