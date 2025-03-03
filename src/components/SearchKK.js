"use client";
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Spinner, Card } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const SearchKK = () => {
  const [keyword, setKeyword] = useState("");
  const [blok, setblok] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wisnuadiwardhana.my.id/psr/search-kk?keyword=${keyword}&blok=${blok}`
      );

      if (response.data.length > 0) {
        setResults(response.data);
      } else {
        setResults([]);
        toast.error("Data tidak ditemukan!");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Terjadi kesalahan saat mencari data.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url, name) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name || "downloaded-image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Download error:", error));
  };

  return (
    <Container className="mt-4">
      <Toaster />
      <h4 className="mb-3">Cari Kartu Keluarga</h4>

      {/* Search Form */}
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Masukkan keyword nama"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            placeholder="Masukkan keyword blok"
            value={blok}
            onChange={(e) => setblok(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          className="mt-4 w-100 btn-primary-yellow"
          disabled={loading}
        >
          {loading ? <Spinner size="sm" style={{ color: "white" }} /> : "Cari"}
        </Button>
      </Form>

      {/* Results */}
      {loading && <p className="text-center">Mencari...</p>}
      {!loading && results.length > 0 && (
        <div className="d-flex flex-wrap gap-3">
          {results.map((item, index) => (
            <Card key={index} className="w-50">
              <Card.Body>
                <Card.Title>{item.nama}</Card.Title>
                <img
                  variant="top"
                  src={
                    `https://wisnuadiwardhana.my.id/psr/img/${item.kk_path
                      .split(",")[0]
                      .replace("public/images/", "")}` ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Foto KK"
                  style={{ height: "180px", objectFit: "cover", width: "100%" }}
                />
                <Card.Text>Blok: {item.blok}</Card.Text>
                <Button
                  variant="primary"
                  className="w-100 mt-2"
                  onClick={() =>
                    downloadImage(
                      `https://wisnuadiwardhana.my.id/psr/img/${item.kk_path
                        .split(",")[0]
                        .replace("public/images/", "")}`,
                      `${item.nama}-KK.jpg`
                    )
                  }
                  disabled={!item.kk_path}
                >
                  Download
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && keyword && (
        <p className="text-center text-danger">
          Tidak ada hasil untuk "{keyword}"
        </p>
      )}
    </Container>
  );
};

export default SearchKK;
