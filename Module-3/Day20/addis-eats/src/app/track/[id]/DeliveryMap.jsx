"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // without this the map renders as broken tiles

const icon = (emoji) =>
  L.divIcon({
    html: `<span style="font-size:28px;line-height:1">${emoji}</span>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 28],
    popupAnchor: [0, -24],
  });
const courierIcon = icon("🛵");
const homeIcon = icon("📍");

function FitBounds({ aLat, aLng, bLat, bLng }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(
      [[aLat, aLng], [bLat, bLng]],
      { padding: [40, 40] }
    );
  }, [map, aLat, aLng, bLat, bLng]);
  return null;
}

export default function DeliveryMap({ origin, destination, courier, area, status }) {
  return (
    <div
      style={{ height: 320 }}
      role="region"
      aria-label={`Map of the delivery to ${area}. The same information is written below the map.`}
    >
      <MapContainer
        center={destination} // [lat, lng]: latitude first
        zoom={14}
        style={{ height: 320 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FitBounds aLat={origin[0]} aLng={origin[1]} bLat={destination[0]} bLng={destination[1]} />
        <Marker position={destination} icon={homeIcon} title="Delivery address">
          <Popup>Delivery address · {area}</Popup>
        </Marker>
        <Marker position={courier} icon={courierIcon} title="Courier">
          <Popup>Courier · {status}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}