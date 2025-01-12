import StoreDetail from "@/components/StoreDetail";
import request from "@/utils/request";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const response = await request.get(`/store/${slug}`);
    const store = response.data.data;

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
            alt: "Jajanan PSR",
          },
        ],
        url: `https://barayaswarga.com/lapak/${store.slug}`,
        type: "website",
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

function Lapak() {
  return <StoreDetail />;
}

export default Lapak;
