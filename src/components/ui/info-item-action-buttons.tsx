import { FC } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useUser } from "../../lib/auth";
import { useCreateBookmark } from "../../features/bookmarks/api/create-bookmark";
import { useDeleteBookmark } from "../../features/bookmarks/api/delete-bookmark";
import { CreateBookmarkRequest } from "../../types/api";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router";
import { paths } from "../../config/paths";
import { extractLastUrl } from "../../utils/url";

type InfoItemActionButtonsProps = {
  itemId: string;
  isSaved: boolean;
  isLoading: boolean;
  mapsUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
};

const InfoItemActionButtons: FC<InfoItemActionButtonsProps> = ({
  itemId,
  isSaved,
  isLoading,
  mapsUrl,
  instagramUrl,
  twitterUrl,
}) => {
  const userId = useUser().data?.id;
  const navigate = useNavigate();

  const createBookmarkMutation = useCreateBookmark();
  const deleteBookmarkMutation = useDeleteBookmark();

  const deleteBookmark = () => {
    deleteBookmarkMutation.mutate(
      { userId: userId!, eventId: itemId },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Desmarcado",
            text: "Se ha eliminado de tus Guardados.",
            icon: "success",
            timer: 1500
          });
        },
        onError: (err) => {
          Swal.fire("Error", err.message, "error");
        },
      }
    );
  };

  const addBookmark = async () => {
    const createBookmarkRequest: CreateBookmarkRequest = {
      eventId: itemId,
    };
    try {
      await createBookmarkMutation.mutateAsync({
        userId: userId!,
        data: createBookmarkRequest,
      });
      Swal.fire({
        title: "¡Guardado!",
        text: "Puedes verlo en tus Guardados.",
        icon: "success",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Ir a Guardados",
        cancelButtonText: "Revisar más tarde",
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(paths.app.bookmarks.getHref());
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire("Error", err, "error");
    }
  };

  const toggleSaveBookmark = () => {
    if (isSaved) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Ya no lo verás en tus Guardados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, desmarcar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteBookmark();
        }
      });
    } else {
      addBookmark();
    }
  };

  return (
    <div
      className="row flex-nowrap overflow-x-auto hide-scrollbar gap-2 gx-2 py-3"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {userId && (
        <Button
          className={`btn rounded-pill w-auto ${
            isSaved ? "btn-dark" : "btn-light"
          }`}
          onClick={toggleSaveBookmark}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faBookmark} className="me-2" />
          {isLoading ? "Cargando..." : isSaved ? "Dejar de guardar" : "Guardar"}
        </Button>
      )}

      {mapsUrl && (
        <Button
          as="a"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light rounded-pill w-auto"
        >
          <FontAwesomeIcon icon={faLocationArrow} className="me-2" />
          Cómo llegar
        </Button>
      )}

      {instagramUrl && (
        <Button
          as="a"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light rounded-circle w-auto"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Button>
      )}

      {twitterUrl && (
        <Button
          as="a"
          href={extractLastUrl(twitterUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light rounded-circle w-auto"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Button>
      )}
    </div>
  );
};

export default InfoItemActionButtons;
