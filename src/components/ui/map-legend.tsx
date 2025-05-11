import { Colors, Items } from "../../shared/types/enums";
import blueMarkerUrl from 'leaflet/dist/images/marker-icon.png';

const MapLegend = () => {
  const items = Object.values(Items) as string[];
  const colors = Object.values(Colors) as string[];

  return (
    <div
      className="position-absolute bottom-0 start-0 d-flex flex-column bg-white shadow m-3 px-4 py-3 align-items-start justify-content-center rounded"
      style={{ zIndex: 10000 }}
    >
      <h4 className="mb-3">Leyenda</h4>
      <div className="d-flex align-items-center mb-1">
        <img
          src={blueMarkerUrl}
          alt="Ubicación actual"
          className="me-3"
          style={{ width: "13px", height: "20px" }}
        />
        <p className="m-0">Ubicación actual</p>
      </div>
      {items.map((item, i) => (
        <div key={i} className="d-flex align-items-center mb-1">
          <span
            className="me-3"
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: colors[i],
              borderRadius: "2px",
            }}
          />
          <p className="m-0">{item.charAt(0).toUpperCase() + item.slice(1)}</p>
        </div>
      ))}
    </div>
  );
};

export default MapLegend;
