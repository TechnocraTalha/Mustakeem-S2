import { getSiteConfig } from "@/lib/firestore";

export const revalidate = 60; // ISR every 60 seconds

export default async function Services() {
  const config = await getSiteConfig("services");
  const services = config?.items || [
    { title: "Signature Haircut", price: "$85", description: "Includes a personalized consultation, precision cut, hot towel neck shave, and bespoke styling finish." },
    { title: "Restyle & Consultation", price: "$110", description: "An extended session for a complete change of look, tailored to your face shape and lifestyle." },
    { title: "Classic Buzz Cut", price: "$45", description: "A uniform, precise clipper cut finished with a tapered neckline and soothing scalp massage." },
    { title: "Traditional Hot Towel Shave", price: "$60", description: "A multi-step ritual using hot towels, pre-shave oils, and a straight razor for an immaculately close shave." }
  ];

  return (
    <>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-6">Our Services</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          A curated selection of premium grooming treatments, designed to elevate your personal aesthetic in an environment of quiet luxury.
        </p>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1 relative group">
            <div className="overflow-hidden bg-surface-container-low aspect-[4/5] relative">
              <img alt="Barber styling hair" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms] ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQs6YKUOa2TkcRFh_Rg_Crz0OTIBZaoc0jHd8tj2uDu_jvH9Sjo4ws1dAu_bswWzyPB9N8-hd3nNVKzcV-hcZux3bAAutBvWTgaYBYBlz3eyRFUqAz2MTm8DOg02syYgPJRv4FWgJZCxlFODOp7-VB-wbttEnewGSgkDq2W-Xf5PyHZm8K_Xliic7DoKMG2sXC9Hsnr-buDC8feJ03n5aLmcpDu--UjBmSrdoXMe4vOXy6kWF9jv83T36uKgLDBjuS3mxcJ8RvwUc" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.15em] mb-4 block">Grooming</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-12 border-b border-outline-variant pb-6">Hair Styling & Shaving</h2>
            <div className="space-y-6">
              {services.map((service, i) => (
                <div key={i} className="group relative pl-4 border-l border-transparent hover:border-secondary transition-colors duration-300">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-headline-md text-[24px] text-primary">{service.title}</h3>
                    <div className="flex-grow border-b border-dotted border-outline-variant mx-4 opacity-50"></div>
                    <span className="font-headline-md text-[24px] text-primary">{service.price}</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
