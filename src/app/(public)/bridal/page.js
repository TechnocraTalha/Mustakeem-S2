import { getSiteConfig } from "@/lib/firestore";

export const revalidate = 60; // ISR every 60 seconds

export default async function Bridal() {
  const config = await getSiteConfig("bridal");
  const packages = config?.items || [
    {
      title: "The Wedding Essential",
      duration: "2.5 Hours",
      price: "$350",
      description: "Precision Haircut & Styling\nTraditional Hot Towel Wet Shave\nExpress Facial Treatment\nManicure & Hand Detailing",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARUmLfyeisjEyXHfvF8KZ4If_zJRAZ-B6INeN_qrOwgAAJQDB-LcHuuJ83I5qEnLcSEXEj2ggvJpoVEqquKN6MsITRlzRM3kXXuBcNOJ-sbUqM52k8y_qEQcJosnjDDEZSm5cSgWr1WV83wofjbykY-Cwd5oRfYmG6qo1HxMQASMo6SfgPPjP3_koJYpjwDl5XGW6WSUa8VZJeUlvyNUt4y17lZSORJdPCGyimlrxHNLqQ1LU_-UB-Zw6PZOifXegIDq-Eb02-Z28"
    },
    {
      title: "The Maharaja Package",
      duration: "Half Day",
      price: "$750",
      description: "Bespoke Hair Design & Trial\nSignature Royal Shave Ritual\nRejuvenating Deep Tissue Massage\nComplete Hand & Foot Grooming\nPremium Skincare Regimen",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfnRNwGbmxeinKrGjDqHrQbuEGPzt6yqo3UTSVesD7gQyn4nkofRl2Mal7AxQzELkphidEkeDm9iTsG60w1_PF3P4S-ez1Ul5DfjsjSm6mq_eLjIt_LSEA63YO5ajmYZmPh3Hb7PT_yV_E0WMWngoIGo0uvzl88bi6TelrQszbtk8js91o_v0S0IqxuIV1j7KEWpbx3v7d3nmZWmQuHsRHaJ3vv0dGwNwz4IyYVnTAnrl06i8FpuuZcTuEFEMckj_IzSGpkziCnE0"
    }
  ];

  return (
    <>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-5 flex flex-col items-start gap-8 z-10">
          <span className="font-label-caps text-label-caps text-outline uppercase tracking-[0.2em]">Royal Wedding Styling</span>
          <h1 className="font-display-lg text-display-lg text-on-background">The Royal<br />Treatment.</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Prepare for your most important day with our meticulous styling services designed for the modern individual. A sanctuary of calm before the celebration.
          </p>
          <div className="pt-4">
            <a className="inline-flex items-center gap-3 font-button text-button uppercase bg-primary text-on-primary px-8 py-4 hover:bg-surface-tint transition-colors duration-500" href="#packages">
              View Packages
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-7 relative w-full aspect-[4/5] md:aspect-[16/10] overflow-hidden">
          <img alt="A client receiving premium styling in a high-end, minimalist salon." className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-[2000ms] hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoEybW8jLOXBCmtVkbgA1kv-lOjYDyMwHV9_VG3u5kThWLXC-9-ythXrst7hAnFkN-hZw8BKXJC3rmDIvCk2vrLHOensJw1UbfPGfo-mXPDAfLQzlbMivxWuhYy8YdQghFSeF0j_zy0TeaYvn8DAM3ieZxImjLGS8QG87j2WnVtFRteN_IfHq-5uoK5iQX_JpjzC_fYYEziTUHrlKPJlv2WA_mkv4vuKCLNB05iRAmTts5Dz_OTYZTBdkEXUOJic-rrxyMsjrlM18" />
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap" id="packages">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-outline-variant pb-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Curated Experiences</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">Tailored grooming rituals designed to ensure impeccable presentation and profound relaxation prior to your ceremony.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {packages.map((pkg, i) => (
            <div key={i} className={`group flex flex-col ${i % 2 !== 0 ? 'md:mt-16' : ''}`}>
              <div className="w-full aspect-square overflow-hidden mb-12 bg-surface-container">
                <img alt={pkg.title} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-[1.02]" src={pkg.image} />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-headline-md text-headline-md text-on-background">{pkg.title}</h3>
                  <span className="font-label-caps text-label-caps text-secondary border border-secondary px-3 py-1 uppercase">{pkg.duration}</span>
                </div>
                <ul className="flex flex-col mb-12 flex-grow">
                  {pkg.description.split('\n').map((line, j) => (
                    <li key={j} className="flex justify-between items-center py-4 border-b border-outline-variant group-hover:border-l-2 group-hover:border-secondary transition-all pl-2 group-hover:pl-4">
                      <span className="font-body-md text-body-md text-on-surface-variant">{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-8">
                  <span className="font-body-lg text-body-lg text-on-background">{pkg.price}</span>
                  <a href="/contact#inquiry" className="font-button text-button uppercase border border-primary text-primary px-8 py-4 hover:bg-primary hover:text-on-primary transition-colors duration-500">
                    Enquire Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-6 relative h-[600px] w-full">
            <div className="absolute inset-0 bg-surface-container-high w-[80%] h-[90%] left-0 top-0"></div>
            <img alt="Groom consultation area" className="absolute right-0 bottom-0 w-[85%] h-[90%] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.05)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByhMyDCzXZJjInMvtAVEUAAHpHvNNmDB48rBPb3zm9-NCdbmGLsWcOCHuhzy5oTAdSLm9nGVginwAMKa_iFt2RU5n_UCxyPuzNasG_UbhKCJGUZH7EIO1H6EK6DWn0aCfw0079lKxlIOEMGTre7bT5Wf1fa76_w-3wQmXLJ_7Y706Pkfr3wqOzctKveE107nV2aKYS38HOT5hPPfoIduKT0WOLUadEB98SlzFpzVm2AFK5clzHMW1Pz3l0hfP3QF0eSr6uExwAfac" />
          </div>
          <div className="md:col-span-5 md:col-start-8 flex flex-col items-start pt-12 md:pt-0">
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-[0.2em] mb-4">The Process</span>
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-8">Bespoke Private Consultation.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Every individual's aesthetic is distinct. Our process begins with an uninterrupted, private consultation where our master stylists assess your style, skin type, and specific requirements for the wedding day.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12 leading-relaxed">
              We believe true luxury lies in the details. From selecting the perfect scent profile for your hot towel to establishing a pre-wedding skincare timeline, nothing is left to chance.
            </p>
            <a className="inline-flex items-center gap-2 font-button text-button uppercase text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors duration-300" href="/contact#inquiry">
              Schedule a Consultation
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
