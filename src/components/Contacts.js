"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";

const Contacts = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bodyEmail, setBodyEmail] = useState("");
  const [isKontakPage, setIsKontakPage] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsKontakPage(pathname === "/kontak");
  }, [pathname]);

  return (
    <div className={isKontakPage ? "p-3" : ""}>
      <Form className="w-100">
        {/* Email field (commented out in original code) */}
        {/* <FormGroup className="mb-2" row>
          <FormLabel className="mb-1" htmlFor="exampleEmail" sm={2}>
            Email
          </FormLabel>
          <Col sm={12}>
            <FormControl
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Silahkan isi email anda"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Col>
        </FormGroup> */}
        <FormGroup className="mb-2">
          <FormLabel className="mb-1" htmlFor="exampleName" sm={2}>
            Nama
          </FormLabel>
          <Col sm={12}>
            <FormControl
              type="text"
              name="name"
              id="exampleName"
              placeholder="Silahkan isi nama anda"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Col>
        </FormGroup>
        <FormGroup className="mb-2">
          <FormLabel className="mb-1" htmlFor="exampleText" sm={2}>
            Pesan
          </FormLabel>
          <Col sm={12}>
            <FormControl
              as="textarea"
              style={{ height: "200px" }}
              name="text"
              id="exampleText"
              placeholder="Silahkan isi pesan anda"
              onChange={(e) => setBodyEmail(e.target.value)}
              value={bodyEmail}
            />
          </Col>
        </FormGroup>
        <FormGroup className="mb-2">
          <Col sm={12} className="mt-3">
            <a
              href={`https://wa.me/6281320500045?text=Assalamualaikum min, saya ${name}. ${bodyEmail}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-100 btn-primary-yellow">
                Kirim ke WA Pengurus
              </Button>
            </a>
          </Col>
        </FormGroup>
      </Form>
      <br />
      <h6 className="mb-4">Lokasi Balai Warga</h6>
      <div className="d-flex align-items-center h-100">
        <iframe
          style={{ width: "100%", height: "450px", border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.9441042133652!2d107.61163716957196!3d-7.035543899560394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68eb003f9ace55%3A0xf5b690e54897d59b!2sBALAI%20WARGA%20PSR!5e0!3m2!1sid!2sid!4v1736203921835!5m2!1sid!2sid"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <br />
    </div>
  );
};

export default Contacts;
