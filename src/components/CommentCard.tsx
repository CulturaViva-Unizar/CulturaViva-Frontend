import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { RatingStars } from "./RatingStars";

interface CommentCardProps {
  item: string;
  rating: number;
  date: string;
  comment: string;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  item,
  rating = 0,
  comment,
  date,
}) => {
  const handleDeleteComment = () => {
    Swal.fire({
      title: "¡ATENCIÓN!",
      html: `
        <p>Se va a eliminar un comentario del evento ${item}</p>
        <select id="reasonSelect" class="form-select mt-3">
          <option value="">Motivo</option>
          <option value="razon1">Razón 1</option>
          <option value="razon2">Razón 2</option>
          <option value="razon3">Razón 3</option>
        </select>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger ms-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
      preConfirm: () => {
        const selectElement = document.getElementById(
          "reasonSelect"
        ) as HTMLSelectElement;
        const selectedValue = selectElement.value;
        if (!selectedValue) {
          Swal.showValidationMessage("Por favor, selecciona un motivo");
        }
        return { reason: selectedValue };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: "El comentario ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between gap-2">
        <h2>{item}</h2>
        <button
          className="btn btn-sm btn-danger rounded-circle"
          onClick={() => handleDeleteComment()}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="mb-2">
        <RatingStars rating={rating} />
        <span className="text-muted ms-2">{date}</span>
      </div>
      <p>{comment}</p>
    </>
  );
};
