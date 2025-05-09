import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export const MainErrorFallback = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <div className="card p-4 bg-light">
        <div className="card-body">
          <h1>
            <FontAwesomeIcon icon={faFaceFrown} />
          </h1>
          <h1 className="card-title mb-4"> Ooops, algo ha fallado</h1>
          <Button
            className="mt-4"
            onClick={() => window.location.assign(window.location.origin)}
          >
            Volver a intentarlo
          </Button>
        </div>
      </div>
    </div>
  );
};
