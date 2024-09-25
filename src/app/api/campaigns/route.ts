import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany();
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

// Lägg till denna POST-metod i den befintliga filen
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCampaign = await prisma.campaign.create({
      data: {
        CompanyName: body.CompanyName,
        companyDescription: body.companyDescription,
        productDescription: body.productDescription,
        targetAudience: body.targetAudience,
        userId: body.userId, // Antag att vi har en användare
      },
    });
    return NextResponse.json(newCampaign, { status: 201 });
  } catch (error) {
    console.error("Failed to create campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
