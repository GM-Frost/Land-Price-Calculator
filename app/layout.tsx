import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Land Price Calculator",
  description:
    "Responsive single-page land price calculator for Nepali and international land units.",
  icons: {
    icon: "/logo/Logo.svg",
    shortcut: "/logo/Logo.svg",
    apple: "/logo/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2200,
            style: {
              borderRadius: "14px",
              border: "1px solid #d1fae5",
              background: "#ffffff",
              color: "#0f172a",
            },
          }}
        />
      </body>
    </html>
  );
}
