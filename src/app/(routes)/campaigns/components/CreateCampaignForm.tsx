"use client";

import { useState } from "react";

export default function CreateCampaignForm() {
  const [formData, setFormData] = useState({
    CompanyName: "",
    companyDescription: "",
    productDescription: "",
    targetAudience: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: 1 }), // Assuming a default userId for now
      });
      if (response.ok) {
        alert("Campaign created successfully!");
        setFormData({
          CompanyName: "",
          companyDescription: "",
          productDescription: "",
          targetAudience: "",
        });
        // You might want to refresh the campaign list or redirect here
      } else {
        alert("Failed to create campaign");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("An error occurred while creating the campaign");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label
          htmlFor="CompanyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name
        </label>
        <input
          type="text"
          name="CompanyName"
          id="CompanyName"
          value={formData.CompanyName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="companyDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Company Description
        </label>
        <textarea
          name="companyDescription"
          id="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="productDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Product Description
        </label>
        <textarea
          name="productDescription"
          id="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="targetAudience"
          className="block text-sm font-medium text-gray-700"
        >
          Target Audience
        </label>
        <input
          type="text"
          name="targetAudience"
          id="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Campaign
      </button>
    </form>
  );
}
