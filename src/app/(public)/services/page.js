import { getSiteConfig } from "@/lib/firestore";

export const dynamic = 'force-dynamic';

export default async function Services() {
  const config = await getSiteConfig("services");
  const services = config?.items || [
    { title: "Signature Haircut (Men)", price: "₹500", description: "Includes consultation, precision cut, hot towel finish, and styling." },
    { title: "Women's Haircut & Styling", price: "₹800", description: "Expert cut, blow-dry, and styling tailored to face shape and hair texture." },
    { title: "Hair Coloring (Unisex)", price: "From ₹2,500", description: "Ammonia-free luxury color, highlights, balayage, or global color." },
    { title: "Keratin Treatment", price: "From ₹3,500", description: "Premium smoothing treatment for frizz-free, silky hair lasting months." },
    { title: "Beard Trim & Shape", price: "₹300", description: "Precision beard styling with hot towel and oils." },
    { title: "Classic Hot Towel Shave", price: "₹400", description: "Traditional straight razor shave with pre-shave oils and soothing balm." },
    { title: "Luxury Facial (Unisex)", price: "₹800", description: "Deep cleanse, exfoliation, and hydrating mask for radiant skin." },
    { title: "Gold Facial", price: "₹1,500", description: "Premium gold-infused facial for instant glow and anti-aging benefits." },
    { title: "Bridal Makeup", price: "From ₹8,000", description: "HD/Airbrush bridal makeup with trial session and premium cosmetics." },
    { title: "Party Makeup", price: "From ₹3,000", description: "Glamorous event-ready makeup with long-lasting, camera-ready finish." },
    { title: "Threading & Waxing", price: "From ₹100", description: "Eyebrow threading, full face threading, arms, legs, and full body waxing." },
    { title: "Manicure & Pedicure", price: "From ₹500", description: "Classic, spa, or gel nail services with premium products." },
    { title: "Hair Spa & Treatment", price: "₹1,200", description: "Deep conditioning, dandruff treatment, or hair fall control therapy." },
    { title: "Head Massage", price: "₹300", description: "Relaxing head and scalp massage with herbal oils." },
  ];

  // Split into categories for display
  const hairServices = services.filter(s =>
    s.title.toLowerCase().includes("hair") || s.title.toLowerCase().includes("keratin")
  );
  const groomingServices = services.filter(s =>
    s.title.toLowerCase().includes("beard") || s.title.toLowerCase().includes("shave") || s.title.toLowerCase().includes("massage")
  );
  const beautyServices = services.filter(s =>
    s.title.toLowerCase().includes("facial") || s.title.toLowerCase().includes("makeup") ||
    s.title.toLowerCase().includes("threading") || s.title.toLowerCase().includes("waxing") ||
    s.title.toLowerCase().includes("manicure") || s.title.toLowerCase().includes("pedicure")
  );

  const ServiceCategory = ({ title, subtitle, items, accentColor }) => (
    <div className="mb-16">
      <div className="mb-8 border-b border-outline-variant pb-4">
        <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.15em] mb-2 block">{subtitle}</span>
        <h2 className="font-headline-lg text-headline-lg text-primary">{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map((service, i) => (
          <div key={i} className="group relative pl-4 border-l-2 border-transparent hover:border-secondary transition-colors duration-300 py-3">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-headline-md text-[20px] md:text-[24px] text-primary">{service.title}</h3>
              <div className="flex-grow border-b border-dotted border-outline-variant mx-4 opacity-50"></div>
              <span className="font-headline-md text-[20px] md:text-[24px] text-primary whitespace-nowrap">{service.price}</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-6">Our Services</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          A curated selection of premium grooming and beauty treatments for men & women, designed to elevate your personal aesthetic in an environment of quiet luxury.
        </p>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
        {/* Quick category links */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <a href="#hair" className="font-label-caps text-label-caps px-5 py-2 border border-primary text-primary uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors duration-300">Hair</a>
          <a href="#grooming" className="font-label-caps text-label-caps px-5 py-2 border border-primary text-primary uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors duration-300">Grooming</a>
          <a href="#beauty" className="font-label-caps text-label-caps px-5 py-2 border border-primary text-primary uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors duration-300">Beauty & Skincare</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: Image */}
          <div className="md:col-span-4 order-2 md:order-1">
            <div className="sticky top-32">
              <div className="overflow-hidden bg-surface-container-low aspect-[3/4] relative group mb-6">
                <img alt="Salon services" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms] ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQs6YKUOa2TkcRFh_Rg_Crz0OTIBZaoc0jHd8tj2uDu_jvH9Sjo4ws1dAu_bswWzyPB9N8-hd3nNVKzcV-hcZux3bAAutBvWTgaYBYBlz3eyRFUqAz2MTm8DOg02syYgPJRv4FWgJZCxlFODOp7-VB-wbttEnewGSgkDq2W-Xf5PyHZm8K_Xliic7DoKMG2sXC9Hsnr-buDC8feJ03n5aLmcpDu--UjBmSrdoXMe4vOXy6kWF9jv83T36uKgLDBjuS3mxcJ8RvwUc" />
              </div>
              <div className="glass-panel p-6 text-center">
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">Can't find what you're looking for?</p>
                <a href="/contact#inquiry" className="inline-block font-button text-button uppercase text-primary border border-primary px-6 py-3 hover:bg-primary hover:text-on-primary transition-colors duration-300">Contact Us</a>
              </div>
            </div>
          </div>

          {/* Right: Service Lists */}
          <div className="md:col-span-8 order-1 md:order-2">
            <div id="hair">
              <ServiceCategory title="Hair Styling & Care" subtitle="For Men & Women" items={hairServices.length > 0 ? hairServices : services.slice(0, 4)} />
            </div>
            <div id="grooming">
              <ServiceCategory title="Grooming & Relaxation" subtitle="Men's Speciality" items={groomingServices.length > 0 ? groomingServices : services.slice(4, 6)} />
            </div>
            <div id="beauty">
              <ServiceCategory title="Beauty & Skincare" subtitle="Unisex & Women's" items={beautyServices.length > 0 ? beautyServices : services.slice(6)} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
