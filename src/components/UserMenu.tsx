import { faCircleUser, faComments, faBookmark, faCalendarDays, faChevronUp, faChevronDown, faThumbsUp, faFire, faCheckCircle, faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='dropdown col-2 col-md text-end order-2 order-md-3'>
            <button className='btn rounded-circle p-0 h-100' type='button' data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faCircleUser} className='h-100' />
            </button>
            <ul className="dropdown-menu px-3 py-4 mt-3" style={{ minWidth: '300px' }}>
                <li>
                    <span className='fs-5 fw-bold px-3'>¡Hola User!</span>
                </li>
                <li><hr className="dropdown-divider mx-3" /></li>
                <li>
                    <button className="dropdown-item py-2 btn" type="button">
                        <FontAwesomeIcon icon={faComments} className='col-1 me-2' />
                        <span className='col'>Chats</span>
                    </button>
                </li>
                <li><hr className="dropdown-divider mx-3" /></li>
                <li>
                    <button className="dropdown-item py-2 btn" type="button">
                        <FontAwesomeIcon icon={faBookmark} className='col-1 me-2' />
                        <span className='col'>Guardados</span>
                    </button>
                </li>
                <li><hr className="dropdown-divider mx-3" /></li>

                {/* Botón de Eventos con Collapse (Evita el cierre del dropdown) */}
                <li>
                    <button
                        className="dropdown-item py-2 d-flex justify-content-between align-items-center btn"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#eventosCollapse"
                        aria-expanded={isOpen}
                        aria-controls="eventosCollapse"
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que el dropdown se cierre
                            setIsOpen(!isOpen);
                        }}
                    >
                        <FontAwesomeIcon icon={faCalendarDays} className='col-1 me-2' />
                        <span className='col'>Eventos</span>
                        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                    </button>
                </li>

                {/* Contenedor del Collapse (Evita el cierre del dropdown) */}
                <div className="collapse px-3" id="eventosCollapse" onClick={(e) => e.stopPropagation()}>
                    <ul className="list-unstyled">
                        <li><hr className="dropdown-divider mx-3" /></li>
                        <li>
                            <button className="dropdown-item py-2 btn" type="button">
                                <FontAwesomeIcon icon={faThumbsUp} className="col-1 me-2" />
                                <span className='col'>Recomendaciones</span>
                            </button>
                        </li>
                        <li><hr className="dropdown-divider mx-3" /></li>
                        <li>
                            <button className="dropdown-item py-2 btn" type="button">
                                <FontAwesomeIcon icon={faFire} className="col-1 me-2" />
                                <span className='col'>Populares</span>
                            </button>
                        </li>
                        <li><hr className="dropdown-divider mx-3" /></li>
                        <li>
                            <button className="dropdown-item py-2 btn" type="button">
                                <FontAwesomeIcon icon={faCheckCircle} className="col-1 me-2" />
                                <span className='col'>Asistidos</span>
                            </button>
                        </li>
                        <li><hr className="dropdown-divider mx-3" /></li>
                        <li>
                            <button className="dropdown-item py-2 btn" type="button">
                                <FontAwesomeIcon icon={faClock} className="col-1 me-2" />
                                <span className='col'>Próximos</span>
                            </button>
                        </li>
                    </ul>
                </div>

                <li><hr className="dropdown-divider mx-3" /></li>
                <li className='text-center mt-4 mb-3'>
                    <button className="btn btn-outline-dark rounded-5 px-4 btn" type="button">
                        Cerrar sesión
                    </button>
                </li>
                <li className='text-center'>
                    <button className="dropdown-item text-danger btn" type="button">
                        <FontAwesomeIcon icon={faTrash} className='me-2' />
                        Eliminar cuenta
                    </button>
                </li>
            </ul>
        </div>
    );
};
