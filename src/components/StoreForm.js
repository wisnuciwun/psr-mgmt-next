"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import request from "@/utils/request";

const StoreForm = () => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    store_name: "",
    owner: "",
    address: "",
    phone: "",
    description: "",
    tags: "",
    keypass: "",
  });
  const [loading, setloading] = useState(false);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const params = useParams();
  const [show, setShow] = useState(false);
  const [keypass, setKeypass] = useState("");

  const checkKeypass = async () => {
    try {
      await request
        .post(`/store/check-keypass`, { slug: params?.slug, keypass: keypass })
        .then((res) => {
          if (res.data.success) {
            postLapak();
          } else {
            toast("Punteun, passwordnya salah");
          }
        });
    } catch (error) {
      toast("Punteun, passwordnya salah");
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "address" ? value.toUpperCase() : value,
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedImages = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 0.4,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        try {
          setloading(true);
          return await imageCompression(file, options);
        } catch (error) {
          console.error("Image compression error:", error);
          return file;
        }
      })
    );
    console.log("image_compressed", compressedImages.length);
    setloading(false);
    setImages(compressedImages);
  };

  const handleReset = () => {
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (params?.slug && keypass == "") {
      setShow(true);
    } else {
      postLapak();
    }
  };

  const postLapak = async () => {
    let data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    images.forEach((image) => data.append("product_images[]", image));

    if (images.length > 4) {
      toast("Maaf gambar terlalu banyak, ulangi upload gambar lagi");
      return;
    }

    try {
      setloading(true);
      const response = await axios.post(
        params?.slug
          ? "https://wisnuadiwardhana.my.id/psr/store/edit"
          : "https://wisnuadiwardhana.my.id/psr/save-store",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        toast(`Lapak berhasil di${params?.slug ? "edit" : "buat"}!`);
        setFormData({
          store_name: "",
          owner: "",
          address: "",
          phone: "",
          description: "",
          tags: "",
        });
        setImages([]);
        setKeypass("");
        if (show) {
          setShow(false);
        }
        setTimeout(() => {
          navigate.push(`/lapak/${response.data.data.slug}`);
        }, 2000);
      }
    } catch (error) {
      toast(
        `Terjadi kesalahan ${
          error.response?.data?.error?.substring(0, 75) || ""
        }`
      );
      if (error.response?.data?.errors) setErrors(error.response.data.errors);
    } finally {
      setloading(false);
    }
  };

  const fetchStoreDetails = async () => {
    try {
      const response = await request.get(`/store/${params.slug}`);
      const data = response.data.data;

      setFormData({
        ...data,
        keypass: "",
      });
    } catch (err) {
      console.log("error", err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (params.slug) {
      fetchStoreDetails();
    }
  }, [params?.slug]);

  return (
    <>
      <Form onSubmit={handleSubmit} className="ps-3 pe-3">
        <Toaster />
        <h4 className="mb-3">
          {params?.slug ? "Edit Lapak" : "Buat Lapak Baru"}
        </h4>
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
            maxLength={20}
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
            *Maksimal 4 foto, foto pertama menjadi foto utama (boleh tidak
            diisi)
            {params?.slug
              ? ". Jika tidak diisi maka foto yang digunakan adalah foto sebelumnya."
              : ""}
          </span>
        </FormGroup>

        <FormGroup className="mb-5">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="text"
            name="keypass"
            required={!params?.slug}
            value={formData.keypass}
            onChange={handleChange}
            max={150}
            placeholder="Password untuk edit postingan nantinya"
          />
          <span
            hidden={!params?.slug}
            className="font-sm"
            style={{ color: "red" }}
          >
            Jangan diisi jika tidak ingin merubah password
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
      <Modal show={show} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Masukkan Password Lapak</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              value={keypass}
              onChange={(e) => setKeypass(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-primary-white" onClick={() => setShow(false)}>
            Batal
          </Button>
          <Button
            disabled={loading}
            onClick={() => checkKeypass()}
            className="btn-primary-yellow"
          >
            {loading ? (
              <Spinner size="sm" style={{ color: "white" }} color="white" />
            ) : (
              "Submit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StoreForm;
