// Components
import SpaceDashboard from "@/components/page/spaces/default/dashboard";

export default async function SpaceDashboardPage({
  params
}: {
  params: {
    spaceId: string
  }
}) {
  const { spaceId } = await params;
  return <SpaceDashboard />;
}
