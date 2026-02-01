"use client"
// Modules
import {
    Text, Card, Group, Stack,
    Badge, ActionIcon, Menu, rem, Box, Divider,
    Avatar,
    Progress
} from '@mantine/core'
// Lucide React アイコンのインポート（エラー修正済み）
import {
    EllipsisVertical,
    Trash2,
    ListChecks,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Eye, Edit } from "lucide-react"
// Components
// Utils
import { formatTimestamp } from "@/utils/date"
// Types
import { T_ProjectWithDetail } from "@/types/repository/project"

interface ProjectSaveFormProps {
    project: T_ProjectWithDetail;
}

export default function ProjectSaveForm({ project }: ProjectSaveFormProps) {
    const router = useRouter();
    return (
        <Card
            key={project.id}
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
            {/* ステータス & 操作メニュー */}
            <Group justify="space-between" mb="xs">
                {/* ステータス */}
                <Badge
                    // color={project.status === '進行中' ? 'brand.6' : 'gray'}
                    // variant="light"
                    // size="md"
                    // radius="sm"
                    className="text-xs font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase"
                >
                    {project.category_name}
                </Badge>
                {/* ハンバーガーメニュー */}
                <Menu position="bottom-end" shadow="md" withinPortal>
                    <Menu.Target>
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <EllipsisVertical
                                size={20}
                                strokeWidth={2.5}
                            />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown
                        className="absolute top-full right-0 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-in fade-in zoom-in-95 duration-100"
                    >
                        <div className="py-1.5 px-1.5">
                            <Menu.Label
                                className="text-gray-500"
                            >
                                プロジェクト設定
                            </Menu.Label>
                            <Menu.Item
                                leftSection={<Eye size={16} strokeWidth={2.5} className="text-secondary group-hover:text-primary" />}
                                className="text-sm font-bold hover:bg-gray-50 transition-all group"
                            >
                                詳細
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<Edit size={16} strokeWidth={2.5} className="text-secondary group-hover:text-primary" />}
                                className="text-sm font-bold hover:bg-gray-50 transition-all group"
                            >
                                更新
                            </Menu.Item>
                        </div>
                        <div className="border-t border-gray-200 py-1.5 px-1.5">
                            <Menu.Item
                                // color="red"
                                leftSection={<Trash2 size={16} strokeWidth={2.5} />}
                                className="text-sm font-bold text-error hover:bg-error/10 transition-all"
                            >
                                プロジェクトを削除
                            </Menu.Item>
                        </div>
                    </Menu.Dropdown>
                </Menu>
            </Group>
            {/* プロジェクトタイトル */}
            <Stack gap={rem(4)} mb="sm">
                <Text
                    fw={800}
                    size="lg"
                    lineClamp={1}
                    c="black"
                    style={{ letterSpacing: rem(-0.2) }}
                >
                    {project.title}
                </Text>
                <Text
                    size="xs"
                    // c="dimmed"
                    fw={500}
                    className="text-gray-500"
                >
                    最終更新: {formatTimestamp(project.updated_at)}
                </Text>
            </Stack>

            {/* タグ */}
            <Group gap={6} mb="sm">
                {project.tags?.map((tag) => (
                    <Text
                        key={tag.id}
                        // size="xs"
                        // c="dimmed"
                        // fw={600}
                        // bg="gray.1"
                        // style={{ borderRadius: rem(4) }}
                        px={8}
                        py={2}
                        className="text-xs font-bold rounded-md bg-gray-100 text-secondary"
                    >
                        #{tag.name}
                    </Text>
                ))}
            </Group>

            {/* 進捗セクション */}
            <Box mb="md">
                <Group
                    justify="space-between"
                    mb={6}
                >
                    <Text
                        size="xs"
                        // fw={700}
                        // c="dimmed" 
                        // tt="uppercase"
                        className="text-gray-500"
                    >
                        進捗率
                    </Text>
                    <Text
                        size="sm"
                        fw={800}
                        c="brand.6"
                    >
                        {25}%
                    </Text>
                </Group>
                <Progress
                    value={25}
                    color="brand.6"
                    size="md"
                    radius="xl"
                />
            </Box>

            <Divider
                mb="xs"
                // style={{
                //     borderColor: 'oklch(0.929 0.013 255.5)', // gray-200
                // }}
                className="border-gray-200"
            />

            <Group justify="space-between" align="center">
                <Avatar.Group spacing="xs">
                    {project.members?.map((m, i) => (
                        <Avatar
                            key={i}
                            size={28}
                            // radius="xl"
                            // color={m.color} 
                            // src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + (i === 0 ? project.id : project.id + String(i))}
                            src={m.profile.avatar_url}
                        />
                    ))}
                </Avatar.Group>

                <Group
                    gap={4}
                    // c="dimmed"
                    className="text-gray-500"
                >
                    <ListChecks
                        size={16}
                        // color="var(--mantine-color-dimmed)"
                        strokeWidth={2.5}
                    />
                    <Text
                        size="xs"
                        fw={700}
                    // me={8}
                    // c="dimmed"
                    >
                        {0} タスク
                    </Text>
                </Group>
            </Group>
        </Card >
    );
}
