'use client';

import { useState, useEffect } from 'react';

export default function DonationsAdmin() {
  const [donations, setDonations] = useState<any[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const res = await fetch('/api/donations');
    const data = await res.json();
    setDonations(Array.isArray(data) ? data : []);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Donations</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(donation.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{donation.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">${donation.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.donor_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button onClick={() => setSelectedDonation(donation)} className="text-blue-600 hover:text-blue-800 font-medium">
                      View
                    </button>
                    {donation.status === 'pending' && (
                      <button onClick={async () => {
                        await fetch('/api/donations', {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: donation.id, status: 'approved' })
                        });
                        fetchDonations();
                      }} className="text-green-600 hover:text-green-800 font-medium">
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedDonation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Donation Details</h2>
                <button onClick={() => setSelectedDonation(null)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">{new Date(selectedDonation.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-3 py-1 text-sm rounded-full ${selectedDonation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {selectedDonation.status}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold text-lg">{selectedDonation.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-bold text-2xl text-green-600">${selectedDonation.amount}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Donor Type</p>
                  <p className="font-semibold capitalize">{selectedDonation.donor_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">{selectedDonation.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{selectedDonation.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{selectedDonation.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold">{selectedDonation.address || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receipt Needed</p>
                  <p className="font-semibold">{selectedDonation.need_receipt ? 'Yes' : 'No'}</p>
                </div>
                {selectedDonation.additional_note && (
                  <div>
                    <p className="text-sm text-gray-500">Additional Note</p>
                    <p className="font-semibold">{selectedDonation.additional_note}</p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex gap-4">
                {selectedDonation.status === 'pending' && (
                  <>
                    <button onClick={async () => {
                      await fetch('/api/donations', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: selectedDonation.id, status: 'approved' })
                      });
                      setSelectedDonation(null);
                      fetchDonations();
                    }} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">
                      Approve
                    </button>
                    <button onClick={async () => {
                      await fetch('/api/donations', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: selectedDonation.id, status: 'cancelled' })
                      });
                      setSelectedDonation(null);
                      fetchDonations();
                    }} className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700">
                      Cancel
                    </button>
                  </>
                )}
                <button onClick={() => setSelectedDonation(null)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
