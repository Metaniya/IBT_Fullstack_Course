import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import Script from "next/script";
// Downloaded once at build time, then served from our own origin.
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian food, delivered.",
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