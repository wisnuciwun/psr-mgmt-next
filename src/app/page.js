"use client";

import Image from "next/image";
import styles from "./page.module.css";
import HomeCarousel from "@/components/HomeCarousel";
import { Button, Card } from "react-bootstrap";
import moment from "moment";
import OrganizationStructure from "@/components/OrganizationStructure";
import Contacts from "@/components/Contacts";
import request from "@/utils/request";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [dataNews, setdataNews] = useState([]);
  const nav = useRouter();

  const onGetAllNews = async () => {
    await request.get("/all-news").then((res) => {
      if (res.data.success) {
        setdataNews(res.data.data);
      }
    });
  };

  useEffect(() => {
    onGetAllNews();
  }, []);

  return (
    <>
      <HomeCarousel />
      <div className="p-3">
        <h4>Selayang Pandang</h4>
        <p>Selamat datang di website Baraya Swarga</p>
        <h4>Berita</h4>
        <div style={{ maxHeight: 450, overflowY: "scroll" }}>
          {dataNews.length != 0 ? (
            dataNews.map((v, id) => {
              return (
                <Card key={id} className="p-0 mb-2">
                  <Card.Body>
                    <p style={{ fontSize: 11 }}>
                      {moment(v.created_at).format("DD MMM YYYY")}
                    </p>
                    <h5>{v.title}</h5>
                    <p>{v.body.substring(0, 100)}...</p>
                    <div style={{ color: "black", textDecoration: "none" }}>
                      <div className="d-flex justify-content-center">
                        <Button
                          onClick={() => nav.push("/berita/${v.id}")}
                          className="w-100 btn-light"
                        >
                          <span>
                            <i className="fa fa-search">&nbsp;&nbsp;</i>
                            Selengkapnya
                          </span>
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div>Belum ada berita yang dapat ditampilkan.</div>
          )}
        </div>
        <br />
        <h4>Struktur Organisasi</h4>
        <br />
        <OrganizationStructure />
        <br />
        <h4 className="mb-3">Hubungi Kami</h4>
        <Contacts />
      </div>
    </>
  );
}
