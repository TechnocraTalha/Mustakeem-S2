"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, updateSiteConfig } from "@/lib/firestore";
import { fallbackData } from "@/lib/data";
import { SaveIcon } from "@/components/Icons";

export default function GeneralEditor() {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const fb = fallbackData.general || {};
  const [salonName, setSalonName] = useState(fb.salonName || "");
  const [phone, setPhone] = useState(fb.phone || "");
  const [whatsapp, setWhatsapp] = useState(fb.whatsapp || "");
  const [email, setEmail] = useState(fb.email || "");
  const [instagram, setInstagram] = useState(fb.socials?.instagram || "");
  const [facebook, setFacebook] = useState(fb.socials?.facebook || "");

  useEffect(() => {
    getSiteConfig("general").then((data) => {
      if (data) {
        if (data.salonName) setSalonName(data.salonName);
        if (data.phone) setPhone(data.phone);
        if (data.whatsapp) setWhatsapp(data.whatsapp);
        if (data.email) setEmail(data.email);
        if (data.socials?.instagram) setInstagram(data.socials.instagram);
        if (data.socials?.facebook) setFacebook(data.socials.facebook);
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true); setStatus("");
    try {
      await updateSiteConfig("general", { salonName, phone, whatsapp, email, socials: { instagram, facebook } });
      setStatus("✓ Saved successfully!");
    } catch { setStatus("✕ Failed to save."); }
    setSaving(false);
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-headline-md text-headline-md text-on-background">General Settings</h3>
        <div className="flex items-center gap-4">
          {status && <span className={`text-sm ${status.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{status}</span>}
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-primary text-on-primary font-button text-button px-6 py-3 uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity">
            <SaveIcon className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Brand Identity</h4>
        <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors w-full" value={salonName} onChange={(e) => setSalonName(e.target.value)} placeholder="Salon name" />
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Contact Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Phone</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">WhatsApp</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Email</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Social Media</h4>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Instagram URL</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Facebook URL</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
