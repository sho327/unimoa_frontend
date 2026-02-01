'use client';
import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ja'; // dayjsの日本語ロケールを読み込む

export function MantineProviderWrap({ children }: { children: React.ReactNode }) {
    const theme = createTheme({
        black: 'oklch(0.193 0.042 265.8)',
        white: '#ffffff',

        primaryColor: 'brand',
        primaryShade: 6,
        colors: {
            // 10段階のカラーパレット（薄い色 -> 濃い色）。
            // 面倒な場合、使いたい色(真ん中あたり)以外は適当に近い色でも動作はします
            brand: [
                'oklch(0.98 0.01 162)',
                'oklch(0.95 0.03 162)',
                'oklch(0.90 0.05 162)',
                'oklch(0.85 0.08 162)',
                'oklch(0.80 0.10 162)',
                'oklch(0.76 0.11 162)',
                'oklch(0.73 0.11 162)', // [6] Primary / Success
                'oklch(0.65 0.10 162)',
                'oklch(0.55 0.09 162)',
                'oklch(0.45 0.08 162)',
            ],
            secondary: [
                'oklch(0.98 0.005 220)',
                'oklch(0.95 0.005 220)',
                'oklch(0.90 0.01 220)',
                'oklch(0.85 0.01 220)',
                'oklch(0.80 0.01 220)',
                'oklch(0.75 0.01 220)',
                'oklch(0.71 0.01 220)', // [6] Secondary
                'oklch(0.60 0.01 220)',
                'oklch(0.50 0.01 220)',
                'oklch(0.40 0.01 220)',
            ],
            accent: [
                'oklch(0.98 0.02 45)',
                'oklch(0.95 0.03 45)',
                'oklch(0.90 0.04 45)',
                'oklch(0.85 0.05 45)',
                'oklch(0.80 0.06 45)',
                'oklch(0.72 0.07 45)',
                'oklch(0.65 0.07 45)', // [6] Accent
                'oklch(0.55 0.07 45)',
                'oklch(0.45 0.07 45)',
                'oklch(0.35 0.07 45)',
            ],
            info: [
                'oklch(0.95 0.05 243.64)',
                'oklch(0.90 0.08 243.64)',
                'oklch(0.85 0.10 243.64)',
                'oklch(0.80 0.12 243.64)',
                'oklch(0.75 0.14 243.64)',
                'oklch(0.68 0.15 243.64)',
                'oklch(0.61 0.15 243.64)', // [6] Info
                'oklch(0.55 0.14 243.64)',
                'oklch(0.45 0.12 243.64)',
                'oklch(0.35 0.10 243.64)',
            ],
            warning: [
                'oklch(0.96 0.05 52.33)',
                'oklch(0.92 0.08 52.33)',
                'oklch(0.88 0.11 52.33)',
                'oklch(0.84 0.13 52.33)',
                'oklch(0.80 0.15 52.33)',
                'oklch(0.75 0.16 52.33)',
                'oklch(0.71 0.16 52.33)', // [6] Warning
                'oklch(0.60 0.15 52.33)',
                'oklch(0.50 0.13 52.33)',
                'oklch(0.40 0.11 52.33)',
            ],
            error: [
                'oklch(0.95 0.05 27.33)',
                'oklch(0.90 0.08 27.33)',
                'oklch(0.80 0.12 27.33)',
                'oklch(0.75 0.15 27.33)',
                'oklch(0.70 0.18 27.33)',
                'oklch(0.65 0.19 27.33)',
                'oklch(0.60 0.20 27.33)', // [6] Error
                'oklch(0.55 0.18 27.33)',
                'oklch(0.45 0.15 27.33)',
                'oklch(0.35 0.12 27.33)',
            ],
            neutral: [
                'oklch(0.193 0.042 265.8)',
                'oklch(0.96 0.003 264.54)', // [1] base-300 (Hover)
                'oklch(0.95 0.006 162)',    // [2] base-100 / base-200 (Background/Border)
                'oklch(0.193 0.042 265.8)',
                'oklch(0.193 0.042 265.8)',
                'oklch(0.193 0.042 265.8)',
                'oklch(0.193 0.042 265.8)', // [6] base-content (Text)
                'oklch(0.193 0.042 265.8)',
                'oklch(0.193 0.042 265.8)', // [8] neutral
                'oklch(0.193 0.042 265.8)',
            ],
        },
        // fontSizes: {
        //     xs: '12px',
        //     sm: '14px', // 日本の標準的な「小さめ」
        //     md: '16px', // 日本の「読みやすさ重視」の標準
        //     lg: '18px',
        //     xl: '20px',
        // },
        // spacing: {
        //     xs: '10px',
        //     sm: '12px', // 日本の標準的な「小さめ」
        //     md: '16px', // 日本の「読みやすさ重視」の標準
        //     lg: '20px',
        //     xl: '32px',
        // },
        // コンポーネントごとの微調整
        // components: {
        //     AppShell: {
        //         styles: {
        //             main: {
        //                 backgroundColor: '#f2f5f4', // base-100 相当
        //             },
        //         },
        //     },
        // Card: {
        //   defaultProps: {
        //     shadow: 'sm',
        //     padding: 'md',
        //     radius: 'md',
        //     bg: '#ffffff', // base-100 は背景色なので、カードは明示的に白
        //   },
        //   styles: {
        //     root: {
        //       backgroundColor: '#ffffff', // カードは白固定
        //       borderColor: '#f2f5f4',     // base-200 相当
        //     }
        //   }
        // },
        // Table: {
        //   styles: {
        //     thead: { backgroundColor: 'oklch(0.96 0.003 264.54)' }, // base-300
        //   },
        // },
        // Button: {
        //   defaultProps: {
        //     radius: 'md',
        //   }
        // },
        // NavLink: {
        //   styles: {
        //     label: { fontSize: rem(15), fontWeight: 500 }, // サイドバーの文字を少し大きく
        //   },
        // },
        // },
        // デフォルトでmd(16px)を使うように設定
        // defaultRadius: 'md',
    });
    return (
        <MantineProvider
            // withGlobalStyles
            // withNormalizeCSS
            theme={theme}
        >
            {/* 日付設定を日本語にする */}
            <DatesProvider settings={{ locale: 'ja', firstDayOfWeek: 0, weekendDays: [0, 6] }}>
                {children}
            </DatesProvider>
        </MantineProvider>
    )
}