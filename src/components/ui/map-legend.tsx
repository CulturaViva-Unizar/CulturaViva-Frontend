import { Colors, Items } from "../../features/enums";

const MapLegend = () => {
  const items = Object.values(Items) as string[];
  const colors = Object.values(Colors) as string[];

  return (
    <div
        className="position-absolute bottom-0 start-0 d-flex flex-column bg-white shadow m-3 px-4 py-3 align-items-start justify-content-center rounded"
        style={{ zIndex: 10000 }}
      >
        <h4 className="mb-3">Leyenda</h4>
      {items.map((item, idx) => (
        <div key={item} className="d-flex align-items-center mb-1">
          <span
            className="me-3"
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: colors[idx],
              borderRadius: '2px',
            }}
          />
          <p className="m-0">{item.charAt(0).toUpperCase() + item.slice(1)}</p>
        </div>
      ))}
      </div>
  );
};

export default MapLegend;
