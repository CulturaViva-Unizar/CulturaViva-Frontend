import React from "react";
import { Spinner } from "react-bootstrap";

type LoadingIndicatorProps = {
  message?: string;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = "Cargando...",
}) => {
  return (
    <div
      className="position-fixed top-50 start-50 translate-middle d-flex flex-column justify-content-center align-items-center bg-white shadow rounded p-5"
      style={{ zIndex: 10000 }}
    >
      <Spinner animation="border" className="mb-3" /> {message}
    </div>
  );
};

export default LoadingIndicator;
