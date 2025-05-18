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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const correctPassword = "psr#2025";
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      toast.error("Password salah!");
    }
  };

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
      {!isAuthenticated ? (
        <Form
          onSubmit={handlePasswordSubmit}
          style={{ maxWidth: 400, margin: "100px auto" }}
        >
          <h4 className="text-center mb-3">Masukkan Password</h4>
          <Form.Control
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <Button type="submit" className="w-100 mt-3 btn-primary-yellow">
            Masuk
          </Button>
        </Form>
      ) : (
        <>
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
              {loading ? (
                <Spinner size="sm" style={{ color: "white" }} />
              ) : (
                "Cari"
              )}
            </Button>
          </Form>

          {/* Results */}
          {loading && <p className="text-center">Mencari...</p>}
          {!loading && results.length > 0 && (
            <div className="d-flex flex-wrap gap-3">
              {results.map((item, index) => (
                <Card key={index} style={{ width: "47%" }}>
                  <Card
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{item.nama}</Card.Title>
                      <img
                        src={
                          `https://wisnuadiwardhana.my.id/psr/img/${item.kk_path
                            .split(",")[0]
                            .replace("public/images/", "")}` ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Foto KK"
                        style={{
                          height: "180px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <Card.Text>Blok: {item.blok}</Card.Text>

                      {/* Sticky Buttons Container */}
                      <div className="mt-auto">
                        <Button
                          variant="success"
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
                        <Button
                          variant="primary"
                          className="w-100 mt-2"
                          onClick={() => {
                            let url = `https://wisnuadiwardhana.my.id/psr/img/${item.kk_path
                              .split(",")[0]
                              .replace("public/images/", "")}`;
                            navigator.clipboard
                              .writeText(url)
                              .then(() =>
                                toast.success("URL copied to clipboard!")
                              )
                              .catch(() => toast.error("Failed to copy URL."));
                          }}
                          disabled={!item.kk_path}
                        >
                          Copy URL
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Card>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && keyword && (
            <p className="text-center text-danger">
              Tidak ada hasil untuk "{keyword}"
            </p>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchKK;
