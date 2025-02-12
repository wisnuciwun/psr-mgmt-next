import StoreDetail from "@/components/StoreDetail";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const response = await fetch(
      `https://wisnuadiwardhana.my.id/psr/store/${slug}`
    );
    if (!response.ok) throw new Error("Failed to fetch store data");

    const { data: store } = await response.json();

    // Ensure first image is selected and formatted correctly
    const imgPath = store.product_images_url
      .split(",")[0]
      .replace("public/images/", "");
    const img = `https://wisnuadiwardhana.my.id/psr/img/${imgPath}`;
    const description =
      store.description.length > 100
        ? store.description.substring(0, 97) + "..."
        : store.description;

    console.info("Generated OG Image:", img);

    return {
      title: store.store_name,
      description,
      openGraph: {
        title: store.store_name,
        description: store.description,
        url: `https://barayaswarga.com/lapak/${store.slug}`,
        type: "website",
        images: [
          {
            url: img,
            secureUrl: img, // Ensures HTTPS compatibility
            width: 1200,
            height: 630,
            alt: store.store_name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: store.store_name,
        description: store.description,
        images: [img],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { notFound: true };
  }
}

function Lapak() {
  return <StoreDetail />;
}

export default Lapak;
