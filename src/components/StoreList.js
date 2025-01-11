"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useRouter } from "next/navigation";
import request from "@/utils/request";

const StoreList = () => {
  const navigate = useRouter();
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStores(); // Fetch stores on initial render
  }, []);

  const fetchStores = async (query = "") => {
    setLoading(true);
    try {
      const response = await request.get(`/all-stores?keyword=${search}`);
      setStores(response.data.data || response.data); // Adjust according to API response
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores(search); // Fetch stores based on search input
  };

  return (
    <div className="container mt-2">
      <Helmet>
        <title>Jajanan PSR</title>
        <meta
          name="description"
          content="Semua insyaAllah ada! Mulai dari sandang, pangan dan papan semua ada."
        />
        <meta property="og:title" content="UMKM Prima Swarga Residence" />
        <meta
          property="og:description"
          content="Semua insyaAllah ada! Mulai dari sandang, pangan dan papan semua ada."
        />
        <meta
          property="og:url"
          content={`https://barayaswarga.com/jajanan-psr`}
        />
      </Helmet>
      <h1>Lapak Prima Swarga Residence</h1>
      <span className="mb-4 text-muted font-md">
        Ngga usah jauh-jauh keluar rumah, nggak usah pusing cari di internet.
        Disini, semua insyaAllah ada! Mulai dari sandang, pangan dan papan semua
        ada. Yuk bersama kita bisa mandiri dan sejahtera
      </span>
      <Form className="mb-4 mt-4" onSubmit={handleSearch}>
        <div className="d-flex">
          <FormControl
            type="text"
            placeholder="Mau cari apa hari ini?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="me-2"
          />
          <Button
            variant="primary"
            type="submit"
            className="btn-primary-yellow"
            disabled={loading}
            style={{ width: 75 }}
          >
            {loading ? (
              <Spinner size="sm" style={{ color: "white" }} color="white" />
            ) : (
              "Cari"
            )}
          </Button>
        </div>
      </Form>

      {/* Store Cards */}
      <Row xs={1} md={2} className="g-4">
        {stores.length > 0 ? (
          stores.map((store) => (
            <Col xs={6} key={store.id}>
              <Card onClick={() => navigate.push(`/lapak/${store.slug}`)}>
                <Card.Body>
                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 3, // Truncate after 3 lines
                    }}
                  >
                    {store.store_name}
                  </p>
                  {store.product_images_url != null &&
                    store.product_images_url != "" && (
                      <img
                        src={`https://wisnuadiwardhana.my.id/psr/img/${store.product_images_url
                          .split(",")[0]
                          .replace("public/images/", "")}`}
                        style={{
                          width: "100%",
                          objectFit: "fill",
                          maxHeight: 150,
                        }}
                      />
                    )}
                  <div style={{ textAlign: "right" }}>
                    <b className="mb-2 text-muted font-sm">{store.owner}</b>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={12} sm={12}>
            <p className="text-center">
              {loading ? "Loading..." : "Oops, tidak ditemukan lapak"}
            </p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default StoreList;
