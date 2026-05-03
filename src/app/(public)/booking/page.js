"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

// Helper to format date
const formatDate = (dateObj) => {
  return dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
};

// Default Services and Barbers (to be fetched from Firestore in production)
const DEFAULT_SERVICES = [
  { id: "svc-1", name: "Premium Haircut", category: "Master Stylists", duration: 45, price: 50 },
  { id: "svc-2", name: "Style & Restyle", category: "Master Stylists", duration: 45, price: 60 },
  { id: "svc-3", name: "Full Color Setup", category: "Colorists", duration: 45, price: 80 },
  { id: "svc-4", name: "Highlights & Toning", category: "Colorists", duration: 45, price: 90 },
  { id: "svc-5", name: "Classic Beard Trim", category: "Barbers", duration: 45, price: 30 },
  { id: "svc-6", name: "Hot Towel Shave", category: "Barbers", duration: 45, price: 40 }
];

const DEFAULT_BARBERS = [
  { id: "barber-1", name: "Alex", specialization: "Master Stylists" },
  { id: "barber-2", name: "Jordan", specialization: "Master Stylists" },
  { id: "barber-3", name: "Taylor", specialization: "Master Stylists" },
  { id: "barber-4", name: "Casey", specialization: "Colorists" },
  { id: "barber-5", name: "Riley", specialization: "Colorists" },
  { id: "barber-6", name: "Morgan", specialization: "Colorists" },
  { id: "barber-7", name: "Jamie", specialization: "Colorists" },
  { id: "barber-8", name: "Avery", specialization: "Colorists" },
  { id: "barber-9", name: "Sam", specialization: "Barbers" },
  { id: "barber-10", name: "Drew", specialization: "Barbers" },
  { id: "barber-11", name: "Cameron", specialization: "Barbers" },
  { id: "barber-12", name: "Blake", specialization: "Barbers" }
];

const TIME_SLOTS = [
  "09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM", 
  "12:00 PM", "12:45 PM", "01:30 PM", "02:15 PM", 
  "03:00 PM", "03:45 PM", "04:30 PM", "05:15 PM"
];

