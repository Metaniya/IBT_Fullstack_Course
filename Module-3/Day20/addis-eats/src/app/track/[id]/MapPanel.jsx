"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false, // Leaflet touches window on import
  loading: () => (
    <div style={{ height: 320 }} className="animate-pulse rounded bg-slate-100" aria-hidden="true" />
  ),
});

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}
