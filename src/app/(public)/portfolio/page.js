import { getSiteConfig } from "@/lib/firestore";

export const dynamic = 'force-dynamic'; // ISR every 60 seconds

export default async function Portfolio() {
  const config = await getSiteConfig("portfolio");
  const portfolio = config?.items || [
    { title: "Classic Pompadour", category: "Hair Styling", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6PGbB-XlNa8_U3MNQoKpNh4WqcM9MsK6htU8O1p4KgNgd6RyyCH3lYLSiJjbioJ2MTf1FMgr08oNq5J386aYcd16DT9zLz29h6HnmWupTrIM4Dis5XMnhN5ec2YV-8o9XqfjqKM9bIyeIpoMhnUrB7xF-FIF9di0sJ44X-2J1q83HePALFY7DiyMSztVsjtsw6iqUNPx2jlhJYQR6cTt7KAMGg7UHcNozciV9mP9Nnk9N-GSW4j36YRTFaje0aT9Cd08GyKTldbM" },
    { title: "Precision Line-up", category: "Beard Grooming", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkq-N2RNIcsOnUAl369o8IlzoIlGaxpTIjGvwtraFmgMrukehzZ5UncLuDrPWgPetldFGS00Fb_cYh0-cxNqYRZeTpxkbyCcAlW32i3yidn8BCOMB5nLf-eNiMLnojCEYNUwytwepQCZaSqMfcOFOKD6Z4eJ539SyB4VgRON9ykwvlvBXQA9hPwoe7BBcxlHchbXI4Zm84WHlmFD3CaLXshExaH1Q8XSWnsSFzMkdh13LC8kBqpnH4ACjcKZYJoNo5iqCLklUG5nM" },
    { title: "Revitalizing Treatment", category: "Facial Care", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlly-vsEAeRXvF2sg1OqdE2ETZJ2aYFn9Ed1560AFuX7hybyILsQDhHcj__TLKpLXkrRUmtyLLTvPe_HLmIlra9Y5t_TmKe4rcdomEX2pHar7f58VS3BpRwe8Ll6UjNS1FmYi9yggMVzrgs-Z0SuOAbnhD2J0zB_G2jGr5mIntlU6IYBeer44YegsACAaDoBCrn8JEFObW-Tvg8ZeMCDV6YaXe_kikI6hpns3A0-jPgZh270Mcor7CXXQFF7jisnfIt1U5To6Hlgc" },
    { title: "Textured French Crop", category: "Hair Styling", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0sWBMPlF7fXU6igvxhO9zX2AY7T5YQ7JNsCgVE0BMn8Clv4Owi6BSl9uL5sM8P0antXNP399SZHf5vVT2KurcoYbCJmGPSqywXS0qTo7NT7RRYifvaAsZdtIsMZBBAHpIYN_oWCz-zfH4yKVAUAmRTIMTrJaf6TIamzyXmrYxUt11cb9yE0lgCbxDCOsvpYm_2nl1hIOrP7AvOPMDO9EZhKjL4f7R7WU2pNETMxgIwlC9FoifKhqL7ROuo0f-zpmDZqxpfXrtylE" },
    { title: "Traditional Wet Shave", category: "Beard Grooming", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVKmrK-_-IBt1qc2uCGf2juORBNO178tOb93mUYVq6UGbSPZS-kD3wlVcKEOczW7pOhLoIGYGYMVJ49DoFfk8JYa6997CBx6jWqx3c_KTJUe9FStZSErc6_TYDoBpwipbEaNUR4TPt70NtoJtZk4z9MdMlD1t07X2yXSNgo2aXrdZNNyCBQi7U-I8kekKyFvaYQ3g2EM5wVt4jEHB4IY7VvwZpO61ZB4bqaeEpk8HELp1nCGoTXoAV20Rgxj2mtku4SsYAbgH8o7Y" },
    { title: "Editorial Sweep", category: "Hair Styling", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGoiNvwbcPRAeN2yH7GU2hHqX44ZZmYsfTWEd9SKTwr00fZQ8tiiSv1skrbYTFGenbdD6SVvOl-qFssBBuMelIJ2EV9TdzWtzQIYLBxhuGLuT8sah8OTIGw6KHiEFl9t2fRfAvhThBglVF_TMXqZMA9jcJarC-BsRFDgw4PAWgn-FsgDHjpC-9XCqBGZI3QTfseMCs_Yoz6xEx3hlQa1K3EqOULLulN7SdaJu0RC_awesuksV_0ZvIvXnp267VFjTClSlkpOJqti0" }
  ];

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-32">
      <div className="mb-20 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg text-primary mb-6">Our Craft</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            A curated collection of our finest work, showcasing the intersection of precision technique and artistic vision. Each look is tailored to the individual, resulting in understated, timeless elegance.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center md:justify-end">
          <button className="font-label-caps text-label-caps px-6 py-2 border border-primary text-primary bg-surface-bright uppercase tracking-widest hover:bg-surface-dim transition-colors duration-300">
            All
          </button>
        </div>
      </div>

      <div className="masonry-grid">
        {portfolio.map((item, i) => (
          <div key={i} className="masonry-item relative group overflow-hidden cursor-pointer">
            <img alt={item.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" src={item.image} />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-500 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest mb-2">{item.category}</span>
              <h3 className="font-headline-md text-headline-md text-on-primary">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
