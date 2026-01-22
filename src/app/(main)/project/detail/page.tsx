import ProjectDetail from "@/components/page/main/project/detail";

export default function Page({ params }: { params: { id: string } }) {
    // 実際には params.id に基づいてデータを取得するが、現在はモックデータを使用
    const mockProject = {
        id: params.id,
        title: "2025年度 工学部学祭 公式サイト制作",
        category: "Web制作",
        description: "今年の学祭サイトをReact+Next.jsでゼロから構築します。現在はエンジニア2名、デザイナー1名が参加していますが、さらにフロントエンドの実装を手伝ってくれる仲間と、広報用画像を作ってくれるデザイナーをあと1名ずつ募集しています。",
        leader: {
            id: "leader1",
            name: "佐藤 健太",
            university: "工学部 3年",
        },
        requirements: [
            "週に1回、オンラインの進捗MTGに参加できる方",
            "Git / GitHubの基本的な使い方がわかる方",
            "新しい技術を学ぶ意欲がある方（未経験OK！）",
        ],
        tags: ["React", "Next.js", "Figma", "TailwindCSS"],
    };

    return <ProjectDetail project={mockProject} />;
}
