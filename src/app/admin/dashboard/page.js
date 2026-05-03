"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeEditor from "@/components/admin/HomeEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import BridalEditor from "@/components/admin/BridalEditor";
import PortfolioEditor from "@/components/admin/PortfolioEditor";
import ContactEditor from "@/components/admin/ContactEditor";
import GeneralEditor from "@/components/admin/GeneralEditor";
import InboxTab from "@/components/admin/InboxTab";
import AppointmentsTab from "@/components/admin/AppointmentsTab";
import {
  HomeIcon,
  EditDocumentIcon,
  DiamondIcon,
  CollectionsIcon,
  ContactIcon,
  SettingsIcon,
  InboxIcon,
  LogoutIcon,
} from "@/components/Icons";

const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
  </svg>
);

const TABS = [
  { id: "home", label: "Home Page", icon: HomeIcon },
  { id: "services", label: "Services", icon: EditDocumentIcon },
  { id: "bridal", label: "Bridal & Groom", icon: DiamondIcon },
  { id: "portfolio", label: "Portfolio", icon: CollectionsIcon },
  { id: "contact", label: "Contact Info", icon: ContactIcon },
  { id: "appointments", label: "Appointments", icon: CalendarIcon },
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="font-body-md text-body-md text-on-surface-variant">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  const ActiveIcon = TABS.find(t => t.id === activeTab)?.icon;

  return (
    <div className="bg-background text-on-background font-body-md antialiased flex w-full min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-zinc-900 dark:text-zinc-100 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <span className="text-lg font-serif tracking-widest text-zinc-900 dark:text-zinc-100">Admin</span>
        <button onClick={handleLogout} className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
          <LogoutIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <nav className={`bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans text-xs tracking-widest uppercase h-screen w-64 border-r border-zinc-200 dark:border-zinc-800 fixed left-0 top-0 flex flex-col z-40 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-6 py-8 border-b border-zinc-200 dark:border-zinc-800 mb-2">
          <div className="text-lg font-serif tracking-widest text-zinc-900 dark:text-zinc-100">Admin Panel</div>
          <div className="text-zinc-500 lowercase tracking-normal mt-2 text-[11px]">Content Management</div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col w-full">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                    className={`flex items-center w-full text-left font-bold ${
                      activeTab === tab.id
                        ? 'border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                    } pl-6 py-4 transition-all`}
                  >
                    <Icon className="w-[18px] h-[18px] mr-4" />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center w-full text-left text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all ease-in-out duration-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] mr-4">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
            View Live Site
          </a>
          <button onClick={handleLogout} className="flex items-center w-full text-left text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all ease-in-out duration-300">
            <LogoutIcon className="w-[18px] h-[18px] mr-4" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-margin-desktop bg-surface-bright min-h-screen pt-20 md:pt-margin-desktop">
        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            {ActiveIcon && <ActiveIcon className="w-6 h-6 text-outline" />}
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              {TABS.find(t => t.id === activeTab)?.label || "Dashboard"}
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            {activeTab === "home" && "Edit the hero section and featured services displayed on your homepage."}
            {activeTab === "services" && "Manage your service catalog — add, edit, or remove services and their prices."}
            {activeTab === "bridal" && "Configure your bridal and groom packages with pricing and features."}
            {activeTab === "portfolio" && "Manage your portfolio gallery — showcase your best work to potential clients."}
            {activeTab === "contact" && "Update your contact information, address, and operational hours."}
            {activeTab === "appointments" && "Manage customer bookings and professional schedules."}
            {activeTab === "general" && "Configure site-wide settings like salon name, phone, WhatsApp, and social links."}
            {activeTab === "inbox" && "View and manage client inquiries submitted through the contact form."}
          </p>
        </header>

        {/* Tab Content */}
        {activeTab === "home" && <HomeEditor />}
        {activeTab === "services" && <ServicesEditor />}
        {activeTab === "bridal" && <BridalEditor />}
        {activeTab === "portfolio" && <PortfolioEditor />}
        {activeTab === "contact" && <ContactEditor />}
        {activeTab === "appointments" && <AppointmentsTab />}
        {activeTab === "general" && <GeneralEditor />}
        {activeTab === "inbox" && <InboxTab />}
      </main>
    </div>
  );
}
