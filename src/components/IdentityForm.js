"use client";
import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import imageCompression from "browser-image-compression";

const IdentityForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    blok: "",
    fotoKK: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value ? value.toUpperCase() : "",
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected!");
      return;
    }

    console.log("Original file:", file);

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    try {
      setLoading(true);
      const compressedImage = await imageCompression(file, options);
      console.log("Compressed file:", compressedImage);

      setFormData((prev) => ({
        ...prev,
        fotoKK: compressedImage,
      }));
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Failed to compress image.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ensure default submission is prevented first
    setLoading(true);

    try {
      const data = new FormData();
      data.append("nama", formData.nama);
      data.append("blok", formData.blok);

      // Ensure the file is added correctly
      if (formData.fotoKK) {
        data.append(
          "fotoKK",
          formData.fotoKK,
          formData.fotoKK.name || "upload.jpg"
        );
      }

      const response = await axios.post(
        "https://wisnuadiwardhana.my.id/psr/upload-kk",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("Successfully uploaded data");
        setFormData({
          nama: "",
          blok: "",
          fotoKK: null,
        });
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Toaster />
      <h4 className="mb-3">Form Kartu Keluarga</h4>
      <Form onSubmit={handleSubmit}>
        {/* Nama */}
        <Form.Group className="mb-3">
          <Form.Label>Nama Kepala Keluarga</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan Nama"
            required
          />
        </Form.Group>

        {/* Blok */}
        <Form.Group className="mb-3">
          <Form.Label>Blok</Form.Label>
          <Form.Control
            type="text"
            name="blok"
            value={formData.blok}
            onChange={handleChange}
            placeholder="Masukkan Blok"
            required
          />
        </Form.Group>

        {/* Upload Foto KK */}
        <Form.Group className="mb-3">
          <Form.Label>Upload Foto KK</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button
          disabled={loading}
          variant="primary"
          className="w-100 btn-primary-yellow mt-3"
          type="submit"
        >
          {loading ? (
            <Spinner size="sm" style={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default IdentityForm;
