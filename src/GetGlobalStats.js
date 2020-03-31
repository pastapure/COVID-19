import React, { useState, useEffect } from "react";
import { Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function GetAWorldStats() {
  const clr = [
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
  // const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(
      `https://thevirustracker.com/free-api?global=stats`
    );
    const json = await response.json();
    //console.log(json.results);
    setData(json.results[0]);

    //setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  //return [data, loading];
  return (
    <Row>
      <h1 className="btn btn-info btn-block">WORLD COVID-19 Status</h1>

      <hr />
      {Object.keys(data).map((key, index) =>
        key !== "source" ? (
          <Col md={3} xs={6} key={index}>
            <Alert
              variant={clr[index]}
              className="text-center"
              style={{ padding: "5px 0px 0px 1px" }}
            >
              <div className={`text-${clr[index]}`}>
                <h1
                  style={{
                    textShadow: "1px 2px 2px #666",

                    fontFamily: "calibri,Open Sans"
                  }}
                >
                  {numberWithCommas(data[key])}{" "}
                </h1>
              </div>
              <Alert.Heading
                style={{
                  textTransform: "capitalize",
                  padding: 0,
                  fontSize: "15px"
                }}
              >
                {key
                  .replace("_", " ")
                  .replace("_", " ")
                  .replace("_", " ")}
              </Alert.Heading>
            </Alert>
          </Col>
        ) : (
          ""
        )
      )}
    </Row>
  );
}
export { GetAWorldStats };
