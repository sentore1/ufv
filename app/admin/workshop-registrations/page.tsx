"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
  arrival_date: string;
  departure_date: string;
  accommodation_required: boolean;
  airport_pickup_required: boolean;
  preferred_languages: string[];
  interpretation_required: boolean;
  dietary_requirements: string;
  allergies_conditions: string;
  special_needs: string;
  expectations: string;
  capacity_building_areas: string[];
  signature_name: string;
  signature_date: string;
  created_at: string;
}

export default function WorkshopRegistrationsAdmin() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<WorkshopRegistration | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOrg, setFilterOrg] = useState("");

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
      "Years Experience", "Emergency Contact", "Country of Departure", "Arrival Date",
      "Departure Date", "Accommodation Required", "Airport Pickup Required",
      "Preferred Languages", "Interpretation Required", "Dietary Requirements",
      "Allergies/Conditions", "Special Needs", "Expectations", "Capacity Building Areas",
      "Signature Name", "Signature Date", "Registration Date"
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
      reg.arrival_date || "",
      reg.departure_date || "",
      reg.accommodation_required ? "Yes" : "No",
      reg.airport_pickup_required ? "Yes" : "No",
      reg.preferred_languages?.join("; ") || "",
      reg.interpretation_required ? "Yes" : "No",
      reg.dietary_requirements || "",
      reg.allergies_conditions || "",
      reg.special_needs || "",
      reg.expectations || "",
      reg.capacity_building_areas?.join("; ") || "",
      reg.signature_name || "",
      reg.signature_date || "",
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
            Export CSV
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
          <div className="text-gray-600 text-sm font-medium">Accommodation Required</div>
          <div className="text-3xl font-bold text-blue-600">
            {registrations.filter(r => r.accommodation_required).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Airport Pickup Required</div>
          <div className="text-3xl font-bold text-green-600">
            {registrations.filter(r => r.airport_pickup_required).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Interpretation Required</div>
          <div className="text-3xl font-bold text-purple-600">
            {registrations.filter(r => r.interpretation_required).length}
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
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {reg.organization_type || "N/A"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{reg.organization_name}</p>
                    <p className="text-sm text-gray-500">{reg.email}</p>
                    <p className="text-sm text-gray-500">{reg.phone}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {reg.accommodation_required && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🏨 Accommodation</span>
                      )}
                      {reg.airport_pickup_required && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">✈️ Pickup</span>
                      )}
                      {reg.interpretation_required && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">🗣️ Interpretation</span>
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

                {/* Travel & Accommodation */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Travel & Accommodation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Country of Departure:</span>
                      <span className="font-medium">{selectedRegistration.country_of_departure || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Arrival Date:</span>
                      <span className="font-medium">{selectedRegistration.arrival_date || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Departure Date:</span>
                      <span className="font-medium">{selectedRegistration.departure_date || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Accommodation:</span>
                      <span className={`font-medium ${selectedRegistration.accommodation_required ? "text-green-600" : ""}`}>
                        {selectedRegistration.accommodation_required ? "✓ Required" : "Not required"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Airport Pickup:</span>
                      <span className={`font-medium ${selectedRegistration.airport_pickup_required ? "text-green-600" : ""}`}>
                        {selectedRegistration.airport_pickup_required ? "✓ Required" : "Not required"}
                      </span>
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

                {/* Dietary & Special Needs */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Dietary & Special Needs</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Dietary Requirements:</span>
                      <span className="font-medium">{selectedRegistration.dietary_requirements || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Allergies/Conditions:</span>
                      <p className="mt-1 text-gray-900">{selectedRegistration.allergies_conditions || "None"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Special Needs:</span>
                      <p className="mt-1 text-gray-900">{selectedRegistration.special_needs || "None"}</p>
                    </div>
                  </div>
                </div>

                {/* Expectations */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Expectations</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">What to gain from workshop:</span>
                      <p className="mt-1 text-gray-900">{selectedRegistration.expectations || "N/A"}</p>
                    </div>
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

                {/* Declaration */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Declaration</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Signature Name:</span>
                      <span className="font-medium">{selectedRegistration.signature_name || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Signature Date:</span>
                      <span className="font-medium">{selectedRegistration.signature_date || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t pt-4 flex gap-4">
                  <button
                    onClick={() => handleDelete(selectedRegistration.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete Registration
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
