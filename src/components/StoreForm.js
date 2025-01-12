"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const StoreForm = () => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    store_name: "",
    owner: "",
    address: "",
    phone: "",
    description: "",
    tags: "",
    product_images: null,
  });
  const [loading, setloading] = useState(false);

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    let valueData = value;

    if (name == "address") {
      valueData = value?.toUpperCase();
    }

    setFormData({ ...formData, [name]: valueData });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]); // Store selected files in an array
  };

  const handleReset = () => {
    setImages([]);
    setFormData((prev) => ({
      ...prev,
      product_images: null,
    }));

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let data = new FormData();

    if (images.length != 0) {
      data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      images.forEach((image) => data.append("product_images[]", image)); // Add multiple images
    } else {
      data = formData;
    }

    if (images.length <= 4) {
      try {
        setloading(true);
        const response = await axios.post(
          "https://wisnuadiwardhana.my.id/psr/save-store",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          setloading(false);
          toast("Lapak berhasil dibuat!");
          setFormData({
            store_name: "",
            owner: "",
            address: "",
            phone: "",
            description: "",
            tags: "",
          });
          setImages([]);
          navigate.push(`/lapak/${response.data.data.slug}`);
        }
      } catch (error) {
        setloading(false);
        toast(
          `Terjadi kesalahan ${
            error.response.data.error
              ? error.response.data.error.substring(0, 75)
              : ""
          }`
        );
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors); // Capture validation errors from Laravel
        }
      }
    } else if (images.length > 4) {
      toast("Maaf gambar terlalu banyak, ulangi upload gambar lagi");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="ps-3 pe-3">
      <Toaster />
      <h4 className="mb-3">Buat Lapak Baru</h4>
      <FormGroup className="mb-3">
        <FormLabel>
          Nama Lapak <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <FormControl
          type="text"
          name="store_name"
          value={formData.store_name}
          required
          maxLength={255}
          onChange={handleChange}
          isInvalid={!!errors.store_name}
          placeholder="Contoh: Snack Asik"
        />
        <FormControl.Feedback type="invalid">
          {errors.store_name}
        </FormControl.Feedback>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>
          Pemilik <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <FormControl
          type="text"
          name="owner"
          value={formData.owner}
          maxLength={100}
          required
          onChange={handleChange}
          isInvalid={!!errors.owner}
          placeholder="Contoh: Zea Salsabila"
        />
        <FormControl.Feedback type="invalid">
          {errors.owner}
        </FormControl.Feedback>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>
          Alamat <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <FormControl
          type="text"
          name="address"
          value={formData.address}
          required
          onChange={handleChange}
          isInvalid={!!errors.address}
          maxLength={5}
          placeholder="Contoh: A1-01 (harus sesuai contoh ya..)"
        />
        <FormControl.Feedback type="invalid">
          {errors.address}
        </FormControl.Feedback>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>
          Nomor HP <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <FormControl
          type="text"
          name="phone"
          value={formData.phone}
          required
          onChange={handleChange}
          isInvalid={!!errors.phone}
          maxLength={14}
          placeholder="Contoh: 081298698252"
        />
        <FormControl.Feedback type="invalid">
          {errors.phone}
        </FormControl.Feedback>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>
          Deskripsi Toko <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <FormControl
          as="textarea"
          name="description"
          value={formData.description}
          required
          onChange={handleChange}
          style={{ height: 400 }}
          maxLength={5000}
          isInvalid={!!errors.description}
          placeholder="Deskripsi bisa menggunakan teks yang di-share di grup whatsapp"
        />
        <FormControl.Feedback type="invalid">
          {errors.description}
        </FormControl.Feedback>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Tags</FormLabel>
        <FormControl
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          isInvalid={!!errors.tags}
          max={150}
          placeholder="Contoh: #seblak #pedes #baso"
        />
        <FormControl.Feedback type="invalid">
          {errors.tags}
        </FormControl.Feedback>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Foto Produk</FormLabel>
        <div className="d-flex align-items-center gap-1">
          <FormControl
            type="file"
            name="product_images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            isInvalid={!!errors.product_images}
            ref={fileInputRef} // Attach ref to the input
          />
          <Button onClick={handleReset} variant="outline">
            <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
          </Button>
        </div>

        <FormControl.Feedback type="invalid">
          {errors.product_images}
        </FormControl.Feedback>
        <span className="font-sm" style={{ color: "red" }}>
          *Maksimal 4 foto, foto pertama menjadi foto utama. Upload tidak bisa
          dari kamera. Jika terjadi error, coba screenshoot foto yang mau
          diupload, kemudian upload foto screenshoot tersebut agar ukurannya
          lebih kecil.
        </span>
      </FormGroup>

      <Button
        variant="primary"
        className="w-100 btn-primary-yellow"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <Spinner size="sm" style={{ color: "white" }} color="white" />
        ) : (
          "Simpan"
        )}
      </Button>
    </Form>
  );
};

export default StoreForm;
