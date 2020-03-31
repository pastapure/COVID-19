import React, { useState, useEffect } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { XAxis, YAxis, BarChart, Bar, LabelList, Legend } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

function Getcountries() {
  const clr = [
    "",
    "primary",
    "success",
    "secondary",

    "danger",
    "warning",
    "info",
    "secondary",
    "dark"
  ];

  const [data, setData] = useState({});
  const [cdata, setCdata] = useState({});
  // const [loading, setLoading] = useState(true);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  async function fetchUrl() {
    const response = await fetch(
      `https://thevirustracker.com/free-api?countryTotals=ALL`
    );
    const json = await response.json();
    const d = json.countryitems[0];
    let dt = [];
    Object.keys(d).map((key, index) => dt.push(d[key]));
    dt.sort((a, b) => b.total_cases - a.total_cases);
    //console.log(dt);
    setData(dt);
    setCdata(dt.slice(0, 7));
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  //return [data, loading];
  return (
    <Container fluid>
      {/* <LineChart width={600} height={300} data={data.slice(0, 20)}>
        <Line type="monotone" dataKey="total_cases" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="title" />
        <YAxis dataKey="total_cases" />
      </LineChart> */}
      <p className="btn btn-info btn-block">
        Top {cdata.length} Countries for Total Cases and Total Active Cases
      </p>
      <div className="fade alert alert-info show d-flex justify-content-center ">
        <BarChart width={300} height={350} data={cdata}>
          <XAxis dataKey="title" style={{ fontSize: "1px" }} />
          <Bar
            dataKey="total_cases"
            type="monotone"
            barSize={20}
            fill="#8884d8"
            label={{ position: "top", fontSize: "9px" }}
          >
            <LabelList
              dataKey="title"
              angle="-90"
              style={{ fontSize: "12px", color: "red" }}
            />
          </Bar>
          <Bar
            dataKey="total_active_cases"
            type="monotone"
            barSize={10}
            fill="#82ca9d"
          />
          <Legend />
        </BarChart>
      </div>

      {Object.keys(data).map((key, index) => (
        <Alert key={index} variant={"info"}>
          <div
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "19px"
            }}
          >
            {data[key].title}
          </div>
          <hr />
          <Row key={index} style={{ textAlign: "center" }}>
            {Object.keys(data[key]).map((keyName, i) =>
              keyName.includes("total") ? (
                <Col
                  key={i}
                  style={{
                    textTransform: "capitalize",
                    border: "1px solid #C4C4C4",
                    fontWeight: "bold"
                  }}
                >
                  <p
                    style={{
                      fontSize: "28px",
                      textShadow: "1px 2px 2px #666",
                      fontFamily: "calibri,Open Sans"
                    }}
                    className={`text-${clr[i - 3]}`}
                  >
                    {numberWithCommas(data[key][keyName])}
                  </p>
                  <p style={{ fontSize: "9px", padding: "5px 0px 0px 1px" }}>
                    {keyName
                      .replace("_", " ")
                      .replace("_", " ")
                      .replace("_", " ")}
                  </p>
                </Col>
              ) : (
                ""
              )
            )}
          </Row>
        </Alert>
      ))}
    </Container>
  );
}
export { Getcountries };
