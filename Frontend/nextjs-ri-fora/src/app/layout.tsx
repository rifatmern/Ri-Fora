import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

import Navbar from "../../components/Navbar";
import BackTop from "../../components/BackTop";
import Footer from "../../components/Footer";


const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "RiFora",
  description: "Premium fashion store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">


          <Navbar />

          {children}

          <BackTop />
          <Footer />


      </body>
    </html>
  );
};