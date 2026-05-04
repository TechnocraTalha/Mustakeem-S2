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

  const ServiceCategory = ({ title, subtitle, items, imageSrc, isReversed }) => (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-start mb-32`}>
      <div className="w-full md:w-1/2 sticky top-32">
        <div className="relative overflow-hidden aspect-[4/3] shadow-2xl border border-white/10 group">
          <img alt={title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src={imageSrc} />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="mb-12 border-b border-white/10 pb-6">
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.15em] mb-3 block">{subtitle}</span>
          <h2 className="font-headline-lg text-headline-lg text-white">{title}</h2>
        </div>
        <div className="space-y-8">
          {items.map((service, i) => (
            <div key={i} className="group relative border-l-2 border-transparent hover:border-secondary transition-colors duration-300 pl-6 py-2">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-headline-md text-[20px] md:text-[24px] text-white">{service.title}</h3>
                <div className="flex-grow border-b border-dotted border-white/20 mx-4 opacity-50"></div>
                <span className="font-headline-md text-[20px] md:text-[24px] text-secondary whitespace-nowrap">{service.price}</span>
              </div>
              <p className="font-body-md text-body-md text-white/60">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap text-center">
        <h1 className="font-display-lg text-display-lg text-white mb-6">Our Services</h1>
        <p className="font-body-lg text-body-lg text-white/60 max-w-2xl mx-auto">
          A curated selection of premium grooming and beauty treatments for men & women, designed to elevate your personal aesthetic in an environment of quiet luxury.
        </p>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
        <div id="hair">
          <ServiceCategory 
            title="Hair Styling & Care" 
            subtitle="For Men & Women" 
            items={hairServices.length > 0 ? hairServices : services.slice(0, 4)} 
            imageSrc="/images/haircut.png"
            isReversed={false}
          />
        </div>
        <div id="grooming">
          <ServiceCategory 
            title="Grooming & Relaxation" 
            subtitle="Men's Speciality" 
            items={groomingServices.length > 0 ? groomingServices : services.slice(4, 6)} 
            imageSrc="/images/shave.png"
            isReversed={true}
          />
        </div>
        <div id="beauty">
          <ServiceCategory 
            title="Beauty & Skincare" 
            subtitle="Unisex & Women's" 
            items={beautyServices.length > 0 ? beautyServices : services.slice(6)} 
            imageSrc="/images/beauty.png"
            isReversed={false}
          />
        </div>
      </section>
    </>
  );
}
