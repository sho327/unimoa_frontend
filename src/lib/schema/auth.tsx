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

export const initialSetupSchema = z
    .object({
        userId: z
            .string()
            .min(3, { message: "3文字以上で入力してください" })
            .max(20, { message: "20文字以内で入力してください" })
            .regex(/^[a-zA-Z0-9_]+$/, { message: "英数字とアンダースコア(_)のみ使用できます" }),
        displayName: z
            .string()
            .min(1, { message: "表示名を入力してください" })
            .max(30, { message: "表示名は30文字以内で入力してください" }),
        affiliation: z.string().max(50, { message: "50文字以内で入力してください" }).optional(),
        tags: z.array(z.string()).optional(),
        avatarUrl: z.string().url({ message: "有効なURL形式である必要があります" }).optional(),
        spaceMode: z.enum(["personal", "shared"]),
        workspaceName: z.string().optional(),
        workspaceIcon: z.string().url({ message: "有効なURL形式である必要があります" }).optional(),
    })
    .superRefine((data, ctx) => {
        if (data.spaceMode === "shared") {
            if (!data.workspaceName || data.workspaceName.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "共有スペースの名前を入力してください",
                    path: ["workspaceName"],
                });
            }
            if (data.workspaceName && data.workspaceName.length > 50) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "50文字以内で入力してください",
                    path: ["workspaceName"],
                })
            }
        }
    });

export const getSpaceSelectionSchema = z.object({
    userId: z
        .string()
        .min(1, { message: "ユーザーIDを入力してください" })
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type PasswordResetRequestFormValues = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;
export type QuickSetupFormValues = z.infer<typeof quickSetupSchema>;
export type InitialSetupFormValues = z.infer<typeof initialSetupSchema>;
export type GetSpaceSelectionFormValues = z.infer<typeof getSpaceSelectionSchema>;
