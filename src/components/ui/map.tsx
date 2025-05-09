import { TileLayer, Marker } from "react-leaflet";
import { MapContainer, ZoomControl } from "react-leaflet";
import { Event } from "../../features/events/types/models";
import { CulturalPlace } from "../../features/cultural-places/types/models";
import { ZGZ_COORDS } from "../../config/constants";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, { Icon } from "leaflet";
import redUrl from "leaflet-color-markers/img/marker-icon-red.png";
import goldUrl from "leaflet-color-markers/img/marker-icon-gold.png";
import shadowUrl from "leaflet-color-markers/img/marker-shadow.png";
import { Colors } from "../../features/enums";

type MapProps = {
  events: Event[];
  culturalPlaces: CulturalPlace[];
};

export function createClusterIcon(color: string) {
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
            color: white;
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
  const eventClusterIcon = createClusterIcon(Colors.RED);
  const culturalClusterIcon = createClusterIcon(Colors.GOLD);

  return (
    <MapContainer
      center={ZGZ_COORDS}
      zoom={15}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup iconCreateFunction={eventClusterIcon}>
        {events.map((event) => {
          const coords: [number, number] = [
            event.coordinates!.latitude,
            event.coordinates!.longitude,
          ];
          return (
            <Marker key={event.id} position={coords} icon={eventIcon}></Marker>
          );
        })}
      </MarkerClusterGroup>

      <MarkerClusterGroup iconCreateFunction={culturalClusterIcon}>
        {culturalPlaces.map((culturalPlace) => {
          const coords: [number, number] = [
            culturalPlace.coordinates!.latitude,
            culturalPlace.coordinates!.longitude,
          ];
          return (
            <Marker
              key={culturalPlace.id}
              position={coords}
              icon={culturalPlaceIcon}
            ></Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
