"use client";

import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "next/navigation";
import request from "@/utils/request";
import ProductCarousel from "./ProductCarousel";

const StoreDetail = () => {
  const { slug } = useParams(); // Get the store ID from the URL
  const [store, setStore] = useState(null); // Store data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeIndex, setactiveIndex] = useState(0);

  useEffect(() => {
    // Fetch store details from the API
    const fetchStoreDetails = async () => {
      try {
        const response = await request.get(`/store/${slug}`);
        setStore(response.data.data);
      } catch (err) {
        setError("Failed to fetch store details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [slug]);

  if (loading) {
    return (
      <div
        className="text-center mt-4 d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>;
  }

  if (!store) {
    return <p className="text-center mt-4">Store not found.</p>;
  }

  const slides =
    store && store.product_images_url.length != 0
      ? store.product_images_url.split(",").map((item, id) => {
          return (
            <img
              key={id}
              style={{
                height: "400px",
                objectFit: "cover",
                width: "100%",
              }}
              src={`https://wisnuadiwardhana.my.id/psr/img/${item.replace(
                "public/images/",
                ""
              )}`}
            />
          );
        })
      : [];

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h3>{store.store_name}</h3>
        </Card.Header>
        <ProductCarousel products={slides} />
        <Card.Body>
          <Card.Text>
            {store.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Card.Text>
          <hr />
          <Card.Text className="font-md">
            Diposting oleh <strong> {store.owner} </strong> ({store.address})
          </Card.Text>
          <Card.Text className="font-md" style={{ marginTop: -10 }}>
            {store.tags}
          </Card.Text>
          <hr />
          <div className="d-flex gap-2">
            {/* Existing "Pesan via Whatsapp" Button */}
            <a
              href={`https://api.whatsapp.com/send?phone=${store.phone}&text=Assalamu'alaikum kak ${store.owner}. Jualan kah hari ini? Saya mau pesan ...`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                backgroundColor: "#36a054",
              }}
              className="btn w-100"
            >
              Pesan via Whatsapp
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `${
                  typeof window !== "undefined" ? window.location.href : ""
                }\n\n${store.store_name}\n\n${store.description}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                backgroundColor: "#25d366", // WhatsApp's green color
              }}
              className="btn d-flex align-items-center"
            >
              <i className="fa fa-share">&nbsp;&nbsp;</i>
              Share
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StoreDetail;
