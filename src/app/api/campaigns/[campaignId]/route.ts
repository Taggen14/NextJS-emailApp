import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { campaignId: string } }
) {
  const { campaignId } = params;
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
  });
  return NextResponse.json(campaign);
}

// Lägg till denna PUT-metod i den befintliga filen
export async function PUT(
  request: Request,
  { params }: { params: { campaignId: string } }
) {
  try {
    const { campaignId } = params;
    const body = await request.json();
    const updatedCampaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        CompanyName: body.CompanyName,
        companyDescription: body.companyDescription,
        productDescription: body.productDescription,
        targetAudience: body.targetAudience,
      },
    });
    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.error("Failed to update campaign:", error);
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}
