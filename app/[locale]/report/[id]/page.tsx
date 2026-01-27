"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    fetchReport();
  }, [params.id]);

  const fetchReport = async () => {
    const { data } = await supabase.from("reports").select("*").eq("id", params.id).single();
    if (data) setReport(data);
    else router.push("/report");
  };

  if (!report) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  console.log("Report data:", report);
  const isImage = report.file_type && ["jpg", "jpeg", "png"].includes(report.file_type.toLowerCase());
  const isPDF = report.file_type && report.file_type.toLowerCase() === "pdf";
  const isExcel = report.file_type && ["xlsx", "xls"].includes(report.file_type.toLowerCase());
  console.log("File type:", report.file_type, "isImage:", isImage, "isPDF:", isPDF, "isExcel:", isExcel);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button onClick={() => router.back()} className="text-orange-600 hover:text-orange-700 mb-6 flex items-center gap-2">
          ← Back to Reports
        </button>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{report.title}</h1>
          <p className="text-gray-600 mb-8">By {report.author} • {new Date(report.created_at).toLocaleDateString()}</p>
          
          <div className="prose max-w-none text-gray-700 mb-8 whitespace-pre-line">{report.content}</div>
          
          {report.file_url ? (
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">Attached File</h2>
              {isImage && (
                <div className="mb-4">
                  <img src={report.file_url} alt={report.title} className="w-full rounded-lg" />
                </div>
              )}
              {isPDF && (
                <div className="mb-4">
                  <iframe src={report.file_url} className="w-full h-[800px] border rounded-lg" />
                </div>
              )}
              {isExcel && (
                <div className="mb-4 p-8 bg-gray-100 rounded-lg text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                    <path d="M14 2v6h6M9 13h6M9 17h6M9 9h1" />
                  </svg>
                  <p className="text-gray-700 font-semibold mb-2">{report.file_name || "Excel File"}</p>
                  <p className="text-sm text-gray-600">Click download to view this Excel file</p>
                </div>
              )}
              <a href={report.file_url} download target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700">
                Download {report.file_name || "Report"}
              </a>
            </div>
          ) : (
            <div className="border-t pt-8">
              <p className="text-gray-500">No file attached to this report.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
