"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DeleteIcon, SaveIcon } from "@/components/Icons";

export default function AppointmentsTab() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const fetchAppointments = async (isRefresh = false) => {
    if (isRefresh) setLoading(true);
    try {
      const q = query(collection(db, "appointments"));
      const snapshot = await getDocs(q);
      let apps = [];
      snapshot.forEach(doc => {
        apps.push({ id: doc.id, ...doc.data() });
      });
      // Sort in JS to prevent Firebase composite index requirement errors
      apps.sort((a, b) => {
        if (a.date === b.date) {
          return a.timeSlot.localeCompare(b.timeSlot);
        }
        return b.date.localeCompare(a.date);
      });
      setAppointments(apps);
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to load appointments. Please check permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(false);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "appointments", id), { status: newStatus });
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
      setStatusMsg("Status updated successfully.");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (err) {
      setStatusMsg("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await deleteDoc(doc(db, "appointments", id));
      setAppointments(appointments.filter(a => a.id !== id));
      setStatusMsg("Appointment deleted.");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (err) {
      setStatusMsg("Failed to delete appointment.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-headline-md text-headline-md text-on-background">Appointments Management</h3>
        <div className="flex items-center gap-4">
          {statusMsg && <span className="text-sm text-green-600">{statusMsg}</span>}
          <button onClick={() => fetchAppointments(true)} className="flex items-center gap-2 bg-primary text-on-primary font-button text-button px-6 py-3 uppercase tracking-widest hover:opacity-90 transition-opacity">
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-6">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Upcoming & Past Appointments</h4>
        
        {loading ? (
          <p className="text-on-surface-variant text-sm">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-on-surface-variant text-sm">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-bright border-b border-outline-variant uppercase tracking-widest font-label-caps text-outline text-xs">
                <tr>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Customer Email</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Professional</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-surface-bright/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-bold">{app.date}</div>
                      <div className="text-xs text-on-surface-variant">{app.timeSlot}</div>
                    </td>
                    <td className="p-4">{app.userEmail}</td>
                    <td className="p-4">{app.serviceName}</td>
                    <td className="p-4">{app.barberName}</td>
                    <td className="p-4">
                      <select 
                        value={app.status || "Confirmed"} 
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-xs p-1 border rounded ${
                          app.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
                          app.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                          'bg-green-50 text-green-700 border-green-200'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(app.id)} className="text-red-500 hover:text-red-700 transition-colors p-2" title="Delete">
                        <DeleteIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
