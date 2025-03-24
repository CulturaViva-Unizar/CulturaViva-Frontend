import {
  faCircleUser,
  faComments,
  faBookmark,
  faCalendarDays,
  faChevronUp,
  faChevronDown,
  faThumbsUp,
  faFire,
  faCheckCircle,
  faClock,
  faTrash,
  faUsers,
  faChartLine,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ADMIN_ROLE, USER_ROLE } from "../common/constants";
import Swal from "sweetalert2";

interface UserMenuProps {
  className?: string;
}

export const UserMenu: FC<UserMenuProps> = ({ className = "" }) => {
  const [isOpenEventos, setIsOpenEventos] = useState(false);
  const [isOpenLugares, setIsOpenLugares] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "¡Su cuenta va a ser eliminada!",
      text: "¿Está seguro? Esta acción es irreversible y una vez se realice no se podrá deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire({
          title: "Eliminada!",
          text: "Su cuenta ha sido eliminada.",
          icon: "success",
        });
      }
    });
  };

  const handleLogin = () => {
    logout();
    navigate("/inicio-sesion");
  };

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn rounded-circle p-0 h-100"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon icon={faCircleUser} className="h-100" />
      </button>
      <ul
        className="dropdown-menu px-3 py-4 mt-3"
        style={{ minWidth: "300px" }}
      >
        <li>
          <span className="fs-5 fw-bold px-3">
            ¡Hola {user?.username || "User"}!
          </span>
        </li>
        <li>
          <hr className="dropdown-divider mx-3" />
        </li>
        {(user?.role == USER_ROLE || user?.role == ADMIN_ROLE) && (
          <>
            <li>
              <Link to="/chats" className="dropdown-item py-2 btn">
                <FontAwesomeIcon icon={faComments} className="col-1 me-2" />
                <span className="col">Chats</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link to="/guardados" className="dropdown-item py-2 btn">
                <FontAwesomeIcon icon={faBookmark} className="col-1 me-2" />
                <span className="col">Guardados</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
          </>
        )}
        <li>
          <button
            className="dropdown-item py-2 d-flex justify-content-between align-items-center btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#eventosCollapse"
            aria-expanded={isOpenEventos}
            aria-controls="eventosCollapse"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenEventos(!isOpenEventos);
            }}
          >
            <FontAwesomeIcon icon={faCalendarDays} className="col-1 me-2" />
            <span className="col">Eventos</span>
            <FontAwesomeIcon
              icon={isOpenEventos ? faChevronUp : faChevronDown}
            />
          </button>
        </li>
        <div
          className="collapse px-3"
          id="eventosCollapse"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="list-unstyled">
            {user?.role === ADMIN_ROLE && (
              <>
                <li>
                  <hr className="dropdown-divider mx-3" />
                </li>
                <li>
                  <Link to="/eventos" className="dropdown-item py-2 btn">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="col-1 me-2"
                    />
                    <span className="col">Todos los eventos</span>
                  </Link>
                </li>
              </>
            )}
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link
                to="/eventos/recomendados"
                className="dropdown-item py-2 btn"
              >
                <FontAwesomeIcon icon={faThumbsUp} className="col-1 me-2" />
                <span className="col">Recomendaciones</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link to="/eventos/populares" className="dropdown-item py-2 btn">
                <FontAwesomeIcon icon={faFire} className="col-1 me-2" />
                <span className="col">Populares</span>
              </Link>
            </li>
            {(user?.role == USER_ROLE || user?.role == ADMIN_ROLE) && (
              <>
                <li>
                  <hr className="dropdown-divider mx-3" />
                </li>
                <li>
                  <Link
                    to="/eventos/asistidos"
                    className="dropdown-item py-2 btn"
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="col-1 me-2"
                    />
                    <span className="col">Asistidos</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider mx-3" />
                </li>
                <li>
                  <Link
                    to="/eventos/proximos"
                    className="dropdown-item py-2 btn"
                  >
                    <FontAwesomeIcon icon={faClock} className="col-1 me-2" />
                    <span className="col">Próximos</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <li>
          <hr className="dropdown-divider mx-3" />
        </li>
        <li>
          <button
            className="dropdown-item py-2 d-flex justify-content-between align-items-center btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#lugaresCollapse"
            aria-expanded={isOpenLugares}
            aria-controls="lugaresCollapse"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenLugares(!isOpenLugares);
            }}
          >
            <FontAwesomeIcon icon={faLandmark} className="col-1 me-2" />
            <span className="col">Lugares culturales</span>
            <FontAwesomeIcon
              icon={isOpenLugares ? faChevronUp : faChevronDown}
            />
          </button>
        </li>
        <div
          className="collapse px-3"
          id="lugaresCollapse"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="list-unstyled">
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            {user?.role === ADMIN_ROLE && (
              <>
                <li>
                  <Link
                    to="/lugares-culturales"
                    className="dropdown-item py-2 btn"
                  >
                    <FontAwesomeIcon icon={faLandmark} className="col-1 me-2" />
                    <span className="col">Todos los lugares culturales</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider mx-3" />
                </li>
              </>
            )}
            <li>
              <Link
                to="/lugares-culturales/recomendados"
                className="dropdown-item py-2 btn"
              >
                <FontAwesomeIcon icon={faThumbsUp} className="col-1 me-2" />
                <span className="col">Recomendaciones</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link
                to="/lugares-culturales/populares"
                className="dropdown-item py-2 btn"
              >
                <FontAwesomeIcon icon={faFire} className="col-1 me-2" />
                <span className="col">Populares</span>
              </Link>
            </li>
          </ul>
        </div>
        {user?.role === ADMIN_ROLE && (
          <>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link to="/users" className="dropdown-item py-2 btn">
                <FontAwesomeIcon icon={faUsers} className="col-1 me-2" />
                <span className="col">Usuarios</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link to="/analiticas" className="dropdown-item py-2 btn">
                <FontAwesomeIcon icon={faChartLine} className="col-1 me-2" />
                <span className="col">Analíticas</span>
              </Link>
            </li>
          </>
        )}
        <li>
          <hr className="dropdown-divider mx-3" />
        </li>
        {user?.role == USER_ROLE || user?.role == ADMIN_ROLE ? (
          <>
            <li className="text-center mt-4 mb-3">
              <button
                className="btn btn-outline-dark rounded-5 px-4"
                type="button"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </li>
            <li className="text-center">
              <button
                className="dropdown-item text-danger btn"
                type="button"
                onClick={handleDeleteAccount}
              >
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                Eliminar cuenta
              </button>
            </li>
          </>
        ) : (
          <li className="text-center mt-4 mb-3">
            <button
              className="btn btn-outline-dark rounded-5 px-4"
              type="button"
              onClick={handleLogin}
            >
              Iniciar sesión
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
