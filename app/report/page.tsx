"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ReportPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data } = await supabase.from("reports").select("*").eq("status", "published").order("created_at", { ascending: false });
    setReports(data || []);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Reports</h1>
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                {report.file_url && report.file_type && ["jpg", "jpeg", "png"].includes(report.file_type.toLowerCase()) && (
                  <img src={report.file_url} alt={report.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{report.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">By {report.author} • {new Date(report.created_at).toLocaleDateString()}</p>
                  <p className="text-gray-700 mb-4">{report.content.length > 200 ? report.content.substring(0, 200) + "..." : report.content}</p>
                  <Link href={`/report/${report.id}`} className="text-orange-600 hover:text-orange-700 font-semibold">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
