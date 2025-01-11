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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="app">
      <head>
        <link
          rel="stylesheet"
          href="./fontawesome/css/font-awesome.min.css"
          precedence="default"
        />
        <title>Baraya Swarga</title>
        <meta
          property="og:image"
          content="https://i.ibb.co/NpT4PDR/Baraya-Swarga-logo-MQ.jpg"
        />
        <meta
          name="description"
          content="Selamat datang di Prima Swarga Residence. Guyub kana kasaean !"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} screen`}>
        <HomeNavbar />
        {children}
        <HomeFooter />
      </body>
    </html>
  );
}
