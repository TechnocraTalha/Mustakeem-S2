"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, updateSiteConfig } from "@/lib/firestore";
import { fallbackData } from "@/lib/data";
import ImageUploader from "@/components/ImageUploader";
import { SaveIcon, AddIcon, DeleteIcon } from "@/components/Icons";

export default function ServicesEditor() {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const fb = fallbackData.services || {};
  const [heroText, setHeroText] = useState(fb.heroText || "Our Services");
  const [items, setItems] = useState(fb.items || []);

  useEffect(() => {
    getSiteConfig("services").then((data) => {
      if (data) {
        if (data.heroText) setHeroText(data.heroText);
        if (data.items && data.items.length > 0) setItems(data.items);
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus("");
    try {
      await updateSiteConfig("services", { heroText, items });
      setStatus("✓ Saved successfully!");
    } catch (err) {
      setStatus("✕ Failed to save. Check Firestore connection.");
    }
    setSaving(false);
    setTimeout(() => setStatus(""), 4000);
  };

  const addItem = () => setItems([...items, { title: "", price: "", description: "", image: "" }]);
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-headline-md text-headline-md text-on-background">Services Page Editor</h3>
        <div className="flex items-center gap-4">
          {status && <span className={`text-sm ${status.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{status}</span>}
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-primary text-on-primary font-button text-button px-6 py-3 uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity">
            <SaveIcon className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Page Header</h4>
        <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors w-full" value={heroText} onChange={(e) => setHeroText(e.target.value)} />
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Service Items</h4>
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="border border-outline-variant p-6 bg-surface-bright relative">
              <button onClick={() => removeItem(index)} className="absolute top-4 right-4 text-red-500 opacity-50 hover:opacity-100 transition-opacity">
                <DeleteIcon className="w-5 h-5" />
              </button>
              <h5 className="font-label-caps text-label-caps text-outline mb-4">Service {index + 1}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Title</label>
                  <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={item.title} onChange={(e) => updateItem(index, "title", e.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Price</label>
                  <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={item.price} onChange={(e) => updateItem(index, "price", e.target.value)} />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Description</label>
                  <textarea className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors resize-none" value={item.description} onChange={(e) => updateItem(index, "description", e.target.value)} rows={2} />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Image (Optional)</label>
                  {item.image && <img src={item.image} alt="preview" className="h-24 object-cover border border-outline-variant mb-2 rounded-sm" />}
                  <div className="border border-dashed border-outline-variant p-3 mb-2">
                    <ImageUploader onUploadSuccess={(url) => updateItem(index, "image", url)} />
                  </div>
                  <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={item.image || ""} onChange={(e) => updateItem(index, "image", e.target.value)} placeholder="Or paste image URL" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-6 flex items-center gap-2 font-button text-button text-on-surface-variant hover:text-on-background uppercase tracking-widest border border-outline-variant border-dashed w-full py-4 transition-all hover:bg-surface-container justify-center">
          <AddIcon className="w-4 h-4" /> Add New Service
        </button>
      </div>
    </div>
  );
}
