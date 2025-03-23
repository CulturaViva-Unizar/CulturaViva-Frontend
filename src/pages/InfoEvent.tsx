import Swal from "sweetalert2";
import {
  faStar,
  faLocationArrow,
  faShareAlt,
  faPlus,
  faMinus,
  faBookmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Rating } from "../components/Rating";
import { useState } from "react";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Review } from "../components/Review";
import { Select } from "../components/Select";

const simulatedData = {
  image:
    "https://www.zaragoza.es/cont/paginas/actividades/imagen/2360.png_1070x713.png",
  title: "Regálame esta noche. Albena Teatro",
  location: "Teatro de las Esquinas",
  rating: 4.1,
  totalReviews: 116,
  ratingDistribution: {
    5: 30,
    4: 80,
    3: 5,
    2: 1,
    1: 0,
  },
  date: "18/06/2025",
  description:
    "Dos viejos amantes se reencuentran después de más de veinticinco años. Una comedia romántica para preguntarnos con quién desearíamos pasar la última noche de nuestra vida.",
  price: 20,
  organizer: "Ayuntamiento de Zaragoza",
  attendees: 45,
  facebook: "facebook",
  instagram: "instagram",
  twitter: "twitter",
  reviews: [
    {
      userId: 1,
      user: "User X",
      rating: 3,
      comment: "Gracias por tu reseña!",
      date: "hace 3 meses",
      replies: [
        {
          userId: 2,
          user: "User Z",
          comment: "De nada! 😊",
          date: "hace 2 meses",
        },
      ],
    },
    {
      userId: 3,
      user: "User A",
      rating: 5,
      comment: "Me ha encantado!",
      date: "hace 2 días",
      replies: [],
    },
  ],
};

