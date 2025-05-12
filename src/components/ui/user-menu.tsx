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
  faUsers,
  faChartLine,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogout, useUser } from "../../lib/auth";
import { paths } from "../../config/paths";

interface UserMenuProps {
  className?: string;
}

export const UserMenu: FC<UserMenuProps> = ({ className = "" }) => {
  const [isOpenEventos, setIsOpenEventos] = useState(false);
  const [isOpenLugares, setIsOpenLugares] = useState(false);
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate(undefined);
    navigate(paths.app.getHref());
  };

  const handleLogin = () => {
    logout.mutate(undefined);
    navigate(paths.auth.login.getHref());
  };

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn rounded-circle p-0 h-100 bg-white border-0"
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
            ¡Hola {user.data?.name || "User"}!
          </span>
        </li>
        <li>
          <hr className="dropdown-divider mx-3" />
        </li>
        {user.data && (
          <>
            <li>
              <Link
                to={paths.app.chats.getHref()}
                className="dropdown-item py-2 btn"
              >
                <FontAwesomeIcon icon={faComments} className="col-1 me-2" />
                <span className="col">Chats</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link
                to={paths.app.bookmarks.getHref()}
                className="dropdown-item py-2 btn"
              >
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
            {user.data?.admin && (
              <>
                <li>
                  <hr className="dropdown-divider mx-3" />
                </li>
                <li>
                  <Link
                    to={paths.app.events.getHref()}
                    className="dropdown-item py-2 btn"
                  >
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
                to={paths.app.events.suggested.getHref()}
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
                to={paths.app.events.popular.getHref()}
                className="dropdown-item py-2 btn"
              >
                <FontAwesomeIcon icon={faFire} className="col-1 me-2" />
                <span className="col">Populares</span>
              </Link>
            </li>
            {user.data && (
              <>
                <li>
                  <hr className="dropdown-divider mx-3" />
                </li>
                <li>
                  <Link
                    to={paths.app.events.assisted.getHref()}
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
                    to={paths.app.events.upcoming.getHref()}
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
            {user.data?.admin && (
              <>
                <li>
                  <Link
                    to={paths.app.culturalPlaces.getHref()}
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
                to={paths.app.culturalPlaces.suggested.getHref()}
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
                to={paths.app.culturalPlaces.popular.getHref()}
                className="dropdown-item py-2 btn"
              >
                <FontAwesomeIcon icon={faFire} className="col-1 me-2" />
                <span className="col">Populares</span>
              </Link>
            </li>
          </ul>
        </div>
        {user.data?.admin && (
          <>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link
                to={paths.app.users.getHref()}
                className="dropdown-item py-2 btn"
              >
                <FontAwesomeIcon icon={faUsers} className="col-1 me-2" />
                <span className="col">Usuarios</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider mx-3" />
            </li>
            <li>
              <Link
                to={paths.app.analytics.getHref()}
                className="dropdown-item py-2 btn"
              >
                <FontAwesomeIcon icon={faChartLine} className="col-1 me-2" />
                <span className="col">Analíticas</span>
              </Link>
            </li>
          </>
        )}
        <li>
          <hr className="dropdown-divider mx-3" />
        </li>
        {user.data ? (
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
