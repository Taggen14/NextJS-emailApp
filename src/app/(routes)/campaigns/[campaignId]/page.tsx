import prisma from "@/lib/db";
import Link from "next/link";
import { Email } from "@prisma/client";
import CreateEmailForm from "./components/CreateEmailForm";

export default async function CampaignPage({
  params,
}: {
  params: { campaignId: string };
}) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: params.campaignId },
  });

  const emails = await prisma.email.findMany({
    where: { campaignId: params.campaignId },
  });

  if (!campaign) {
    return <div>campaign not found</div>;
  }
  return (
    <div>
      <Link href="/campaigns" className="text-blue-600">
        Back to Campaigns
      </Link>
      <h1 className="text-4xl mb-4">{campaign.CompanyName}</h1>

      {/* Campaign Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Campaign Details:</h2>
        <div>
          <p>
            <strong>Company Name:</strong> {campaign.CompanyName}
          </p>
          <p>
            <strong>Description:</strong> {campaign.companyDescription}
          </p>
          <p>
            <strong>Product description:</strong> {campaign.productDescription}
          </p>
          <p>
            <strong>Target audience:</strong> {campaign.targetAudience}
          </p>
        </div>
      </div>

      {/* Associated Emails */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Generated Emails</h2>
        {emails.length > 0 ? (
          <ul className="space-y-4">
            {emails.map((email: Email) => (
              <li key={email.id} className="border max-w-[250px] p-4">
                <Link
                  href={`/emails/${email.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {email.subject}
                </Link>
                <p className="text-gray-600 mt-1">
                  {email.content.substring(0, 100)}...
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No emails generated for this campaign yet.</p>
        )}
      </div>

      {/* Create New Email */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Create New Email</h2>
        <CreateEmailForm campaignId={params.campaignId} />
      </div>
    </div>
  );
}
