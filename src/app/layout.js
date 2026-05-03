import "./globals.css";

export const metadata = {
  title: "Mustakeem Handsome Salon - Premium Unisex Grooming",
  description: "Experience the pinnacle of grooming where tradition meets contemporary refinement for men and women.",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className="bg-background text-on-background antialiased selection:bg-secondary-container selection:text-on-secondary-container min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
