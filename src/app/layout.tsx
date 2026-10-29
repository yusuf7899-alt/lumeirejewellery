import type { Metadata } from "next";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMEIRE JEWELLERY | Haute Joaillerie — Dubai",
  description:
    "Lumeire Jewellery Dubai crafts bespoke high jewellery, sculptural gold bangles, and diamond creations embodying architectural elegance and unmatched craftsmanship.",
  keywords: [
    "Lumeire Jewellery",
    "Dubai High Jewellery",
    "Luxury Gold Bangles Dubai",
    "Haute Joaillerie UAE",
    "Diamond Cuff Bracelets",
    "Custom Luxury Jewellery Dubai",
  ],
  authors: [{ name: "Lumeire Jewellery" }],
  openGraph: {
    title: "LUMEIRE JEWELLERY | Haute Joaillerie — Dubai",
    description: "The pinnacle of architectural gold and diamond craftsmanship in Dubai.",
    url: "https://lumeirejewellery.com",
    siteName: "Lumeire Jewellery",
    locale: "en_AE",
    type: "website",
  },
  icons: {
    icon: "/branding/lumeire_jewellery_logo.svg",
    apple: "/branding/lumeire_jewellery_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-obsidian text-ivory antialiased selection:bg-champagne selection:text-obsidian overflow-x-hidden font-sans">
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