export default function BookingPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState(TIME_SLOTS);
  const [bookingStatus, setBookingStatus] = useState(""); // idle, saving, success, error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Redirect to login if not authenticated
        router.push("/login?redirect=/booking");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    // If a date and barber is selected, we should fetch existing appointments to block out times.
    const fetchAvailableSlots = async () => {
      if (!selectedDate || !selectedBarber) return;
      
      try {
        const appointmentsRef = collection(db, "appointments");
        const q = query(
          appointmentsRef, 
          where("barberId", "==", selectedBarber.id),
          where("date", "==", selectedDate)
        );
        const snapshot = await getDocs(q);
        
        const bookedTimes = [];
        snapshot.forEach(doc => {
          bookedTimes.push(doc.data().timeSlot);
        });

        const freeSlots = TIME_SLOTS.filter(slot => !bookedTimes.includes(slot));
        setAvailableSlots(freeSlots);
      } catch (err) {
        console.error("Error fetching slots:", err);
        // Fallback to all slots on permission denied or error
        setAvailableSlots(TIME_SLOTS);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate, selectedBarber]);

  const handleConfirmBooking = async () => {
    setBookingStatus("saving");
    try {
      const appointment = {
        userId: user.uid || "anonymous",
        userEmail: user.email || "No Email",
        serviceId: selectedService?.id || "",
        serviceName: selectedService?.name || "",
        barberId: selectedBarber?.id || "",
        barberName: selectedBarber?.name || "",
        date: selectedDate || "",
        timeSlot: selectedTime || "",
        status: "Confirmed",
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, "appointments"), appointment);
      setBookingStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Unknown error occurred.");
      setBookingStatus("error");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (bookingStatus === "success") {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-surface-bright px-4">
        <div className="max-w-md w-full bg-white p-8 border border-outline-variant text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-serif mb-2">Booking Confirmed!</h2>
          <p className="text-on-surface-variant mb-6">Your appointment has been successfully scheduled. Please pay at the salon.</p>
          <div className="bg-surface-container-lowest p-4 text-left mb-6 text-sm">
            <p><strong>Service:</strong> {selectedService.name}</p>
            <p><strong>Professional:</strong> {selectedBarber.name}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
          </div>
          <button 
            onClick={() => router.push("/")}
            className="w-full py-3 bg-primary text-on-primary font-button uppercase tracking-widest"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const filteredBarbers = selectedService 
    ? DEFAULT_BARBERS.filter(b => b.specialization === selectedService.category)
    : [];

  return (
    <div className="min-h-[calc(100vh-100px)] w-full flex flex-col items-center bg-surface-bright py-12 px-4">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="font-headline-lg text-headline-lg uppercase tracking-widest">Book Appointment</h1>
          <p className="text-on-surface-variant">Step {step} of 4</p>
        </div>

        {/* Step 1: Service */}
        {step === 1 && (
          <div className="bg-white border border-outline-variant p-6 md:p-10">
            <h2 className="text-xl font-serif mb-6 uppercase tracking-widest text-center border-b pb-4">Select a Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEFAULT_SERVICES.map(svc => (
                <div 
                  key={svc.id} 
                  onClick={() => { setSelectedService(svc); setStep(2); setSelectedBarber(null); }}
                  className="p-4 border border-outline-variant hover:border-primary cursor-pointer transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{svc.name}</h3>
                    <p className="text-sm text-on-surface-variant mb-2">{svc.category}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-sm font-medium">
                    <span>{svc.duration} mins</span>
                    <span>${svc.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Barber */}
        {step === 2 && (
          <div className="bg-white border border-outline-variant p-6 md:p-10">
            <h2 className="text-xl font-serif mb-6 uppercase tracking-widest text-center border-b pb-4">Select Professional</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredBarbers.map(barber => (
                <div 
                  key={barber.id} 
                  onClick={() => { setSelectedBarber(barber); setStep(3); }}
                  className="p-6 border border-outline-variant hover:border-primary cursor-pointer transition-colors text-center"
                >
                  <div className="w-16 h-16 bg-surface-container rounded-full mx-auto mb-4 flex items-center justify-center text-xl text-outline font-serif">
                    {barber.name.charAt(0)}
                  </div>
                  <h3 className="font-bold">{barber.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">{barber.specialization}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-8 text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
              &larr; Back to Services
            </button>
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div className="bg-white border border-outline-variant p-6 md:p-10">
            <h2 className="text-xl font-serif mb-6 uppercase tracking-widest text-center border-b pb-4">Select Date & Time</h2>
            
            <div className="mb-6">
              <label className="block text-sm uppercase tracking-widest mb-2 text-on-surface-variant">Choose Date</label>
              <input 
                type="date" 
                min={formatDate(new Date())}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-outline-variant focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {selectedDate && (
              <div>
                <label className="block text-sm uppercase tracking-widest mb-4 text-on-surface-variant">Available Times</label>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => { setSelectedTime(time); setStep(4); }}
                        className="py-2 px-1 border border-outline-variant text-sm hover:bg-primary hover:text-white transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500 text-sm">No available slots for this date. Please select another date.</p>
                )}
              </div>
            )}

            <button onClick={() => setStep(2)} className="mt-8 text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
              &larr; Back to Professional
            </button>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div className="bg-white border border-outline-variant p-6 md:p-10">
            <h2 className="text-xl font-serif mb-6 uppercase tracking-widest text-center border-b pb-4">Review & Confirm</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-outline-variant/30 pb-4">
                <span className="text-on-surface-variant">Service</span>
                <span className="font-bold">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-4">
                <span className="text-on-surface-variant">Professional</span>
                <span className="font-bold">{selectedBarber?.name}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-4">
                <span className="text-on-surface-variant">Date</span>
                <span className="font-bold">{selectedDate}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-4">
                <span className="text-on-surface-variant">Time</span>
                <span className="font-bold">{selectedTime}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-4">
                <span className="text-on-surface-variant">Total Cost</span>
                <span className="font-bold">${selectedService?.price} (Pay at Salon)</span>
              </div>
            </div>

            {bookingStatus === "error" && (
              <div className="bg-red-50 text-red-700 p-4 mb-4 text-sm border border-red-200">
                <strong>Error saving booking:</strong> {errorMessage}
                <p className="mt-2 text-xs">If this is a permissions error, please ensure your Firebase Firestore Security Rules allow authenticated writes to the &quot;appointments&quot; collection.</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setStep(3)} 
                className="w-full py-4 border border-outline-variant uppercase tracking-widest hover:bg-surface-container transition-colors"
                disabled={bookingStatus === "saving"}
              >
                Back
              </button>
              <button 
                onClick={handleConfirmBooking}
                disabled={bookingStatus === "saving"}
                className="w-full py-4 bg-primary text-on-primary uppercase tracking-widest hover:opacity-90 transition-opacity flex justify-center items-center"
              >
                {bookingStatus === "saving" ? "Confirming..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
