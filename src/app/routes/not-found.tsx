import { Link } from "react-router";
import { paths } from "../../config/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";

const NotFoundRoute = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <div className="card p-4 bg-light">
        <div className="card-body">
          <h1 className="text-danger">
            <FontAwesomeIcon icon={faFaceFrown} />
          </h1>
          <h1 className="card-title text-danger">404 - Not Found</h1>
          <p className="card-text p-3">Lo siento, la página que busca no existe.</p>
          <Link
            to={paths.app.getHref()}
            replace
            className="btn btn-dark shadow rounded-pill"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundRoute;
