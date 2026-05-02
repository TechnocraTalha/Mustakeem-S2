"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import GenericArrayEditor from "@/components/admin/GenericArrayEditor";
import InboxTab from "@/components/admin/InboxTab";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (isAuth !== "true") {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-on-background">Loading...</div>;
  }

  return (
    <div className="bg-background text-on-background font-body-md antialiased flex w-full min-h-screen">
      <nav className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans text-xs tracking-widest uppercase h-screen w-64 border-r border-zinc-200 dark:border-zinc-800 fixed left-0 top-0 flex flex-col z-40">
        <div className="px-6 py-8 border-b border-zinc-200 dark:border-zinc-800 mb-4">
          <div className="text-lg font-serif tracking-widest text-zinc-900 dark:text-zinc-100">Admin Panel</div>
          <div className="text-zinc-500 lowercase tracking-normal mt-2">talhasiddiqui240@gmail.com</div>
        </div>
        <ul className="flex flex-col w-full">
          <li>
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center w-full text-left font-bold ${activeTab === 'dashboard' ? 'border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'} pl-6 py-4 transition-all`}
            >
              <span className="material-symbols-outlined mr-4 text-lg">dashboard</span>
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("services")}
              className={`flex items-center w-full text-left font-bold ${activeTab === 'services' ? 'border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'} pl-6 py-4 transition-all`}
            >
              <span className="material-symbols-outlined mr-4 text-lg">edit_document</span>
              Services
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("portfolio")}
              className={`flex items-center w-full text-left font-bold ${activeTab === 'portfolio' ? 'border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'} pl-6 py-4 transition-all`}
            >
              <span className="material-symbols-outlined mr-4 text-lg">collections</span>
              Portfolio
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("bridal")}
              className={`flex items-center w-full text-left font-bold ${activeTab === 'bridal' ? 'border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'} pl-6 py-4 transition-all`}
            >
              <span className="material-symbols-outlined mr-4 text-lg">diamond</span>
              Bridal & Groom
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("inbox")}
              className={`flex items-center w-full text-left font-bold ${activeTab === 'inbox' ? 'border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'} pl-6 py-4 transition-all`}
            >
              <span className="material-symbols-outlined mr-4 text-lg">forward_to_inbox</span>
              Inbox
            </button>
          </li>
        </ul>
        <div className="mt-auto p-6 border-t border-zinc-200 dark:border-zinc-800">
          <button onClick={handleLogout} className="flex items-center w-full text-left text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all ease-in-out duration-300">
            <span className="material-symbols-outlined mr-4 text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
            Sign Out
          </button>
        </div>
      </nav>

      <main className="flex-1 ml-64 p-margin-desktop bg-surface-bright min-h-screen">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">System Overview</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">Manage your digital presence, update content, and review client inquiries from a centralized command center.</p>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <section className="col-span-1 md:col-span-8 bg-surface-container-lowest border border-outline-variant p-8 flex flex-col">
              <div className="flex items-center mb-6">
                <span className="material-symbols-outlined text-outline mr-3" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_upload</span>
                <h3 className="font-label-caps text-label-caps text-on-background uppercase tracking-[0.15em]">Media Asset Uploader</h3>
              </div>
              <ImageUploader onUploadSuccess={(url) => alert(`Uploaded successfully! URL: ${url}`)} />
            </section>
          </div>
        )}

        {activeTab === "services" && (
          <GenericArrayEditor 
            docId="services" 
            title="Services Management" 
            fields={[
              { name: "title", label: "Title" },
              { name: "price", label: "Price" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "image", label: "Image URL", type: "image" }
            ]} 
          />
        )}

        {activeTab === "portfolio" && (
          <GenericArrayEditor 
            docId="portfolio" 
            title="Portfolio Manager" 
            fields={[
              { name: "title", label: "Title" },
              { name: "category", label: "Category" },
              { name: "image", label: "Image URL", type: "image" }
            ]} 
          />
        )}

        {activeTab === "bridal" && (
          <GenericArrayEditor 
            docId="bridal" 
            title="Bridal & Groom Packages" 
            fields={[
              { name: "title", label: "Title" },
              { name: "duration", label: "Duration" },
              { name: "price", label: "Price" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "image", label: "Image URL", type: "image" }
            ]} 
          />
        )}

        {activeTab === "inbox" && <InboxTab />}
      </main>
    </div>
  );
}
