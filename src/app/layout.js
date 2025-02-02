import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNavbar from "@/components/HomeNavbar";
import HomeFooter from "@/components/HomeFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Baraya Swarga",
  description: "Selamat datang di Prima Swarga Residence. Guyub kana kasaean!",
  openGraph: {
    title: "Baraya Swarga",
    description:
      "Selamat datang di Prima Swarga Residence. Guyub kana kasaean!",
    images: [
      {
        url: "https://i.ibb.co.com/Brjm0Sm/Baraya-Swarga-logo-MQ-2.jpg",
        width: 1200,
        height: 630,
        alt: "Baraya Swarga Logo",
      },
    ],
    url: "https://barayaswarga.com",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="app">
      <head>
        <link
          rel="stylesheet"
          href="/fontawesome/css/font-awesome.min.css"
          precedence="default"
        />
        <link rel="icon" href="https://barayaswarga.com/assets/favicon.ico" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} screen`}>
        <HomeNavbar />
        {children}
        <HomeFooter />
      </body>
    </html>
  );
}
