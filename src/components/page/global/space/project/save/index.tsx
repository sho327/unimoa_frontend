"use client"
import React from 'react';
import {
    Title,
    Text,
    TextInput,
    Textarea,
    Button,
    Stack,
    Card,
    Group,
    Box,
    rem,
    Breadcrumbs,
    Anchor,
    Divider,
    Avatar
} from '@mantine/core';
// Lucide React アイコンのインポート
import { Rocket, ArrowLeft, Check, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function SpaceProjectSave({
}: {
    }) {
    const router = useRouter();
    const params = useParams();
    return (
        <Stack gap="xl">
            {/* ページヘッダー */}
            <Stack gap={4}>
                <h1
                    // order={1} // HTML上は<h1>になる
                    // size="h3" // 見た目のサイズ
                    // c="dark"  // 色
                    // fw={800}  // 太さ
                    // style={{ letterSpacing: rem(-0.5) }}
                    className="text-xl sm:text-2xl font-black text-neutral tracking-tight"
                >
                    新規プロジェクト作成
                </h1>
                <Text
                    size="sm"
                    // c="dimmed"
                    // fw={500}
                    className="hidden sm:block text-[13.5px] text-gray-500 font-bold"
                >
                    新しいプロジェクトを立ち上げ、チームの作業を開始しましょう
                </Text>
            </Stack>

            {/* メインフォーム：ワイドに広がるが、入力欄は読みやすい幅に */}
            <Card
                // withBorder
                // padding="1.5rem"
                // radius="lg"
                // shadow="xs"
                // style={{
                //     cursor: 'pointer',
                //     borderColor: 'oklch(0.963 0.007 256.7)', // gray-100
                //     transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                //     position: 'relative'
                // }}
                // styles={{
                //     root: {
                //         '&:hover': {
                //             transform: 'translateY(-4px)',
                //             boxShadow: 'var(--mantine-shadow-md)',
                //             borderColor: 'var(--mantine-color-brand-4)',
                //         }
                //     }
                // }}
                onClick={(e) => {
                    e.stopPropagation();
                    // router.push(pageRoutes.PROJECT.TASK.LIST);
                }}
                className="card bg-white border border-gray-100 shadow-sm transition-all group rounded-xl cursor-pointer hover:shadow-md p-6"
            >
                <Stack gap="xl">
                    <Box style={{ maxWidth: rem(800) }}> {/* 入力欄が広すぎないよう制限 */}
                        <Stack gap="lg">
                            <TextInput
                                label="プロジェクト名"
                                placeholder="例: 次世代基幹システム開発"
                                required
                                size="md"
                                styles={{
                                    input: { border: '1px solid oklch(0.95 0.006 162)', height: rem(46), borderRadius: '.8rem' },
                                    label: { fontWeight: 700, marginBottom: rem(4), fontSize: '14px' },
                                }}
                            />

                            <TextInput
                                label="プロジェクトID"
                                placeholder="例: ERP-2026"
                                size="md"
                                styles={{
                                    input: { border: '1px solid oklch(0.95 0.006 162)', height: rem(46) },
                                    label: { fontWeight: 700, marginBottom: rem(4), fontSize: '14px' },
                                }}
                            />

                            <Textarea
                                label="プロジェクトの概要"
                                placeholder="このプロジェクトの目的、メインゴール、背景などを記入してください"
                                minRows={5}
                                size="md"
                                styles={{
                                    input: { border: '1px solid oklch(0.95 0.006 162)' },
                                    label: { fontWeight: 700, marginBottom: rem(4), fontSize: '14px' },
                                }}
                            />
                        </Stack>
                    </Box>

                    <Divider style={{ borderColor: 'oklch(0.96 0.003 264.54)' }} />

                    {/* 下部アクションエリア */}
                    <Group justify="space-between">
                        {/* ヒント情報 */}
                        <Group gap="xs" style={{ flex: 1 }} visibleFrom="sm">
                            <Check size={20} color="var(--mantine-color-brand-6)" strokeWidth={3} />
                            <Text size="sm" c="dimmed" fw={500}>
                                作成後すぐにタスクの追加とメンバー招待が可能です
                            </Text>
                        </Group>

                        <Group gap="md">
                            <Button
                                variant="subtle"
                                color="gray"
                                size="md"
                                onClick={() => router.back()}
                                leftSection={<ArrowLeft size={18} strokeWidth={2.5} />}
                            >
                                キャンセル
                            </Button>
                            <Button
                                color="brand.6"
                                size="md"
                                radius="md"
                                leftSection={<Rocket size={18} strokeWidth={2.5} />}
                                px={rem(32)}
                                onClick={() => router.push(`/spaces/${params.spaceId}/projects`)}
                            >
                                プロジェクトを開始する
                            </Button>
                        </Group>
                    </Group>
                </Stack>
            </Card>

            {/* スペースのステータス情報（任意） */}
            <Card
                radius="md"
                p="md"
                style={{
                    backgroundColor: 'oklch(0.96 0.003 264.54)', // base-300
                    border: '1px dashed oklch(0.95 0.006 162)'
                }}
            >
                <Group gap="sm">
                    <Avatar color="brand.6" radius="sm" size="sm">
                        <LayoutDashboard size={16} strokeWidth={2.5} />
                    </Avatar>
                    <Text size="xs" fw={600} c="dimmed">
                        現在のスペース: <Text component="span" c="brand.6" fw={700}>開発チーム</Text> (残り作成可能プロジェクト: 5)
                    </Text>
                </Group>
            </Card>
        </Stack>
    )
}