import prisma from "@/lib/db";
import CampaignList from "./components/CampaignList";
import CreateCampaignForm from "./components/CreateCampaignForm";

async function getCampaigns() {
  return await prisma.campaign.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <div>
      <h1>Campaigns</h1>
      <div>
        <h2>Exisiting Campaigns</h2>
        <CampaignList campaigns={campaigns} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New Campaign</h2>
        <CreateCampaignForm />
      </div>
    </div>
  );
}
