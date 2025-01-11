"use client";

import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCarousel = ({ products }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const goToPrevious = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : products.length - 1
    );
  };

  const goToNext = () => {
    setIndex((prevIndex) =>
      prevIndex < products.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div
      className="product-carousel-container"
      style={{ position: "relative" }}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false} // Disable default controls to use custom ones
        indicators={true} // Optional: Disable the dots
        interval={null}
      >
        {products.map((v) => {
          return <Carousel.Item>{v}</Carousel.Item>;
        })}
      </Carousel>

      {/* Custom Control Buttons */}
      <Button
        onClick={goToPrevious}
        variant="light"
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          opacity: "0.7",
        }}
      >
        &#8592; {/* Left Arrow */}
      </Button>

      <Button
        onClick={goToNext}
        variant="light"
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          opacity: "0.7",
        }}
      >
        &#8594; {/* Right Arrow */}
      </Button>
    </div>
  );
};

export default ProductCarousel;