function InfoEvent() {
  const [isAttending, setIsAttending] = useState(false);
  const [attendees, setAttendees] = useState(simulatedData.attendees);
  const [saved, setSaved] = useState(false);
  const [reviews, setReviews] = useState(simulatedData.reviews);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleAttendance = () => {
    if (isAttending) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Dejarás de asistir a esta exposición.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, dejar de asistir",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsAttending(false);
          setAttendees((prev) => prev - 1);
        }
      });
    } else {
      setIsAttending(true);
      setAttendees((prev) => prev + 1);
      Swal.fire({
        title: "¡Asistencia confirmada!",
        text: "Has confirmado tu asistencia a esta exposición.",
        icon: "success",
      });
    }
  };

  const handleSaveEvent = () => {
    if (saved) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Ya no tendrás el evento en tus Guardados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, desmarcar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setSaved(false);
        }
      });
    } else {
      setSaved(true);
      Swal.fire({
        title: "¡Evento guardado!",
        text: "Puedes verlo en tus Guardados.",
        icon: "success",
      });
    }
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleReviewSubmit = () => {
    if (rating === 0) {
      Swal.fire("Error", "La reseña debe tener una puntuación.", "error");
      return;
    }

    const newReview = {
      userId: 0,
      user: "Tú",
      rating,
      comment,
      date: "hace un momento",
      replies: [],
    };

    setReviews([...reviews, newReview]);
    setRating(0);
    setComment("");
    Swal.fire("¡Gracias!", "Tu reseña ha sido añadida.", "success");
  };

  return (
    <div className="p-3">
      <div className="d-flex flex-row-reverse mb-2 gap-2">
        <Button className="btn btn-light rounded-circle">
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Button className="btn btn-light rounded-circle">
          <FontAwesomeIcon icon={faShareAlt} />
        </Button>
      </div>
      <div className="row g-3 mb-4">
        {simulatedData.image && (
          <div className="col-4 col-md-3">
            <img
              src={simulatedData.image}
              className="img-fluid rounded h-100 object-fit-cover"
              alt={simulatedData.title}
            />
          </div>
        )}
        <div className="col">
          <div>
            <h2>{simulatedData.title}</h2>
            <p className="text-muted mb-0">{simulatedData.location}</p>
            <div className="d-flex align-items-center gap-1 mb-2">
              <p className="text-muted mb-0">{simulatedData.rating}</p>
              <FontAwesomeIcon icon={faStar} color="gold" />
              <p className="text-muted mb-0">({simulatedData.totalReviews})</p>
            </div>
            <p className="mb-0">{simulatedData.date}</p>
            <p className="mb-0">{simulatedData.price} €</p>
            <p>Organizado por: {simulatedData.organizer}</p>
          </div>
        </div>
      </div>
      <Button
        variant={isAttending ? "danger" : "success"}
        className="w-100 mb-3 rounded-pill"
        onClick={handleAttendance}
      >
        <FontAwesomeIcon
          icon={isAttending ? faMinus : faPlus}
          className="me-2"
        />
        {isAttending ? "Dejar de asistir" : "Voy a asistir"} ({attendees})
      </Button>
      <div
        className="row flex-nowrap overflow-x-auto hide-scrollbar gap-2 gx-2 py-1"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <Button
          className={`btn rounded-pill w-auto ${
            saved ? "btn-dark" : "btn-light"
          }`}
          onClick={handleSaveEvent}
        >
          <FontAwesomeIcon icon={faBookmark} className="me-2" />
          {saved ? <span>Dejar de guardar</span> : <span>Guardar</span>}
        </Button>
        <Button className="btn btn-light rounded-pill w-auto">
          <FontAwesomeIcon icon={faLocationArrow} className="me-2" /> Cómo llegar
        </Button>
        {simulatedData.facebook && (
          <Button className="btn btn-light rounded-circle w-auto">
            <FontAwesomeIcon icon={faFacebook} />
          </Button>
        )}
        {simulatedData.instagram && (
          <Button className="btn btn-light rounded-circle w-auto">
            <FontAwesomeIcon icon={faInstagram} />
          </Button>
        )}
        {simulatedData.twitter && (
          <Button className="btn btn-light rounded-circle w-auto">
            <FontAwesomeIcon icon={faTwitter} />
          </Button>
        )}
      </div>
      <p>{simulatedData.description}</p>
      <hr />
      <Rating
        rating={simulatedData.rating}
        totalReviews={simulatedData.totalReviews}
        ratingDistribution={simulatedData.ratingDistribution}
      />
      <hr />
      <div className="d-flex">
        <div className="col-3">
          <strong>Valorar y escribir una reseña:</strong>
        </div>
        <div className="col-9 ps-4">
          <div className="mb-2">
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                color={index < rating ? "gold" : "gray"}
                onClick={() => handleStarClick(index)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
          <div className="mb-3">
            <label className="form-label">Comentario (opcional)</label>
            <textarea
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <Button
            className="btn btn-light rounded-pill w-auto"
            onClick={handleReviewSubmit}
          >
            Enviar
          </Button>
        </div>
      </div>
      <hr />
      <div className="d-flex gap-3 mb-3">
        <Select
          options={[
            { value: "ordenar", label: "Ordenar" },
            { value: "masRecientes", label: "Más Recientes" },
            { value: "menosRecientes", label: "Menos Recientes" },
            { value: "mayorPuntuacion", label: "Mayor Puntuación" },
            { value: "menorPuntuacion", label: "Menor Puntuación" },
          ]}
          initialValue="ordenar"
          onChange={(newValue) => console.log(newValue)}
        />
        <Select
          options={[
            { value: "filtrar", label: "Filtrar" },
            { value: "5", label: "5 estrellas" },
            { value: "4", label: "4 estrellas" },
            { value: "3", label: "3 estrellas" },
            { value: "2", label: "2 estrellas" },
            { value: "1", label: "1 estrellas" },
          ]}
          initialValue="filtrar"
          onChange={(newValue) => console.log(newValue)}
        />
      </div>
      {reviews.map((review) => (
        <Review
          userId={review.userId}
          user={review.user}
          rating={review.rating}
          comment={review.comment}
          date={review.date}
          replies={review.replies}
        />
      ))}
    </div>
  );
}

export default InfoEvent;
