import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import FindReportButton from "./components/FindReportButton";
import axios from "axios";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
// const center = ;

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_MAPS,
    libraries,
  });

  const [center, setCenter] = useState({
    lat: -20.4420925950939, // default latitude
    lng: -54.6311555590886, // default longitude
  });

  const [markers, setMarkers] = useState([]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const findReport = async () => {
    let { data } = await axios.get("http://127.0.0.1:8000/repots");
    let repots = [];
    data.map((item) => {
      let coods = {
        lat: item.lat_hex, // default latitude
        lng: item.lng_hex, // default longitude
      };
      repots.push(coods);
    });
    setMarkers(repots);
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <FindReportButton findReport={findReport} />
        {markers.length > 0 ? (
          markers.map((item) => <Marker position={item} />)
        ) : (
          // <Marker position={center} />
          <></>
        )}
      </GoogleMap>
    </div>
  );
};

export default App;
