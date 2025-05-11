import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { paths } from "../../../config/paths";

const Unauthorized = () => {  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <div className="card p-4 bg-light">
        <div className="card-body">
          <h1 className="card-title text-danger">
            <FontAwesomeIcon icon={faBan} /> Acceso denegado
          </h1>
          <p className="card-text p-3">
            No tienes permiso para acceder a esta página.
          </p>
          <Link to={paths.app.getHref()} replace className="btn btn-dark shadow-sm rounded-pill">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
