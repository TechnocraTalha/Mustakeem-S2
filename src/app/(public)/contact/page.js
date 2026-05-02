"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Name and phone number are required.");
      return;
    }
    setLoading(true);
    try {
      await submitContactMessage({
        clientName: formData.name,
        phone: formData.phone,
        subject: formData.service,
        message: formData.message,
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setFormData({ name: "", phone: "", service: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-container-max mx-auto">
      {/* Hero Section */}
      <section className="w-full max-w-container-max flex flex-col md:flex-row gap-gutter mb-section-gap">
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <h1 className="font-display-lg text-display-lg text-primary mb-6">Connection<br />Hub</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Reach out to our specialists to curate your bespoke salon experience. We await your inquiry.
          </p>
        </div>
        <div className="w-full md:w-7/12 aspect-[4/3] bg-surface-container-low overflow-hidden relative">
          <img alt="Salon interior" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAopMZ42BkRkp8OT4TGyIVxUah-GOj4SGLhqF2HUlm_cZM9biq2SlSIiSPgHFVZpLxJKx7V-vZAxfsJBRu-VMZARsfuQmrhcOzzz6y0uDUSe8FOxChLjlcbijIvijFwEpVL97W8BX2ni5Zo0Q2gpe6VlLSqlUQpD--mBqTk97w9Sa2zXxM5bsrQ-f8A-dmt1mYrrspYcHf1JHNNgsvEfyBqqrxTK3ekLsD2WaZkl5xruGhi6zNop4L5beVJ9y7IFqty0B4yoy9I8zg" />
        </div>
      </section>

      {/* Bento Grid Contact Info & Form */}
      <section id="inquiry" className="w-full max-w-container-max bento-grid mb-section-gap">
        {/* Left Column: Info Cards & Hours */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-gutter">
          {/* Info Cards */}
          <div className="glass-panel p-8 flex flex-col gap-8 h-full">
            <div>
              <h3 className="font-label-caps text-label-caps text-outline mb-2">Location</h3>
              <p className="font-body-md text-body-md text-on-surface">123 Heritage Lane, Old Delhi<br />India 110006</p>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-outline mb-2">Direct Line</h3>
              <p className="font-body-md text-body-md text-on-surface">+91 98765 43210</p>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-outline mb-2">Digital Correspondence</h3>
              <p className="font-body-md text-body-md text-on-surface">concierge@lelegance.com</p>
            </div>
          </div>
          {/* Operational Hours */}
          <div className="border border-outline-variant p-8 bg-surface-bright">
            <h3 className="font-headline-md text-headline-md text-primary mb-6">Operational Hours</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <span className="font-body-md text-body-md text-on-surface-variant">Monday - Friday</span>
                <span className="font-body-md text-body-md text-on-surface">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <span className="font-body-md text-body-md text-on-surface-variant">Saturday</span>
                <span className="font-body-md text-body-md text-on-surface">9:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <span className="font-body-md text-body-md text-on-surface-variant">Sunday</span>
                <span className="font-body-md text-body-md text-on-surface">11:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: Contact Form */}
        <div className="col-span-12 md:col-span-7 bg-surface-bright border border-outline-variant p-8 md:p-12 flex flex-col justify-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Send an Inquiry</h2>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col flex-1 relative">
                <label className="font-label-caps text-label-caps text-outline mb-2" htmlFor="name">Full Name</label>
                <input className="input-minimal font-body-md text-body-md text-on-surface" id="name" value={formData.name} onChange={handleChange} placeholder="Your formal name" type="text" required />
              </div>
              <div className="flex flex-col flex-1 relative">
                <label className="font-label-caps text-label-caps text-outline mb-2" htmlFor="phone">Contact Number</label>
                <input className="input-minimal font-body-md text-body-md text-on-surface" id="phone" value={formData.phone} onChange={handleChange} placeholder="For immediate assistance" type="tel" required />
              </div>
            </div>
            <div className="flex flex-col relative">
              <label className="font-label-caps text-label-caps text-outline mb-2" htmlFor="service">Service of Interest</label>
              <select className="input-minimal font-body-md text-body-md text-on-surface appearance-none bg-transparent" id="service" value={formData.service} onChange={handleChange}>
                <option disabled value="">Select a service</option>
                <option value="Bridal Consultation">Bridal Consultation</option>
                <option value="Bespoke Styling">Bespoke Styling</option>
                <option value="Rejuvenating Treatments">Rejuvenating Treatments</option>
                <option value="Other Inquiry">Other Inquiry</option>
              </select>
              <span className="material-symbols-outlined absolute right-0 bottom-2 text-outline pointer-events-none" style={{ fontVariationSettings: "'FILL' 0" }}>expand_more</span>
            </div>
            <div className="flex flex-col relative">
              <label className="font-label-caps text-label-caps text-outline mb-2" htmlFor="message">Message</label>
              <textarea className="input-minimal font-body-md text-body-md text-on-surface resize-none" id="message" value={formData.message} onChange={handleChange} placeholder="Detail your requirements..." rows="4"></textarea>
            </div>
            {success && <p className="text-[#25D366]">Your inquiry has been submitted successfully.</p>}
            <button className="mt-4 font-button text-button bg-primary text-on-primary py-4 px-8 self-start hover:bg-primary/90 transition-colors disabled:opacity-50" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full max-w-container-max mb-section-gap">
        <div className="w-full h-[400px] bg-surface-container-high relative overflow-hidden border border-outline-variant">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.918116548777!2d77.05436329999999!3d28.58537655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b1a4574944d%3A0xcda6b005e3ba9f08!2sRamphal%20Chowk%2C%20Sector%207%20Dwarka%2C%20Dwarka%2C%20Delhi%2C%20110075!5e0!3m2!1sen!2sin!4v1714757655986!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
