"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, updateSiteConfig } from "@/lib/firestore";
import ImageUploader from "@/components/ImageUploader";

export default function GenericArrayEditor({ docId, title, fields }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteConfig(docId);
      if (data && data.items) {
        setItems(data.items);
      }
      setLoading(false);
    }
    load();
  }, [docId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteConfig(docId, { items });
      alert("Saved successfully!");
    } catch (err) {
      alert("Failed to save.");
    }
    setSaving(false);
  };

  const addItem = () => {
    const newItem = {};
    fields.forEach(f => newItem[f.name] = "");
    setItems([...items, newItem]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  if (loading) return <div>Loading {title}...</div>;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline-md text-headline-md text-on-background">{title}</h3>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-primary text-on-primary font-button text-button px-6 py-2 uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8 mb-8">
        {items.map((item, index) => (
          <div key={index} className="border border-outline-variant p-6 relative group bg-surface-bright">
            <button 
              onClick={() => removeItem(index)}
              className="absolute top-4 right-4 text-red-500 opacity-50 hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
            </button>
            <h4 className="font-label-caps text-label-caps text-outline mb-4">Item {index + 1}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.name} className={`flex flex-col ${field.type === 'textarea' || field.type === 'image' ? 'md:col-span-2' : ''}`}>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors"
                      value={item[field.name]} 
                      onChange={(e) => updateItem(index, field.name, e.target.value)}
                      rows={3}
                    />
                  ) : field.type === 'image' ? (
                    <div className="flex flex-col gap-4">
                      {item[field.name] && <img src={item[field.name]} alt="preview" className="h-32 object-cover border border-outline-variant" />}
                      <div className="border border-dashed border-outline-variant p-4">
                         <ImageUploader onUploadSuccess={(url) => updateItem(index, field.name, url)} />
                      </div>
                      <input 
                        className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors"
                        value={item[field.name]} 
                        onChange={(e) => updateItem(index, field.name, e.target.value)}
                        placeholder="Or paste image URL here"
                      />
                    </div>
                  ) : (
                    <input 
                      className="bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-secondary transition-colors"
                      type={field.type || "text"}
                      value={item[field.name]} 
                      onChange={(e) => updateItem(index, field.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={addItem}
        className="font-button text-button text-on-surface-variant hover:text-on-background uppercase tracking-widest border border-outline-variant border-dashed w-full py-4 transition-all hover:bg-surface-container"
      >
        + Add New Item
      </button>
    </div>
  );
}
