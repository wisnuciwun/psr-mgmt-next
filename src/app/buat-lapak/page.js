import StoreForm from "@/components/StoreForm";
import React from "react";

export const generateMetadata = async () => {
  return {
    title: "Buat Lapak",
    description: "Buat lapak online PSR mudah dan cepat",
    openGraph: {
      title: "Buat Lapak",
      description: "Buat lapak online PSR mudah dan cepat",
      images: [
        {
          url: "https://i.ibb.co.com/jbkCXCS/gambar-toko-kelontong-dari-depan.webp",
          width: 1200,
          height: 630,
          alt: "Buat Lapak",
        },
      ],
      url: "https://barayaswarga.com/buat-lapak",
      type: "website",
    },
  };
};

function BuatLapak() {
  return <StoreForm />;
}

export default BuatLapak;
