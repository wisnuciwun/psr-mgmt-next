"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

function HomeNavbar(props) {
  const pathname = usePathname();
  const nav = useRouter();
  const pagePosition = pathname;
  let expand = false;

  return (
    <div>
      <Navbar
        key={expand}
        expand={expand}
        className="mb-3 bg-secondary-yellow pb-3 pt-2"
      >
        <Container fluid>
          <Navbar.Toggle
            style={{ border: "none" }}
            className="no-outline"
            aria-controls={`offcanvasNavbar-expand-${expand}`}
          />
          <div
            className="d-flex align-items-center"
            style={{ gap: "10px" }}
          ></div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
            className="bg-primary-green"
            style={{ color: "white" }}
          >
            <Offcanvas.Header
              className="d-flex justify-content-end"
              closeButton
            ></Offcanvas.Header>
            <div className="d-flex justify-content-center mb-3">
              <img src="/assets/logo3.png" style={{ width: "100px" }} alt="" />
            </div>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <div
                  onClick={() => nav.push("/")}
                  className={`${
                    pagePosition === "/" && "bg-selected-menu"
                  } d-flex align-items-center p-2`}
                >
                  <i style={{ width: "35px" }} className="fa fa-home fa-lg">
                    &nbsp;
                  </i>
                  <span className="font-lg">Beranda</span>
                </div>
                <div
                  onClick={() => nav.push("/jajanan-psr")}
                  className={`${
                    pagePosition === "/jajanan-psr" && "bg-selected-menu"
                  } d-flex align-items-center p-2`}
                >
                  <i
                    style={{ width: "35px" }}
                    className="fa fa-shopping-cart fa-lg"
                  >
                    &nbsp;
                  </i>
                  <span className="font-lg">Jajanan PSR</span>
                </div>
                <div
                  onClick={() => nav.push("/struktur-organisasi")}
                  className={`${
                    pagePosition === "/struktur" && "bg-selected-menu"
                  } d-flex align-items-center p-2`}
                >
                  <i style={{ width: "35px" }} className="fa fa-users fa-lg">
                    &nbsp;
                  </i>
                  <span className="font-lg">Struktur Organisasi</span>
                </div>
                <div
                  onClick={() => nav.push("/kontak")}
                  className={`${
                    pagePosition === "/kontak" && "bg-selected-menu"
                  } d-flex align-items-center p-2`}
                >
                  <i style={{ width: "35px" }} className="fa fa-phone fa-lg">
                    &nbsp;
                  </i>
                  <span className="font-lg">Kontak</span>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomeNavbar;
