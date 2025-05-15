import { faLock, faMessage, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Link } from "react-router";
import { paths } from "../../config/paths";
import { usePutUser } from "../../features/users/api/put-user";

type UserCardProps = {
  userId: string;
  username: string;
  totalComments: number;
  deletedComments: number;
  isEnabled: boolean;
  className: string;
};

export const UserCard: FC<UserCardProps> = ({
  userId,
  username,
  totalComments,
  deletedComments,
  isEnabled,
  className = "",
}) => {
  const putUserMutation = usePutUser();

  const handleDisable = () => {
    Swal.fire({
      title: "¡ATENCIÓN!",
      text: `Se va a deshabilitar la cuenta del usuario ${username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Deshabilitar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger ms-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        putUserMutation.mutate(
          { id: userId, data: { active: !isEnabled } },
          {
            onSuccess: () => {
              Swal.fire(
                "Deshabilitado",
                "El usuario se ha deshabilitado.",
                "success"
              );
            },
            onError: (err) => {
              Swal.fire("Error", err.message, "error");
            },
          }
        );
      }
    });
  };

  const handleEnable = () => {
    Swal.fire({
      title: "¡ATENCIÓN!",
      text: `Se va a volver a habilitar la cuenta del usuario '${username}'`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Habilitar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-success ms-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        putUserMutation.mutate(
          { id: userId, data: { active: !isEnabled } },
          {
            onSuccess: () => {
              Swal.fire(
                "Habilitado",
                "El usuario se ha vuelto a habilitar.",
                "success"
              );
            },
            onError: (err) => {
              Swal.fire("Error", err.message, "error");
            },
          }
        );
      }
    });
  };

  return (
    <div
      className={`d-flex align-items-center flex-md-column flex-row text-start text-md-center p-3 ${className}`}
    >
      <div className="col">
        <h1>{username}</h1>
        <p className="m-0">{totalComments} comentarios</p>
        {deletedComments > 0 && (
          <p className="text-danger m-0">
            {deletedComments} comentarios eliminados
          </p>
        )}
      </div>
      <div className="col-6 col-md-5 d-flex flex-md-row flex-column gap-2 justify-content-center mt-3">
        {(totalComments > 0 || deletedComments > 0) && (
          <Link
            to={paths.app.comments.getHref(userId)}
            className="btn btn-dark px-0 px-md-3 shadow rounded-pill text-nowrap"
          >
            <FontAwesomeIcon icon={faMessage} /> Comentarios
          </Link>
        )}
        {isEnabled ? (
          <button
            className="btn btn-danger px-0 px-md-3 shadow rounded-pill text-nowrap"
            onClick={handleDisable}
          >
            <FontAwesomeIcon icon={faLock} /> Deshabilitar
          </button>
        ) : (
          <button
            className="btn btn-success px-0 px-md-3 shadow rounded-pill text-nowrap"
            onClick={handleEnable}
          >
            <FontAwesomeIcon icon={faUnlock} /> Habilitar
          </button>
        )}
      </div>
    </div>
  );
};
