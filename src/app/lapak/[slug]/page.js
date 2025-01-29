import StoreDetail from "@/components/StoreDetail";
import request from "@/utils/request";
import axios from "axios";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const response = await axios.get(
      `https://wisnuadiwardhana.my.id/psr/store/${slug}`
    );
    const store = response.data.data;
    console.log("masuk", slug, response.data.data.store_name);

    return {
      title: store.store_name,
      description: store.description,
      openGraph: {
        title: store.store_name,
        description: store.description,
        images: [
          {
            url: `https://wisnuadiwardhana.my.id/psr/img/${store.product_images_url
              .split(",")[0]
              .replace("public/images/", "")}`,
            width: 1200,
            height: 630,
            alt: "Lapak PSR",
          },
        ],
        url: `https://barayaswarga.com/lapak/${store.slug}`,
        type: "website",
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      notFound: true,
    };
  }
}

function Lapak() {
  return <StoreDetail />;
}

export default Lapak;
