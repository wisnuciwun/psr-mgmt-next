"use client";
import React, { useState, useEffect } from "react";
import { Card, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import tempStructure from "@/constants/tempStructure";
import CopyToClipboard from "./CopyToClipboard";
import toast, { Toaster } from "react-hot-toast";
import { utils } from "@/utils";
import { usePathname } from "next/navigation";

const OrganizationStructure = () => {
  const [selectedData, setSelectedData] = useState({
    name: "",
    nickName: "",
    position: "",
    phone: "",
    email: "",
    address: "",
    img: "",
  });
  const [toggleModalBio, setToggleModalBio] = useState(false);
  const [dataMember, setDataMember] = useState(tempStructure.data_member);
  const pathname = usePathname();

  const onHandleModalBio = () => {
    setToggleModalBio(!toggleModalBio);
  };

  const onHandleModalData = (value) => {
    setSelectedData(value);
    onHandleModalBio();
  };

  const allData =
    dataMember.length !== 0 ? utils.groupBy(dataMember, "group") : [];
  const allNames = allData.length !== 0 ? Object.keys(allData) : [];

  return (
    <div className={pathname === "/struktur" ? "p-3" : ""}>
      <h5 className="mb-3 text-center">Visi Misi</h5>
      <div
        style={{ textJustify: "inter-word", textAlign: "justify" }}
        className="mb-4"
      >
        <p>
          Visi :
          <br />
          Terwujudnya Masyarakat Lingkungan Prima Swarga Residence Desa
          Wargaluyu yang Bermartabat, Agamis, Kreatif, Sauyunan dan Digitalis.
        </p>
        <div>
          Misi :
          <br />
          <ol style={{ marginLeft: "-25px" }}>
            <li style={{ margin: "0", padding: "0.2em" }}>
              Membangun Kualitas Sumber Daya Manusia dibidang Pendidikan,
              Kesehatan dan Keagamaan melalui Digitalisasi.
            </li>
            <li style={{ margin: "0", padding: "0.2em" }}>
              Meningkatkan Pelayanan Publik dan Membangun Pelayanan Kebutuhan
              Administrasi Berbasis Informasi dan Teknologi (IT).
            </li>
            <li style={{ margin: "0", padding: "0.2em" }}>
              Perbaikan Tata Kelola Organisasi dan Pemulihan Keseimbangan
              Lingkungan yang berkelanjutan Berlandaskan Sauyunan dan Kerukunan
              Hidup Bertetangga.
            </li>
            <li style={{ margin: "0", padding: "0.2em" }}>
              Menggali dan Menumbuhkembangkan Potensi Masyarakat serta
              Melestarikan Budaya Tradisional dan Kearifan Lokal.
            </li>
            <li style={{ margin: "0", padding: "0.2em" }}>
              Memelihara Ketersediaan dan Kualitas Infrastruktur serta
              Keterpaduan Pemanfaatan Tata Ruang Wilayah Prima Swarga Residence.
            </li>
            <li style={{ margin: "0", padding: "0.2em" }}>
              Meningkatkan Partisipasi Sektor Swasta dan Pemberdayaan Ekonomi
              Kerakyatan yang berdaya saing.
            </li>
            <li style={{ margin: "0", padding: "0.2em" }}>
              Membangun dan Meningkatkan hubungan Kemasyarakatan dengan Nilai
              Gotong Royong dan Kepedulian Sosial.
            </li>
          </ol>
        </div>
      </div>
      <div className="mb-4">
        {allNames.length !== 0 &&
          allNames.map((w, id) => (
            <div key={id} className="mb-1 mt-3">
              <h5 className="mt-2 text-center w-100">{w}</h5>
              <div
                className="d-flex"
                style={{ overflowX: "scroll", gap: "8px" }}
              >
                {allData[w].map((v, idx) => (
                  <Card
                    key={idx}
                    onClick={() => onHandleModalData(v)}
                    style={{ minWidth: "50%" }}
                  >
                    <img
                      style={{
                        height: "230px",
                        objectFit: "cover",
                      }}
                      src={v.img}
                      alt=""
                    />
                    <Card.Body className="font-md font-weight-bold text-truncate">
                      <div className="font-md text-truncate font-weight-bold">
                        {v.name}
                      </div>
                      <div className="font-sm text-truncate">{v.position}</div>
                      <div className="font-sm">{v.address}</div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div className="mb-2">
        <h4 className="mb-2">Kotak Aspirasi</h4>
        <div className="mb-2">
          Apabila anda memiliki keluhan, kritik maupun saran. Anda dapat
          menggunakan link dibawah ini untuk mengisi Kotak Aspirasi. Semua akan
          ditampung dan disampaikan langsung ke pengurus Prima Swarga Residence.
        </div>
        <a
          target="_blank"
          style={{ textDecoration: "none" }}
          href="https://forms.gle/L7WffCsYveH8DYaCA"
          rel="noreferrer"
        >
          Klik disini
        </a>
      </div>
      <div className="d-flex justify-content-center">
        <Modal
          backdropClassName="custom-backdrop"
          onHide={onHandleModalBio}
          centered
          show={toggleModalBio}
        >
          <ModalHeader className="font-lg font-weight-bold" closeButton>
            Biodata lengkap
          </ModalHeader>
          <ModalBody className="p-3">
            <div className="d-flex justify-content-center">
              <img
                src={selectedData.img}
                style={{
                  height: "300px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                alt=""
              />
            </div>
            <br />
            <div className="font-md">Nama Lengkap</div>
            <div className="font-md font-weight-bold">{selectedData.name}</div>
            <div className="font-md">Nama Panggilan</div>
            <div className="font-md font-weight-bold">
              {selectedData.nickName}
            </div>
            <div className="font-md">Nomor HP</div>
            <CopyToClipboard
              onCopy={() => {
                toast("Nomor berhasil dicopy !");
              }}
              text={selectedData.phone}
            >
              <div
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center font-md text-primary font-weight-bold"
              >
                {selectedData.phone}
                &nbsp;&nbsp;
                <i className="fa fa-clone fa-sm text-dark"></i>
              </div>
            </CopyToClipboard>
            <div className="font-md">Jabatan</div>
            <div className="font-md font-weight-bold">
              {selectedData.position}
            </div>
            <div className="font-md">Email</div>
            <div className="font-md font-weight-bold">{selectedData.email}</div>
            <div className="font-md">Alamat Rumah</div>
            <div className="font-md font-weight-bold">
              {selectedData.address}
            </div>
          </ModalBody>
        </Modal>
      </div>
      <Toaster />
    </div>
  );
};

export default OrganizationStructure;
