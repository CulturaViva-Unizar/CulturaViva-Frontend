import { TileLayer, Marker, useMap } from "react-leaflet";
import { MapContainer, ZoomControl } from "react-leaflet";
import { Event } from "../../features/events/types/models";
import { CulturalPlace } from "../../features/cultural-places/types/models";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, { Icon } from "leaflet";
import redUrl from "leaflet-color-markers/img/marker-icon-red.png";
import goldUrl from "leaflet-color-markers/img/marker-icon-gold.png";
import shadowUrl from "leaflet-color-markers/img/marker-shadow.png";
import { Colors } from "../../shared/types/enums";
import { Drawer } from "./drawer";
import InfoEvent from "../../features/events/components/info-event";
import { useEffect, useState } from "react";
import InfoCulturalPlace from "../../features/cultural-places/components/info-cultural-place";
import { ZGZ_COORDS } from "../../shared/constants/location";

type MapProps = {
  events: Event[];
  culturalPlaces: CulturalPlace[];
};

function createClusterIcon(color: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (cluster: any) => {
    const count = cluster.getChildCount();
    const size = 40;

    return new L.DivIcon({
      html: `
        <div
          style="
            background-color: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: ${size / 2}px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${color == Colors.Red ? "white" : "black"};
            font-size: 14px;
            border: 2px solid white;
          "
        >
          ${count}
        </div>
      `,
      className: "",
      iconSize: L.point(size, size),
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    });
  };
}

function FlyToPosition({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);
  return null;
}

const Map: React.FC<MapProps> = ({ events, culturalPlaces }) => {
  const eventIcon = new Icon({
    iconUrl: redUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const culturalPlaceIcon = new Icon({
    iconUrl: goldUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const eventClusterIcon = createClusterIcon(Colors.Red);
  const culturalClusterIcon = createClusterIcon(Colors.Gold);

  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const center = userPosition ?? ZGZ_COORDS;
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCulturalPlace, setSelectedCulturalPlace] =
    useState<CulturalPlace | null>(null);
  const [showEventDrawer, setShowEventDrawer] = useState(false);

  const handleClose = () => {
    setShowEventDrawer(false);
    setSelectedEvent(null);
    setSelectedCulturalPlace(null);
  };

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserPosition([coords.latitude, coords.longitude]);
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);

  const [notMobile, setNotMobile] = useState(isNotMobile());

  function isNotMobile() {
    return window.innerWidth > 768;
  }
  
  useEffect(() => {
    const onResize = () => {
      setNotMobile(isNotMobile());
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  
  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={false}
    >
      {userPosition && <FlyToPosition position={userPosition} />}
      {notMobile && (
        <ZoomControl position="bottomright" />
      )}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userPosition && <Marker position={userPosition} />}
      <MarkerClusterGroup iconCreateFunction={eventClusterIcon}>
        {events.map((event) => {
          if (
            event.coordinates &&
            event.coordinates.latitude &&
            event.coordinates.longitude
          ) {
            const coords: [number, number] = [
              event.coordinates!.latitude,
              event.coordinates!.longitude,
            ];
            return (
              <Marker
                key={event.id}
                position={coords}
                icon={eventIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedEvent(event);
                    setShowEventDrawer(true);
                  },
                }}
              />
            );
          }
        })}
      </MarkerClusterGroup>
      <MarkerClusterGroup iconCreateFunction={culturalClusterIcon}>
        {culturalPlaces.map((culturalPlace) => {
          if (
            culturalPlace.coordinates &&
            culturalPlace.coordinates.latitude &&
            culturalPlace.coordinates.longitude
          ) {
            const coords: [number, number] = [
              culturalPlace.coordinates!.latitude,
              culturalPlace.coordinates!.longitude,
            ];
            return (
              <Marker
                key={culturalPlace.id}
                position={coords}
                icon={culturalPlaceIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedCulturalPlace(culturalPlace);
                    setShowEventDrawer(true);
                  },
                }}
              />
            );
          }
        })}
      </MarkerClusterGroup>

      {selectedEvent && (
        <Drawer show={showEventDrawer} onClose={handleClose}>
          <InfoEvent event={selectedEvent} onClose={handleClose} />
        </Drawer>
      )}

      {selectedCulturalPlace && (
        <Drawer show={showEventDrawer} onClose={handleClose}>
          <InfoCulturalPlace
            culturalPlace={selectedCulturalPlace}
            onClose={handleClose}
          />
        </Drawer>
      )}
    </MapContainer>
  );
};

export default Map;
