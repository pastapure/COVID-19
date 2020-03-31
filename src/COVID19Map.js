import React, { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";

export const COVID19Map = () => {
  const mapRef = useRef();

  const [data, setData] = useState({});

  // const [loading, setLoading] = useState(true);
  async function Getdata(cntry) {
    const response = await fetch(
      "https://thevirustracker.com/free-api?countryTotal=" + cntry
    );

    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/FeatureLayer",
        "esri/layers/support/Field"
      ],
      {
        css: true
      }
    ).then(([ArcGISMap, SceneView, FeatureLayer, Field]) => {
      const countries = new FeatureLayer({
        outFields: ["*"],
        url:
          "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries/FeatureServer/0",
        opacity: 0.6,
        renderer: {
          type: "simple",
          symbol: {
            type: "polygon-3d", // autocasts as new PolygonSymbol3D()
            symbolLayers: [
              {
                type: "fill", // autocasts as new FillSymbol3DLayer()
                material: {
                  color: [0, 0, 0, 0]
                },
                outline: {
                  color: [255, 0, 0]
                }
              }
            ]
          }
        }
      });

      const populationChange = feature => {
        // calculate the population percent change from 2010 to 2013.
        let name = feature.graphic.attributes.COUNTRY;
        const field = feature.graphic.attributes.ISO_CC;

        Getdata(field);

        // Object.keys(data).map(key =>
        //   data[key].title === name ? (Cdata = data[key]) : (Cdata = data[key])
        // );

        return "<div> COVID-19 Count in " + JSON.stringify(data) + "</div>";
      };
      var popupTemplate = {
        title: "{COUNTRY}",
        content: populationChange
      };

      countries.popupTemplate = popupTemplate;
      const map = new ArcGISMap({
        layers: [countries],
        ground: {
          opacity: 0.1,
          surfaceColor: "black"
        }
      });

      // load the map view at the ref's DOM node
      const view = new SceneView({
        container: mapRef.current,
        map: map,
        ui: {
          components: ["attribution"]
        },
        environment: {
          starsEnabled: false,
          atmosphereEnabled: true,
          background: {
            type: "color",
            color: "white"
          }
        },
        center: [78, 22],
        zoom: 2
      });

      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  });

  return <div className="webmap" ref={mapRef} />;
};
