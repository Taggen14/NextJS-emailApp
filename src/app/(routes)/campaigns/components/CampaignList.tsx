import Link from "next/link";
import { Campaign } from "@prisma/client";

export default function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div>
      {campaigns.map((campaign) => (
        <Link href={`/campaigns/${campaign.id}`} key={campaign.id}>
          <div>
            <h2>{campaign.CompanyName}</h2>
            <p>{campaign.companyDescription}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
