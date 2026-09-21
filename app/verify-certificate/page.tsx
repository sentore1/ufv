"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface VerificationResult {
  valid: boolean;
  certificateNumber: string;
  participantName: string;
  organizationName: string;
  workshopTitle: string;
  issueDate: string;
  email?: string;
}

function VerificationContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      if (!code) {
        setError("No certificate code provided");
        setLoading(false);
        return;
      }

      try {
        // Fetch certificate from database
        const { data, error: dbError } = await supabase
          .from("workshop_registrations")
          .select("*")
          .eq("certificate_number", code)
          .single();

        if (dbError || !data) {
          setError("Certificate not found or invalid");
          setLoading(false);
          return;
        }

        // Get workshop settings for title
        const { data: workshopSettings } = await supabase
          .from("workshop_settings")
          .select("title_en, start_date, end_date")
          .eq("is_active", true)
          .single();

        setResult({
          valid: true,
          certificateNumber: data.certificate_number,
          participantName: data.full_name,
          organizationName: data.organization_name,
          workshopTitle: workshopSettings?.title_en || "Workshop",
          issueDate: data.certificate_generated_at
            ? new Date(data.certificate_generated_at).toLocaleDateString()
            : new Date().toLocaleDateString(),
          email: data.email,
        });
      } catch (err) {
        console.error("Verification error:", err);
        setError("Failed to verify certificate");
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            Certificate Not Valid
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "This certificate could not be verified."}
          </p>
          <p className="text-sm text-gray-500">
            Certificate Code: <span className="font-mono">{code || "N/A"}</span>
          </p>
          <a
            href="/"
            className="mt-6 inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-center">
          <div className="mb-4">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            ✓ Certificate Verified
          </h1>
          <p className="text-green-100">
            This certificate is authentic and valid
          </p>
        </div>

        {/* Certificate Details */}
        <div className="p-8 space-y-6">
          {/* Participant Name */}
          <div className="text-center border-b pb-6">
            <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Awarded To
            </label>
            <div className="text-3xl font-bold text-gray-900">
              {result.participantName}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Certificate Number
              </label>
              <div className="text-lg font-bold text-gray-900 font-mono">
                {result.certificateNumber}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Issue Date
              </label>
              <div className="text-lg font-bold text-gray-900">
                {result.issueDate}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Organization
              </label>
              <div className="text-lg font-bold text-gray-900">
                {result.organizationName}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Workshop
              </label>
              <div className="text-lg font-bold text-gray-900">
                {result.workshopTitle}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Certificate Authentication</p>
                <p>
                  This certificate has been verified against our database and
                  confirms that <strong>{result.participantName}</strong>{" "}
                  successfully completed the workshop program.
                </p>
              </div>
            </div>
          </div>

          {/* Verified Badge */}
          <div className="text-center pt-6 border-t">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Officially Verified
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Verified on {new Date().toLocaleString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <a
              href="/"
              className="flex-1 bg-gray-600 text-white text-center px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Return to Home
            </a>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Print Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyCertificatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}
