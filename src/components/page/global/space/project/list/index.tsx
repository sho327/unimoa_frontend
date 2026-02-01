"use client"
import { Text, Button, SimpleGrid, Group, Stack } from '@mantine/core'
import { Plus } from 'lucide-react'
import ProjectListCard from "@/components/page/global/space/project/list/projectListCard"
// Types
import { T_ProjectWithDetail } from "@/types/repository/project"

export default function SpaceProjectList({
    projects
}: {
    projects: T_ProjectWithDetail[]
}) {
    return (
        <Stack gap="lg">
            {/* ページヘッダー */}
            <Group justify="space-between" align="flex-end">
                <Stack gap={4}>
                    <h1
                        // order={1} // HTML上は<h1>になる
                        // size="h3" // 見た目のサイズ
                        // c="dark"  // 色
                        // fw={800}  // 太さ
                        // style={{ letterSpacing: rem(-0.5) }}
                        className="text-xl sm:text-2xl font-black text-neutral tracking-tight"
                    >
                        プロジェクト
                    </h1>
                    <Text
                        size="sm"
                        // c="dimmed"
                        // fw={500}
                        className="hidden sm:block text-[13.5px] text-gray-500 font-bold"
                    >
                        現在進行中のプロジェクトとタスクの進捗を管理します
                    </Text>
                </Stack>

                <Button
                    // color="brand.6"
                    // size="md"
                    // radius="md"
                    leftSection={<Plus size={18} strokeWidth={3} />}
                    className="btn normal-case font-bold transition-all btn-primary text-primary-content border-none shadow-md shadow-primary/10 flex-1 sm:flex-none !h-11 !min-h-11 max-w-[125px]"
                // onClick={() => router.push(`/spaces/${params.spaceId}/projects/save`)}
                >
                    新規作成
                </Button>
            </Group>

            {/* プロジェクトカードのグリッド */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {projects.map((project) => (
                    <ProjectListCard key={project.id} project={project} />
                ))}
            </SimpleGrid>

            {/* <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">プロジェクト</h1>
                    <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold">現在進行中のプロジェクト一覧</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="primary"
                        className="flex-1 sm:flex-none !h-11 !min-h-11"
                    // onClick={() => router.push(`${pageRoutes.MAIN.PROJECT_SAVE}`)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        新規作成
                    </Button>
                </div>
            </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectListCard key={project.id} project={project} />
                ))}
            </div> */}
        </Stack>
    )
}