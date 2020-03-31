import React from "react";
import { GetAWorldStats } from "./GetGlobalStats";
import { GetIndiaStats } from "./IndiaStats";
import { Getcountries } from "./AllCountries";
import { COVID19Map } from "./COVID19Map";
import "./styles.css";

import { Navbar, Container, Row, Col } from "react-bootstrap";
export default function App() {
  return (
    <>
      <Navbar
        bg="light"
        fixed="top"
        style={{ textAlign: "center", Color: "white" }}
      >
        <Navbar.Brand className="align-content-center">
          COVID-19 CORONAVIRUS STATUS
        </Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: "60px" }}>
        <Row>
          <Col>
            {/* <COVID19Map /> */}
            <GetIndiaStats />
            <GetAWorldStats />

            <Getcountries />
            <a href="https://thevirustracker.com">
              {"source- https://thevirustracker.com"} developed by Sandeep
              Pastapure
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
}
