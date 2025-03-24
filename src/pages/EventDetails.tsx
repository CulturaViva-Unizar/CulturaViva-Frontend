import { useParams } from "react-router";
import InfoEvent from "../components/InfoEvent";
import { InfoEventProps } from "../common/interfaces";

const eventData: InfoEventProps = {
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
  attendeesInit: 45,
  facebook: "facebook",
  instagram: "instagram",
  twitter: "twitter",
  reviewsInit: [
    {
      userId: 1,
      username: "User X",
      rating: 3,
      comment: "Gracias por tu reseña!",
      date: "hace 3 meses",
      replies: [
        {
          userId: 2,
          user: "User Z",
          comment: "De nada! 😊",
          date: "hace 2 meses",
          replies: [],
        },
      ],
      map: function (): React.ReactNode {
        throw new Error("Function not implemented.");
      },
    },
    {
      userId: 3,
      username: "User A",
      rating: 5,
      comment: "Me ha encantado!",
      date: "hace 2 días",
      replies: [],
      map: function (): React.ReactNode {
        throw new Error("Function not implemented.");
      },
    },
  ],
  onClose: () => null,
};

function EventDetails() {
  const { eventId } = useParams();

  return <InfoEvent {...eventData} />;
}

export default EventDetails;
