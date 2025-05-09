import { TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { MapContainer, useMap, ZoomControl } from "react-leaflet";

const Map = () => {
  function ClickableBlueCircle({ position, radius, onActivate }) {
    const map = useMap();

    const handleClick = () => {
      onActivate();

      map.setView(position.redCenter, position.redZoom, {
        animate: true,
      });
    };

    return (
      <Circle
        center={position.blue}
        pathOptions={{ color: "blue" }}
        radius={radius}
        eventHandlers={{ click: handleClick }}
      />
    );
  }
  const [showBlue, setShowBlue] = useState(true);
  const [showMarker, setShowMarker] = useState(false);
  const center: [number, number] = [41.6834, -0.8885];
  const bluePos = [41.6834, -0.8925];
  const markerPos = center;
  const markerZoom = 19;
  
  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {showBlue && (
        <ClickableBlueCircle
          position={{ blue: bluePos, markerPos, redZoom: markerZoom }}
          radius={200}
          onActivate={() => {
            setShowBlue(false);
            setShowMarker(true);
          }}
        />
      )}

      {showMarker && (
        <Marker position={markerPos}>
          <Popup>
            <Button onClick={() => setShowCulturalPlaceDrawer(true)}>
              Lugar Cultural
            </Button>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
