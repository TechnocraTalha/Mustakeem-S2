import { getSiteConfig } from "@/lib/firestore";
import { ArrowForwardIcon } from "@/components/Icons";

export const dynamic = 'force-dynamic';



export default async function Home() {
  const homeData = await getSiteConfig("home");
  const hero = homeData?.hero || {};
  const featuredServices = homeData?.featuredServices || [];

  const heroTitle = hero.title || "Mustakeem Handsome Salon — Redefining Unisex Sophistication";
  const heroSubtitle = hero.subtitle || "Experience the pinnacle of grooming where tradition meets contemporary refinement.";
  const heroImage = "/images/hero.png"; // Enforce local high-def image

  // Enforce local images to fix loading issues
  const services = [
    { name: "Premium Haircut", description: "Bespoke styling tailored to your profile.", price: "₹500", imageUrl: "/images/haircut.png" },
    { name: "Signature Shave", description: "Precision trimming and hot towel shave.", price: "₹300", imageUrl: "/images/shave.png" },
    { name: "Grooming Package", description: "Haircut, shave, facial, styling.", price: "₹800", imageUrl: "/images/haircut.png" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[921px] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Hero Background" className="w-full h-full object-cover object-center" src={heroImage}/>
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>
        <div className="relative z-20 text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center">
          <h1 className="font-display-lg text-display-lg text-on-primary mb-8 max-w-4xl mx-auto drop-shadow-md">
            {heroTitle}
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary/80 mb-12 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
          <a href="/booking" className="inline-block font-button text-button uppercase bg-secondary text-background px-10 py-4 hover:bg-secondary-fixed transition-colors duration-300 rounded-none tracking-widest font-bold">
            Reserve Your Service
          </a>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-6 block">Our Philosophy</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">
            Quiet Luxury & Uncompromising Craftsmanship
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            We believe true elegance is understated. Our sanctuary is designed for the modern individual who values meticulous attention to detail, premium bespoke products, and an environment of absolute tranquility. Every service is an exercise in perfection.
          </p>
        </div>
      </section>

      {/* Signature Collection Gallery */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-bright">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-4 block">The Collection</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Signature Services</h2>
            </div>
          </div>
          <div className="flex flex-col gap-24">
            {services.map((service, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2">
                  <div className="relative overflow-hidden aspect-[4/3] shadow-2xl border border-white/10 group">
                    <img alt={service.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src={service.imageUrl} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="font-label-caps text-label-caps text-secondary mb-4">{service.price}</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-3xl mb-6">{service.name}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">{service.description}</p>
                  <a href="/services" className="inline-block font-button text-button uppercase border border-secondary text-secondary px-8 py-3 hover:bg-secondary hover:text-background transition-colors duration-300 tracking-widest w-max">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links (Bento-style Navigation) */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* View All Services Block */}
          <a className="group relative overflow-hidden h-[400px] flex items-center justify-center bg-surface-container hover:bg-surface-container-high transition-colors duration-500" href="/services">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 mix-blend-multiply">
              <img alt="Texture Background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-SHXDHHbKGSCfuh6hbcqXiXWFW6IGtKs2QKxt0SscmOkMV-QT9sRmtFHTz3SvFLCTsNWAPYWcz7CllznGD8COE4xGQVHGWVYqPXhIQqwvW84mGH5ODYfQd288qo_pCR8Y91XhqSBwl1pxOSqcuU7TOqW9tcEQ5AEi9yl0eorZAKPM571L3iGJsH-HruojpjOR0jAU1Zb2cVdXxnV_exh01ro4so-Bp9a8HVOsr8diWVA4WtrOIrUzujVkKJ7UjZ8kg0Bqa9wuqsY"/>
            </div>
            <div className="relative z-10 text-center flex flex-col items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">View All Services</h3>
              <span className="font-button text-button text-on-surface flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                Explore <ArrowForwardIcon className="w-4 h-4" />
              </span>
            </div>
          </a>
          {/* Explore Bridal Block */}
          <a className="group relative overflow-hidden h-[400px] flex items-center justify-center bg-surface-container-lowest border border-outline-variant/50 hover:border-outline transition-colors duration-500" href="/bridal">
            <div className="relative z-10 text-center flex flex-col items-center">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-4">Bridal & Groom</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Explore Bridal</h3>
              <span className="font-button text-button text-on-surface flex items-center gap-2 group-hover:gap-4 transition-all duration-300 border-b border-transparent group-hover:border-primary pb-1">
                Discover Packages
              </span>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
