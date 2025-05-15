import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { paths } from "../../../config/paths";

const Unauthorized = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <div className="card p-4 bg-light shadow">
        <div className="card-body">
          <h1 className="card-title text-danger mb-3">
            <FontAwesomeIcon icon={faBan} /> Acceso denegado
          </h1>
          <p className="card-text mb-4">
            Lo sentimos, no tienes los permisos necesarios para ver esta página.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link
              to={paths.auth.login.getHref()}
              replace
              className="btn btn-dark shadow-sm rounded-pill px-4"
            >
              Iniciar sesión
            </Link>
            <Link
              to={paths.app.getHref()}
              replace
              className="btn btn-secondary shadow-sm rounded-pill px-4"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
