export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[921px] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Hero Background" className="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5hzIdBG-XrN87MPvWH4REZ-x2MtbIp9waML9PAV7BY8I2ZF1Q6aBoPr0VnhwtLbAR-ZWkmUKC70eywM0DRaRhdwIA75uYNSpe1u1vd9ZuhcLT-iuWag6CaRPx_pQzZiRoFRZzfBlExXegT9gAGQUxYApFrOzvNz-P6wgDF1-D6-YDXKVPZwz6ZBz2qIW1-L91zrR8-8b4W9njm69i4Tiem4CW57PDvn9c_KBTZXfJH3ZYGFeUw23sgJ63zIBf7vxDlhChU_yDWw4"/>
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>
        <div className="relative z-20 text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center">
          <h1 className="font-display-lg text-display-lg text-on-primary mb-8 max-w-4xl mx-auto drop-shadow-md">
            L'ÉLÉGANCE - Redefining Unisex Sophistication
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary/80 mb-12 max-w-2xl mx-auto">
            Experience the pinnacle of grooming where tradition meets contemporary refinement.
          </p>
          <a href="/contact#inquiry" className="inline-block font-button text-button uppercase bg-primary text-on-primary px-10 py-4 hover:bg-primary/90 transition-colors duration-300 rounded-none tracking-widest">
            Book Now
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Service 1 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <img alt="The Executive Cut" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXfUJ3Jj0239Nllq3LGQba13YRlwAyI3XYY1bb39i77ZKMasmgJ8ngoabKb0n-oKNiBLzzHCUrSsA7yL13EuT8-Oyy31uAyXhhkZMhtPV2XHF4ZK5Un5zN2eFVFdc44sZiek4yREzKeo6Gvpgo5pCRN7kmDKwPunBlSnkqR74YkWR2fL0UVT2IQKd6pqArEH279wNy9g5ObHa6Tk3FRepHSJ4rS21hYbNAbvxbRRuwuBgqpntK9ddAoCXwsA3XWRr-yNQYG0yEIrQ"/>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="flex justify-between items-start pt-2 border-t border-outline-variant/30 group-hover:border-primary transition-colors duration-300">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-2">The Executive Cut</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Precision styling & scalp massage.</p>
                </div>
                <span className="font-label-caps text-label-caps text-on-surface mt-2">$85</span>
              </div>
            </div>
            {/* Service 2 */}
            <div className="group cursor-pointer pt-0 md:pt-12">
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <img alt="The Royal Shave" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCufmKyCFjVkw0IDj0r4CwCz3o5fpZQnAodusJ17byRSHd2W4reOwgWZZ22c31yYz5bxptuHK0RdriI8Lh5FPHrRDZHs-xBkyYSXSX5yHzZhjJxCwbWow7a7GG08vImRq48qh5mxJuafhGlDF_b_tUaBQKMqoqWu-CxS52-Yr4Zl6aMSX7gl8TQLQRcWnSwpXbVxr6nb9spfLd8j4GptmTBoyJqD_zXJS_9-2sG8r2pgbNlLBFNshBBgNsOiE71r-IWAvp0RA9y_AQ"/>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="flex justify-between items-start pt-2 border-t border-outline-variant/30 group-hover:border-primary transition-colors duration-300">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-2">The Royal Shave</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Hot towel, straight razor, soothing oils.</p>
                </div>
                <span className="font-label-caps text-label-caps text-on-surface mt-2">$65</span>
              </div>
            </div>
            {/* Service 3 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <img alt="Advanced Skin Therapy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBvzOYPvwxBslRCShRjEW2Vrj0X_Lw_4-RBi78Co2C4PD9rfB9dOOBCz8ihrY8tMJ-rVdw4B7-UKRy9kZavBoMIhOLMHSZhEYV8M4bGFimIGHIojn_UVg9o1GQ8fa7YquSaekjkQgYa-wwRS2puUDupRuMu6jp4kRAhZIr6zhBxDrv2L5zSuG0TEUyEe76nXzhu2EBLyF-h1cy_eohANogEfyNwq218385lOXN-Gp4tM1yh-GZ0D7mqI34HK7Koxmybm51pOfQq_g"/>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="flex justify-between items-start pt-2 border-t border-outline-variant/30 group-hover:border-primary transition-colors duration-300">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-2">Advanced Skin Therapy</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Deep cleanse & rejuvenating facial.</p>
                </div>
                <span className="font-label-caps text-label-caps text-on-surface mt-2">$120</span>
              </div>
            </div>
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
                Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
