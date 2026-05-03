"use client";

import { useState, useEffect } from "react";
import { getContactMessages } from "@/lib/firestore";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DeleteIcon, CloseIcon, VisibilityIcon, MarkReadIcon } from "@/components/Icons";

export default function InboxTab() {
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    getContactMessages().then((data) => {
      setMessages(data || []);
      setLoaded(true);
    });
  }, []);

  const handleDelete = async (msgId) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, "contact_submissions", msgId));
      setMessages(messages.filter(m => m.id !== msgId));
      if (selectedMessage?.id === msgId) setSelectedMessage(null);
    } catch { alert("Failed to delete."); }
  };

  const handleToggleRead = async (msg) => {
    try {
      const newRead = !msg.read;
      await updateDoc(doc(db, "contact_submissions", msg.id), { read: newRead });
      setMessages(messages.map(m => m.id === msg.id ? { ...m, read: newRead } : m));
    } catch { /* silent */ }
  };

  return (
    <div className="space-y-8">
      <h3 className="font-headline-md text-headline-md text-on-background">
        Client Inquiries
        {messages.length > 0 && <span className="ml-3 text-sm font-body-md text-on-surface-variant">({messages.filter(m => !m.read).length} unread)</span>}
      </h3>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMessage(null)}>
          <div className="bg-surface-bright border border-outline-variant max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedMessage(null)} className="absolute top-4 right-4 text-outline hover:text-on-background transition-colors"><CloseIcon className="w-5 h-5" /></button>
            <h4 className="font-headline-md text-headline-md text-on-background mb-2">{selectedMessage.clientName}</h4>
            <p className="font-body-md text-on-surface-variant">{selectedMessage.phone}</p>
            <p className="font-body-md text-outline text-sm mt-1">{selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : ''}</p>
            {selectedMessage.subject && <div className="mt-4"><h5 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-2">Service Interest</h5><p className="font-body-md text-on-background">{selectedMessage.subject}</p></div>}
            <div className="mt-4"><h5 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-2">Message</h5><p className="font-body-md text-on-background whitespace-pre-wrap">{selectedMessage.message || "No message."}</p></div>
            <div className="mt-8 flex gap-4">
              <a href={`https://wa.me/${selectedMessage.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-button text-button uppercase bg-[#25D366] text-white py-3 hover:opacity-90 transition-opacity tracking-widest">Reply on WhatsApp</a>
              <button onClick={() => handleDelete(selectedMessage.id)} className="font-button text-button uppercase border border-red-500 text-red-500 px-6 py-3 hover:bg-red-50 transition-colors tracking-widest">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-surface-container-lowest border border-outline-variant">
        {!loaded ? (
          <div className="p-12 text-center"><p className="font-body-md text-on-surface-variant">Checking for messages...</p></div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-body-lg text-body-lg text-on-surface-variant">No inquiries yet.</p>
            <p className="font-body-md text-body-md text-outline mt-2">Client messages from the contact form will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-center gap-6 p-6 hover:bg-surface-bright transition-colors cursor-pointer group ${!msg.read ? 'bg-surface-container-low' : ''}`} onClick={() => setSelectedMessage(msg)}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${!msg.read ? 'bg-secondary' : 'bg-transparent'}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4 mb-1">
                    <h4 className={`font-body-md text-on-background truncate ${!msg.read ? 'font-semibold' : ''}`}>{msg.clientName}</h4>
                    <span className="font-label-caps text-[10px] text-outline whitespace-nowrap">{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                  {msg.subject && <p className="font-body-md text-on-surface-variant text-sm truncate">{msg.subject}</p>}
                  {msg.message && <p className="font-body-md text-outline text-sm truncate mt-1">{msg.message}</p>}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setSelectedMessage(msg)} className="p-2 text-outline hover:text-on-background transition-colors"><VisibilityIcon className="w-4 h-4" /></button>
                  <button onClick={() => handleToggleRead(msg)} className="p-2 text-outline hover:text-on-background transition-colors"><MarkReadIcon className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(msg.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors"><DeleteIcon className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
