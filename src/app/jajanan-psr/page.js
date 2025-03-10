import StoreList from "@/components/StoreList";
import React from "react";

export const generateMetadata = async () => {
  return {
    title: "Lapak PSR",
    description:
      "Semua insyaAllah ada! Mulai dari sandang, pangan dan papan semua ada. Mau jajan apa hari ini?",
    openGraph: {
      title: "Lapak PSR",
      description:
        "Semua insyaAllah ada! Mulai dari sandang, pangan dan papan semua ada. Mau jajan apa hari ini?",
      images: [
        {
          url: "https://i.ibb.co.com/HhM3kcf/071894800-1608786362-Whats-App-Image-2020-12-24-at-07-58-53.webp",
          width: 1200,
          height: 630,
          alt: "Lapak PSR",
        },
      ],
      url: "https://barayaswarga.com/jajanan-psr",
      type: "website",
    },
  };
};

function JajananPSR() {
  return <StoreList />;
}

export default JajananPSR;
