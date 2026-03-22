import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "./components/GoogleAnalytics";
import SiteWrapper from "./components/SiteWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CoachAir - Aviation Intelligence",
  description: "Aviation Intelligence Infrastructure as a Service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <SiteWrapper>{children}</SiteWrapper>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
