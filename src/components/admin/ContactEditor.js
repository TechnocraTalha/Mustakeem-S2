"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, updateSiteConfig } from "@/lib/firestore";
import { fallbackData } from "@/lib/data";
import { SaveIcon } from "@/components/Icons";

export default function ContactEditor() {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const fb = fallbackData.contact || {};
  const [address, setAddress] = useState(fb.address || "");
  const [phone, setPhone] = useState(fb.phone || "");
  const [email, setEmail] = useState(fb.email || "");
  const [weekday, setWeekday] = useState(fb.hours?.weekday || "");
  const [saturday, setSaturday] = useState(fb.hours?.saturday || "");
  const [sunday, setSunday] = useState(fb.hours?.sunday || "");

  useEffect(() => {
    getSiteConfig("contact").then((data) => {
      if (data) {
        if (data.address) setAddress(data.address);
        if (data.phone) setPhone(data.phone);
        if (data.email) setEmail(data.email);
        if (data.hours?.weekday) setWeekday(data.hours.weekday);
        if (data.hours?.saturday) setSaturday(data.hours.saturday);
        if (data.hours?.sunday) setSunday(data.hours.sunday);
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true); setStatus("");
    try {
      await updateSiteConfig("contact", { address, phone, email, hours: { weekday, saturday, sunday } });
      setStatus("✓ Saved successfully!");
    } catch { setStatus("✕ Failed to save."); }
    setSaving(false);
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-headline-md text-headline-md text-on-background">Contact Page Editor</h3>
        <div className="flex items-center gap-4">
          {status && <span className={`text-sm ${status.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{status}</span>}
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-primary text-on-primary font-button text-button px-6 py-3 uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity">
            <SaveIcon className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Contact Information</h4>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Address</label>
            <textarea className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors resize-none" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Phone Number</label>
              <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Email</label>
              <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Operational Hours</h4>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Monday - Friday</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={weekday} onChange={(e) => setWeekday(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Saturday</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={saturday} onChange={(e) => setSaturday(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Sunday</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={sunday} onChange={(e) => setSunday(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
