import React from "react";
import { Button } from "react-bootstrap";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div
    className="position-fixed top-50 start-50 translate-middle d-flex justify-content-center align-items-center text-center shadow rounded"
    style={{ zIndex: 10000 }}
  >
    <div className="card py-3 bg-light">
      <div className="card-body">
        <h3 className="card-title text-danger pb-4 px-2">{message}</h3>
        <Button
          variant="dark"
          size="sm"
          className="rounded-pill px-4"
          onClick={() => window.location.assign(window.location.href)}
        >
          Volver a intentarlo
        </Button>
      </div>
    </div>
  </div>
);
