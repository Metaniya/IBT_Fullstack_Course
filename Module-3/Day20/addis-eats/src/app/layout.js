import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import Script from "next/script";
import { SITE_URL, SITE_NAME } from "@/lib/site";
// Downloaded once at build time, then served from our own origin.
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats — food delivery in Addis Ababa",
  },
  description:
    "Order Doro Wat, Tibs and Kitfo from kitchens in Bole and Kazanchis. Delivery across Addis Ababa.",
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_ET" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Script src="/analytics-demo.js" strategy="lazyOnload" />
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}