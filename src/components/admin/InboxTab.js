"use client";

import { useState, useEffect } from "react";
import { getContactMessages } from "@/lib/firestore";

export default function InboxTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getContactMessages();
        setMessages(data || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading Inbox...</div>;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline-md text-headline-md text-on-background">Recent Inquiries</h3>
      </div>
      
      {messages.length === 0 ? (
        <p className="text-on-surface-variant">No inquiries yet.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest pb-4 pr-4 font-normal">Date</th>
                <th className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest pb-4 pr-4 font-normal">Client Name</th>
                <th className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest pb-4 pr-4 font-normal">Contact</th>
                <th className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest pb-4 pr-4 font-normal">Subject</th>
                <th className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest pb-4 font-normal text-right">Message</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-on-background">
              {messages.map((msg, i) => (
                <tr key={msg.id || i} className="border-b border-outline-variant/50 hover:bg-surface-bright transition-colors group">
                  <td className="py-4 pr-4 text-outline text-sm whitespace-nowrap">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-4 pr-4">{msg.clientName}</td>
                  <td className="py-4 pr-4">{msg.phone}</td>
                  <td className="py-4 pr-4 text-on-surface-variant max-w-[200px] truncate">{msg.subject}</td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => alert(`Message from ${msg.clientName}:\n${msg.message}`)}
                      className="font-label-caps text-[10px] text-secondary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Read
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
