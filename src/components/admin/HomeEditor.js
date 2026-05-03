"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, updateSiteConfig } from "@/lib/firestore";
import { fallbackData } from "@/lib/data";
import ImageUploader from "@/components/ImageUploader";
import { SaveIcon, AddIcon, DeleteIcon } from "@/components/Icons";

export default function HomeEditor() {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  // Initialize immediately with fallback data — no loading state needed
  const fb = fallbackData.home || {};
  const [heroTitle, setHeroTitle] = useState(fb.hero?.title || "");
  const [heroSubtitle, setHeroSubtitle] = useState(fb.hero?.subtitle || "");
  const [heroImage, setHeroImage] = useState(fb.hero?.imageUrl || "");
  const [featuredServices, setFeaturedServices] = useState(fb.featuredServices || []);

  // Try to load from Firestore in the background — update if data exists
  useEffect(() => {
    getSiteConfig("home").then((data) => {
      if (data && data.hero) {
        setHeroTitle(data.hero.title || heroTitle);
        setHeroSubtitle(data.hero.subtitle || heroSubtitle);
        setHeroImage(data.hero.imageUrl || heroImage);
      }
      if (data && data.featuredServices && data.featuredServices.length > 0) {
        setFeaturedServices(data.featuredServices);
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus("");
    try {
      await updateSiteConfig("home", {
        hero: { title: heroTitle, subtitle: heroSubtitle, imageUrl: heroImage },
        featuredServices,
      });
      setStatus("✓ Saved successfully!");
    } catch (err) {
      setStatus("✕ Failed to save. Check your Firestore connection.");
    }
    setSaving(false);
    setTimeout(() => setStatus(""), 4000);
  };

  const addService = () => {
    setFeaturedServices([...featuredServices, { name: "", description: "", price: "", imageUrl: "" }]);
  };

  const updateService = (index, field, value) => {
    const updated = [...featuredServices];
    updated[index] = { ...updated[index], [field]: value };
    setFeaturedServices(updated);
  };

  const removeService = (index) => {
    setFeaturedServices(featuredServices.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-headline-md text-headline-md text-on-background">Home Page Editor</h3>
        <div className="flex items-center gap-4">
          {status && <span className={`text-sm ${status.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{status}</span>}
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-primary text-on-primary font-button text-button px-6 py-3 uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity">
            <SaveIcon className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Hero Section</h4>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Hero Title</label>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Main headline text" />
          </div>
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Hero Subtitle</label>
            <textarea className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors resize-none" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={2} />
          </div>
          <div className="flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Hero Background Image</label>
            {heroImage && <img src={heroImage} alt="Hero preview" className="h-40 object-cover border border-outline-variant mb-4 rounded-sm" />}
            <div className="border border-dashed border-outline-variant p-4 mb-2">
              <ImageUploader onUploadSuccess={(url) => setHeroImage(url)} />
            </div>
            <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={heroImage} onChange={(e) => setHeroImage(e.target.value)} placeholder="Or paste image URL here" />
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6">Featured Services (Displayed on Home Page)</h4>
        <div className="space-y-6">
          {featuredServices.map((service, index) => (
            <div key={index} className="border border-outline-variant p-6 bg-surface-bright relative">
              <button onClick={() => removeService(index)} className="absolute top-4 right-4 text-red-500 opacity-50 hover:opacity-100 transition-opacity">
                <DeleteIcon className="w-5 h-5" />
              </button>
              <h5 className="font-label-caps text-label-caps text-outline mb-4">Service {index + 1}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Name</label>
                  <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={service.name} onChange={(e) => updateService(index, "name", e.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Price</label>
                  <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={service.price} onChange={(e) => updateService(index, "price", e.target.value)} />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Description</label>
                  <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={service.description} onChange={(e) => updateService(index, "description", e.target.value)} />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Image</label>
                  {service.imageUrl && <img src={service.imageUrl} alt="preview" className="h-24 object-cover border border-outline-variant mb-2 rounded-sm" />}
                  <div className="border border-dashed border-outline-variant p-3 mb-2">
                    <ImageUploader onUploadSuccess={(url) => updateService(index, "imageUrl", url)} />
                  </div>
                  <input className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors" value={service.imageUrl || ""} onChange={(e) => updateService(index, "imageUrl", e.target.value)} placeholder="Or paste image URL" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addService} className="mt-6 flex items-center gap-2 font-button text-button text-on-surface-variant hover:text-on-background uppercase tracking-widest border border-outline-variant border-dashed w-full py-4 transition-all hover:bg-surface-container justify-center">
          <AddIcon className="w-4 h-4" /> Add Featured Service
        </button>
      </div>
    </div>
  );
}
