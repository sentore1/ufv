"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CertificateRenderer from "@/app/components/CertificateRenderer";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface WorkshopRegistration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  organization_name: string;
  organization_type: string;
  position_title: string;
  gender: string;
  nationality: string;
  country_of_residence: string;
  passport_number: string;
  date_of_birth: string;
  years_experience: string;
  emergency_contact: string;
  country_of_departure: string;
  preferred_languages: string[];
  interpretation_required: boolean;
  dietary_requirements: string;
  capacity_building_areas: string[];
  created_at: string;
  certificate_number?: string;
  certificate_generated_at?: string;
}

interface CertificateData {
  participantName: string;
  certificateNumber: string;
  verificationUrl: string;
  directors: Array<{
    full_name: string;
    role: string;
    signature_position: number;
    display_order: number;
  }>;
  issueDate: string;
}

export default function WorkshopRegistrationsAdmin() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<WorkshopRegistration | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOrg, setFilterOrg] = useState("");
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [generatingCertificate, setGeneratingCertificate] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const certificateCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("adminAuth")) {
      router.push("/admin");
      return;
    }
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("workshop_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching registrations:", error);
      } else {
        setRegistrations(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async (registration: WorkshopRegistration) => {
    setGeneratingCertificate(true);
    try {
      const response = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationId: registration.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate certificate");
      }

      const data = await response.json();
      
      if (data.success) {
        setCertificateData(data.certificateData);
        setShowCertificateModal(true);
        
        // Refresh registrations to show updated certificate_number
        await fetchRegistrations();
        
        // Update selected registration
        const updatedReg = registrations.find(r => r.id === registration.id);
        if (updatedReg) {
          setSelectedRegistration({
            ...updatedReg,
            certificate_number: data.certificateData.certificateNumber,
            certificate_generated_at: data.certificateData.issueDate
          });
        }
      } else {
        alert("Failed to generate certificate");
      }
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setGeneratingCertificate(false);
    }
  };

  const handleDownloadCertificate = () => {
    const canvas = certificateCanvasRef.current;
    if (!canvas) {
      alert("Certificate not ready. Please wait.");
      return;
    }

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (!blob) {
        alert("Failed to generate image");
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificate-${certificateData?.certificateNumber || "download"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const handleCertificateReady = (canvas: HTMLCanvasElement) => {
    certificateCanvasRef.current = canvas;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    const { error } = await supabase
      .from("workshop_registrations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting registration:", error);
      alert("Failed to delete registration");
    } else {
      alert("Registration deleted successfully");
      fetchRegistrations();
      setSelectedRegistration(null);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Full Name", "Email", "Phone", "Organization", "Organization Type", "Position",
      "Gender", "Nationality", "Country of Residence", "Passport Number", "Date of Birth",
      "Years Experience", "Emergency Contact", "Country of Departure",
      "Preferred Languages", "Interpretation Required", "Dietary Requirements",
      "Capacity Building Areas", "Registration Date"
    ];

    const rows = registrations.map(reg => [
      reg.full_name,
      reg.email,
      reg.phone,
      reg.organization_name,
      reg.organization_type || "",
      reg.position_title || "",
      reg.gender || "",
      reg.nationality || "",
      reg.country_of_residence || "",
      reg.passport_number || "",
      reg.date_of_birth || "",
      reg.years_experience || "",
      reg.emergency_contact || "",
      reg.country_of_departure || "",
      reg.preferred_languages?.join("; ") || "",
      reg.interpretation_required ? "Yes" : "No",
      reg.dietary_requirements || "",
      reg.capacity_building_areas?.join("; ") || "",
      new Date(reg.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `workshop-registrations-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = (registration: WorkshopRegistration) => {
    // Create a printable HTML page
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate PDF');
      return;
    }

    // Get absolute URLs for logos
    const baseUrl = window.location.origin;
    const ufvLogo = `${baseUrl}/partners/UFV.png`;
    const isdbLogo = `${baseUrl}/partners/isDB.JPG`;
    const sifLogo = `${baseUrl}/partners/SIF.png`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Workshop Registration - ${registration.full_name}</title>
        <style>
          @media print {
            body { 
              margin: 0; 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .no-print { display: none; }
            .logos img {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 210mm;
            margin: 0 auto;
            background: white;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #16a34a;
            padding-bottom: 20px;
          }
          .logos {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .logos img {
            height: 60px;
            max-width: 150px;
            object-fit: contain;
            display: block;
          }
          h1 {
            color: #16a34a;
            font-size: 24px;
            margin: 10px 0;
          }
          h2 {
            color: #16a34a;
            font-size: 18px;
            margin: 20px 0 10px 0;
            border-bottom: 2px solid #16a34a;
            padding-bottom: 5px;
          }
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .field {
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 10px;
            margin-bottom: 10px;
            padding: 5px 0;
          }
          .field-label {
            font-weight: bold;
            color: #555;
          }
          .field-value {
            color: #000;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }
          .tag {
            background: #e5e7eb;
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 12px;
          }
          .signature-section {
            margin-top: 50px;
            page-break-inside: avoid;
          }
          .signature-box {
            border: 2px solid #000;
            padding: 40px 20px;
            margin-top: 20px;
            min-height: 100px;
          }
          .signature-label {
            font-weight: bold;
            margin-bottom: 60px;
            color: #555;
          }
          .signature-line {
            border-top: 2px solid #000;
            margin-top: 10px;
            padding-top: 5px;
            display: flex;
            justify-content: space-between;
          }
          .print-button {
            background: #16a34a;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 6px;
            margin: 20px auto;
            display: block;
          }
          .print-button:hover {
            background: #15803d;
          }
        </style>
      </head>
      <body>
        <div class="no-print">
          <button class="print-button" onclick="window.print()">Print to PDF</button>
        </div>

        <div class="header">
          <div class="logos">
            <img src="${ufvLogo}" alt="UFV" crossorigin="anonymous">
            <img src="${isdbLogo}" alt="IsDB" crossorigin="anonymous">
            <img src="${sifLogo}" alt="SIF" crossorigin="anonymous">
          </div>
          <h1>Workshop Registration Form</h1>
          <p style="color: #666; margin: 5px 0;">Registration Date: ${new Date(registration.created_at).toLocaleDateString()}</p>
        </div>

        <div class="section">
          <h2>A. Personal Information</h2>
          <div class="field">
            <div class="field-label">Full Name:</div>
            <div class="field-value">${registration.full_name || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Gender:</div>
            <div class="field-value">${registration.gender || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Date of Birth:</div>
            <div class="field-value">${registration.date_of_birth || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Nationality:</div>
            <div class="field-value">${registration.nationality || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Country of Residence:</div>
            <div class="field-value">${registration.country_of_residence || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Passport/ID Number:</div>
            <div class="field-value">${registration.passport_number || 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <h2>B. Organization Details</h2>
          <div class="field">
            <div class="field-label">Organization Name:</div>
            <div class="field-value">${registration.organization_name || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Organization Type:</div>
            <div class="field-value">${registration.organization_type || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Position Title:</div>
            <div class="field-value">${registration.position_title || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Years of Experience:</div>
            <div class="field-value">${registration.years_experience || 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <h2>C. Contact Information</h2>
          <div class="field">
            <div class="field-label">Email Address:</div>
            <div class="field-value">${registration.email || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone Number:</div>
            <div class="field-value">${registration.phone || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Emergency Contact:</div>
            <div class="field-value">${registration.emergency_contact || 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <h2>D. Travel Information</h2>
          <div class="field">
            <div class="field-label">Country of Departure:</div>
            <div class="field-value">${registration.country_of_departure || 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <h2>E. Language & Participation</h2>
          <div class="field">
            <div class="field-label">Preferred Languages:</div>
            <div class="field-value">
              <div class="tags">
                ${registration.preferred_languages?.map(lang => `<span class="tag">${lang}</span>`).join('') || 'N/A'}
              </div>
            </div>
          </div>
          <div class="field">
            <div class="field-label">Interpretation Required:</div>
            <div class="field-value">${registration.interpretation_required ? 'Yes' : 'No'}</div>
          </div>
        </div>

        <div class="section">
          <h2>F. Dietary Requirements</h2>
          <div class="field">
            <div class="field-label">Dietary Requirements:</div>
            <div class="field-value">${registration.dietary_requirements || 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <h2>G. Capacity Building</h2>
          <div class="field">
            <div class="field-label">Capacity Building Areas:</div>
            <div class="field-value">
              <div class="tags">
                ${registration.capacity_building_areas?.map(area => `<span class="tag">${area}</span>`).join('') || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div class="signature-section">
          <h2>Declaration & Signature</h2>
          <p style="color: #666; font-style: italic; margin: 15px 0;">
            I declare that the information provided in this registration form is accurate and complete to the best of my knowledge.
          </p>
          <div class="signature-box">
            <div class="signature-label">Participant's Signature:</div>
            <div style="height: 60px;"></div>
            <div class="signature-line">
              <span>Date: _____________________</span>
              <span>Signature: _____________________</span>
            </div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button class="print-button" onclick="window.print()">Print to PDF</button>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.organization_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesOrg = !filterOrg || reg.organization_type === filterOrg;
    
    return matchesSearch && matchesOrg;
  });

  const orgTypes = Array.from(new Set(registrations.map(r => r.organization_type).filter(Boolean)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Workshop Registrations</h1>
        <div className="flex gap-4">
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export to Excel
          </button>
          <button
            onClick={fetchRegistrations}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Total Registrations</div>
          <div className="text-3xl font-bold text-orange-600">{registrations.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Certificates Issued</div>
          <div className="text-3xl font-bold text-green-600">
            {registrations.filter(r => r.certificate_number).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Interpretation Required</div>
          <div className="text-3xl font-bold text-purple-600">
            {registrations.filter(r => r.interpretation_required).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Registered This Month</div>
          <div className="text-3xl font-bold text-blue-600">
            {registrations.filter(r => new Date(r.created_at).getMonth() === new Date().getMonth()).length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, or organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Organization Type</label>
            <select
              value={filterOrg}
              onChange={(e) => setFilterOrg(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {orgTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Registrations List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 bg-gray-50 border-b">
            <h2 className="text-xl font-bold">
              Registrations ({filteredRegistrations.length})
            </h2>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 400px)" }}>
            {filteredRegistrations.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No registrations found
              </div>
            ) : (
              <div className="divide-y">
                {filteredRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedRegistration(reg)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition ${
                      selectedRegistration?.id === reg.id ? "bg-orange-50 border-l-4 border-orange-600" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{reg.full_name}</h3>
                      <div className="flex gap-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {reg.organization_type || "N/A"}
                        </span>
                        {reg.certificate_number && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Certified
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{reg.organization_name}</p>
                    <p className="text-sm text-gray-500">{reg.email}</p>
                    <p className="text-sm text-gray-500">{reg.phone}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {reg.interpretation_required && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">🗣️ Interpretation</span>
                      )}
                      {reg.dietary_requirements && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🍽️ {reg.dietary_requirements}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Registered: {new Date(reg.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 bg-gray-50 border-b">
            <h2 className="text-xl font-bold">Registration Details</h2>
          </div>
          <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(100vh - 400px)" }}>
            {!selectedRegistration ? (
              <div className="text-center text-gray-500 py-12">
                Select a registration to view details
              </div>
            ) : (
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium">{selectedRegistration.full_name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{selectedRegistration.gender || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="font-medium">{selectedRegistration.date_of_birth || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Nationality:</span>
                      <span className="font-medium">{selectedRegistration.nationality || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Country of Residence:</span>
                      <span className="font-medium">{selectedRegistration.country_of_residence || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Passport/ID:</span>
                      <span className="font-medium">{selectedRegistration.passport_number || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Organization Details */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Organization Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Organization:</span>
                      <span className="font-medium">{selectedRegistration.organization_name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedRegistration.organization_type || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Position:</span>
                      <span className="font-medium">{selectedRegistration.position_title || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Years Experience:</span>
                      <span className="font-medium">{selectedRegistration.years_experience || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Email:</span>
                      <a href={`mailto:${selectedRegistration.email}`} className="font-medium text-blue-600 hover:underline">
                        {selectedRegistration.email}
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Phone:</span>
                      <a href={`tel:${selectedRegistration.phone}`} className="font-medium text-blue-600 hover:underline">
                        {selectedRegistration.phone}
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Emergency Contact:</span>
                      <span className="font-medium">{selectedRegistration.emergency_contact || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Travel Information */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Travel Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Country of Departure:</span>
                      <span className="font-medium">{selectedRegistration.country_of_departure || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Language & Participation */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Language & Participation</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Preferred Languages:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedRegistration.preferred_languages?.map(lang => (
                          <span key={lang} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {lang}
                          </span>
                        )) || <span className="text-gray-500">N/A</span>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Interpretation:</span>
                      <span className={`font-medium ${selectedRegistration.interpretation_required ? "text-green-600" : ""}`}>
                        {selectedRegistration.interpretation_required ? "✓ Required" : "Not required"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dietary Requirements */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Dietary Requirements</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Dietary Requirements:</span>
                      <span className="font-medium">{selectedRegistration.dietary_requirements || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Capacity Building */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Capacity Building</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Capacity Building Areas:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedRegistration.capacity_building_areas?.map(area => (
                          <span key={area} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                            {area}
                          </span>
                        )) || <span className="text-gray-500">N/A</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t pt-4 flex gap-4">
                  <button
                    onClick={() => generatePDF(selectedRegistration)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Export PDF
                  </button>
                  <button
                    onClick={() => handleGenerateCertificate(selectedRegistration)}
                    disabled={generatingCertificate}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:bg-gray-400"
                  >
                    {generatingCertificate ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        {selectedRegistration.certificate_number ? 'View Certificate' : 'Generate Certificate'}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedRegistration.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>

                {/* Certificate Status */}
                {selectedRegistration.certificate_number && (
                  <div className="border-t pt-4 mt-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm">
                          <p className="font-semibold text-green-800 mb-1">Certificate Generated</p>
                          <p className="text-green-700">
                            Certificate Number: <span className="font-mono font-bold">{selectedRegistration.certificate_number}</span>
                          </p>
                          {selectedRegistration.certificate_generated_at && (
                            <p className="text-green-600 text-xs mt-1">
                              Generated: {new Date(selectedRegistration.certificate_generated_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && certificateData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Certificate Preview</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Certificate Number: <span className="font-mono font-bold">{certificateData.certificateNumber}</span>
                </p>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <CertificateRenderer
                certificateData={certificateData}
                onReady={handleCertificateReady}
              />

              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleDownloadCertificate}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Certificate (PNG)
                </button>
                <button
                  onClick={() => {
                    const url = certificateData.verificationUrl;
                    window.open(url, '_blank');
                  }}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Test Verification
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">QR Code Verification</p>
                    <p>The QR code on the certificate links to: <span className="font-mono text-xs break-all">{certificateData.verificationUrl}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
