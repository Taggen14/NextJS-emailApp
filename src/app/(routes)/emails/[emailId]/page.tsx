"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Email } from "@prisma/client";

export default function EmailPage() {
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const emailId = params.emailId as string;

  useEffect(() => {
    async function fetchEmail() {
      try {
        const response = await fetch(`/api/emails/${emailId}`);
        if (!response.ok) {
          throw new Error("failed to fetch email");
        }
        const data: Email = await response.json();
        setEmail(data);
      } catch (err) {
        setError("failed to fetch email");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEmail();
  }, [emailId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!email) return <div>Email not found</div>;

  return (
    <div>
      <Link href={`/campaigns/${email.campaignId}`} className="text-blue-500">
        Back to Campaign
      </Link>
      <h1>Email Subject: {email.subject}</h1>
      <div>
        <div>Email Content: {email.content}</div>
      </div>
    </div>
  );
}
