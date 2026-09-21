"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface CertificateDirector {
  id: string;
  full_name: string;
  role: string;
  signature_position: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function CertificateDirectorsAdmin() {
  const router = useRouter();
  const [directors, setDirectors] = useState<CertificateDirector[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDirector, setEditingDirector] = useState<CertificateDirector | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    role: "",
    signature_position: 1,
    is_active: true,
    display_order: 1,
  });

  useEffect(() => {
    if (!localStorage.getItem("adminAuth")) {
      router.push("/admin");
      return;
    }
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("certificate_directors")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching directors:", error);
      } else {
        setDirectors(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setIsAddingNew(true);
    setEditingDirector(null);
    setFormData({
      full_name: "",
      role: "",
      signature_position: 1,
      is_active: true,
      display_order: directors.length + 1,
    });
  };

  const handleEdit = (director: CertificateDirector) => {
    setEditingDirector(director);
    setIsAddingNew(false);
    setFormData({
      full_name: director.full_name,
      role: director.role,
      signature_position: director.signature_position,
      is_active: director.is_active,
      display_order: director.display_order,
    });
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingDirector(null);
    setFormData({
      full_name: "",
      role: "",
      signature_position: 1,
      is_active: true,
      display_order: 1,
    });
  };

  const handleSave = async () => {
    if (!formData.full_name.trim() || !formData.role.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      if (isAddingNew) {
        const { error } = await supabase
          .from("certificate_directors")
          .insert([formData]);

        if (error) {
          console.error("Error adding director:", error);
          alert("Failed to add director: " + error.message);
        } else {
          alert("Director added successfully!");
          handleCancel();
          fetchDirectors();
        }
      } else if (editingDirector) {
        const { error } = await supabase
          .from("certificate_directors")
          .update(formData)
          .eq("id", editingDirector.id);

        if (error) {
          console.error("Error updating director:", error);
          alert("Failed to update director: " + error.message);
        } else {
          alert("Director updated successfully!");
          handleCancel();
          fetchDirectors();
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this director?")) return;

    const { error } = await supabase
      .from("certificate_directors")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting director:", error);
      alert("Failed to delete director: " + error.message);
    } else {
      alert("Director deleted successfully!");
      fetchDirectors();
    }
  };

  const getPositionLabel = (position: number) => {
    switch (position) {
      case 1: return "Left";
      case 2: return "Center";
      case 3: return "Right";
      default: return `Position ${position}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading directors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Certificate Directors</h1>
          <p className="text-gray-600 mt-2">Manage director signatures that appear on certificates</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Director
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingDirector) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-green-500">
          <h2 className="text-xl font-bold mb-4">
            {isAddingNew ? "Add New Director" : "Edit Director"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Dr. John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role/Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Executive Director"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature Position
              </label>
              <select
                value={formData.signature_position}
                onChange={(e) => setFormData({ ...formData, signature_position: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value={1}>Left</option>
                <option value={2}>Center</option>
                <option value={3}>Right</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                min="1"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Active (appears on certificates)</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {isAddingNew ? "Add Director" : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Directors List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {directors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No directors found. Click "Add New Director" to create one.
                  </td>
                </tr>
              ) : (
                directors.map((director) => (
                  <tr key={director.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{director.display_order}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{director.full_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{director.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getPositionLabel(director.signature_position)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {director.is_active ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(director)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(director.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate Preview Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Certificate Layout</h3>
        <p className="text-sm text-blue-800 mb-4">
          Director signatures will appear at the bottom of the certificate in three positions:
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded border border-blue-300">
            <div className="text-xs text-gray-500 mb-1">Position 1</div>
            <div className="font-bold text-blue-900">LEFT</div>
            <div className="text-xs text-gray-600 mt-1">
              {directors.filter(d => d.signature_position === 1 && d.is_active).length} director(s)
            </div>
          </div>
          <div className="bg-white p-4 rounded border border-blue-300">
            <div className="text-xs text-gray-500 mb-1">Position 2</div>
            <div className="font-bold text-blue-900">CENTER</div>
            <div className="text-xs text-gray-600 mt-1">
              {directors.filter(d => d.signature_position === 2 && d.is_active).length} director(s)
            </div>
          </div>
          <div className="bg-white p-4 rounded border border-blue-300">
            <div className="text-xs text-gray-500 mb-1">Position 3</div>
            <div className="font-bold text-blue-900">RIGHT</div>
            <div className="text-xs text-gray-600 mt-1">
              {directors.filter(d => d.signature_position === 3 && d.is_active).length} director(s)
            </div>
          </div>
        </div>
        <p className="text-xs bg-blue-100 text-blue-800 mt-4 p-3 rounded">
          Tip: Only active directors will appear on generated certificates. Use "Display Order" to control the order within each position.
        </p>
      </div>
    </div>
  );
}
