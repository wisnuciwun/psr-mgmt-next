"use client";
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Image from "next/image"; // For optimized images in Next.js

const items = [
  {
    image_url: "/assets/1.webp",
    altText: "Slide 1",
    caption: "Slide 1",
  },
  {
    image_url: "/assets/2.webp",
    altText: "Slide 2",
    caption: "Slide 2",
  },
  {
    image_url: "/assets/3.webp",
    altText: "Slide 3",
    caption: "Slide 3",
  },
  {
    image_url: "/assets/4.webp",
    altText: "Slide 4",
    caption: "Slide 4",
  },
  {
    image_url: "/assets/5.webp",
    altText: "Slide 5",
    caption: "Slide 5",
  },
  {
    image_url: "/assets/6.webp",
    altText: "Slide 6",
    caption: "Slide 6",
  },
  {
    image_url: "/assets/7.webp",
    altText: "Slide 7",
    caption: "Slide 7",
  },
  {
    image_url: "/assets/8.webp",
    altText: "Slide 8",
    caption: "Slide 8",
  },
];

const HomeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Carousel
      style={{ marginTop: "-20px" }}
      activeIndex={activeIndex}
      onSelect={handleSelect}
      prevIcon=""
      nextIcon=""
    >
      {items.map((item, index) => (
        <Carousel.Item key={index} interval={2500} className="text-center">
          <div style={{ height: "300px", position: "relative", width: "100%" }}>
            <Image
              src={item.image_url}
              alt={item.altText}
              layout="fill"
              objectFit="cover"
              priority // Improves performance for above-the-fold images
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
