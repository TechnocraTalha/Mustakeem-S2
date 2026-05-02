export const fallbackData = {
  general: {
    phone: "+91 9876543210",
    whatsapp: "+91 9876543210",
    email: "hello@mustakeemsalon.com",
    address: {
      street: "123 Luxury Lane",
      city: "New Delhi",
      state: "DL",
      zip: "110001",
      country: "India",
    },
    socials: {
      instagram: "https://instagram.com/mustakeemsalon",
      facebook: "https://facebook.com/mustakeemsalon",
    },
  },
  home: {
    hero: {
      title: "Mustakeem Handsome Salon",
      subtitle: "The Epitome of Quiet Luxury",
      imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=2000",
    },
    featuredServices: [
      {
        id: "1",
        name: "Signature Haircut",
        description: "Bespoke styling tailored to your profile.",
      },
      {
        id: "2",
        name: "Royal Beard Grooming",
        description: "Precision trimming and hot towel shave.",
      },
      {
        id: "3",
        name: "Revitalizing Facial",
        description: "Deep cleansing and skin rejuvenation.",
      },
    ],
  },
  services: {
    heroText: "Our Services",
    categories: [
      {
        id: "cat1",
        title: "Hair Care",
        imageUrl: "https://images.unsplash.com/photo-1622288432450-277d0fce5b15?auto=format&fit=crop&q=80&w=800",
        treatments: [
          { name: "Executive Haircut", price: "₹1,200", details: "Includes wash and styling" },
          { name: "Hair Coloring", price: "From ₹2,500", details: "Ammonia-free luxury color" },
        ],
      },
      {
        id: "cat2",
        title: "Beard Grooming",
        imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
        treatments: [
          { name: "Beard Trim & Shape", price: "₹600", details: "Precision styling" },
          { name: "Classic Hot Towel Shave", price: "₹800", details: "Traditional straight razor" },
        ],
      },
    ],
  },
  bridal: {
    heroText: "Groom's Bespoke Experience",
    consultation: {
      text: "Book a personalized consultation for your special day.",
      imageUrl: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&q=80&w=1200",
    },
    packages: [
      {
        id: "pkg1",
        name: "The Essential Groom",
        price: "₹15,000",
        features: [
          "Pre-wedding consultation",
          "Signature haircut & styling",
          "Premium facial treatment",
          "Beard grooming",
        ],
      },
      {
        id: "pkg2",
        name: "The Royal Groom",
        price: "₹25,000",
        features: [
          "Everything in Essential",
          "Body spa & massage",
          "Manicure & Pedicure",
          "Touch-up on the wedding day",
        ],
      },
    ],
  },
  portfolio: {
    categories: ["All", "Hair", "Beard", "Bridal"],
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&q=80&w=800",
        category: "Bridal",
        title: "Classic Groom Look",
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1622288432450-277d0fce5b15?auto=format&fit=crop&q=80&w=800",
        category: "Hair",
        title: "Modern Fade",
      },
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
        category: "Beard",
        title: "Precision Trim",
      },
    ],
  },
  contact: {
    heroText: "Get in Touch",
    mapPlaceholderUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200",
  },
};
