"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type Incident = {
  id: string;
  latitude: number | null;
  longitude: number | null;
  summary: string | null;
  incident_date: string;
  reason_code: string | null;
};

type Props = {
  incidents: Incident[];
};

export function IncidentsMap({ incidents }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [9.9937, 53.5511],
      zoom: 4,
    });

    mapRef.current = map;
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    incidents
      .filter((incident) => incident.longitude && incident.latitude)
      .forEach((incident) => {
        const marker = new maplibregl.Marker({ color: "#0B3B5F" });
        marker
          .setLngLat([
            incident.longitude as number,
            incident.latitude as number,
          ])
          .setPopup(
            new maplibregl.Popup({ offset: 12 }).setHTML(
              `<strong>${
                incident.summary ?? "Removal notice"
              }</strong><br />${new Date(
                incident.incident_date,
              ).toLocaleDateString()}${
                incident.reason_code
                  ? `<br />Reason: ${incident.reason_code}`
                  : ""
              }`,
            ),
          )
          .addTo(map);
        markersRef.current.push(marker);
      });
  }, [incidents]);

  return (
    <div
      ref={mapContainer}
      className="h-[500px] w-full overflow-hidden rounded-3xl border border-brand-slate/10"
    />
  );
}
