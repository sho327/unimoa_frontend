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
    // const router = useRouter();
    // const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    // const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // // メニュー外をクリックしたら閉じる
    // useEffect(() => {
    //     if (openMenuId && menuRefs.current[openMenuId]) {
    //         const handleClickOutside = (event: MouseEvent) => {
    //             if (menuRefs.current[openMenuId] && !menuRefs.current[openMenuId]?.contains(event.target as Node)) {
    //                 setOpenMenuId(null);
    //             }
    //         };
    //         document.addEventListener("mousedown", handleClickOutside);
    //         return () => {
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         };
    //     }
    // }, [openMenuId]);

    // // 本来は activeSpace に基づいて取得するが、モック用に spaces から検索
    // const currentLocalSpace = spaces.find(s => s.id === activeSpace.id) || spaces[0];

    // // ダミーのプロジェクトリスト（activeSpaceに紐づくものが無い場合のフォールバック）
    // const displayProjects = (currentLocalSpace && currentLocalSpace.projects && currentLocalSpace.projects.length > 0)
    //     ? currentLocalSpace.projects
    //     : [
    //         {
    //             id: "p1",
    //             title: "卒業研究中間発表の準備",
    //             category: "リサーチ",
    //             desc: "卒業研究の中間発表に向けて、スライド作成と資料整理を進めています。デザイン面でのサポートも募集中です。",
    //             tags: ["研究", "プレゼン", "デザイン"],
    //             tasks: [1, 2, 3]
    //         },
    //         {
    //             id: "p2",
    //             title: "ゼミ合宿の計画",
    //             category: "イベント",
    //             desc: "来月のゼミ合宿の企画・運営を担当します。予算管理や会場手配など、一緒に進めてくれる方を募集しています。",
    //             tags: ["イベント", "企画", "運営"],
    //             tasks: [1]
    //         },
    //         {
    //             id: "p3",
    //             title: "2025年度 工学部学祭 公式サイト制作",
    //             category: "Web制作",
    //             desc: "今年の学祭サイトをReact+Next.jsで作り直します。エンジニアだけでなくデザイナーも募集中です！",
    //             tags: ["React", "Figma", "TypeScript"],
    //             tasks: []
    //         },
    //     ];

    return (
        <Stack gap="lg">
            {/* ページヘッダー */}
            <Group justify="space-between" align="flex-end">
                <Stack gap={4}>
                    <Group gap="xs">
                        {/* <LayoutDashboard size={28} color="var(--mantine-color-brand-6)" strokeWidth={2.5} /> */}
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
                    </Group>
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
                    className="btn normal-case font-bold transition-all btn-primary text-primary-content border-none shadow-md shadow-primary/10 flex-1 sm:flex-none !h-11 !min-h-11"
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