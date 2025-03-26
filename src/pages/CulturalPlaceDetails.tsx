import { InfoCulturalPlaceProps } from "../common/interfaces";
import InfoCulturalPlace from "../components/InfoCulturalPlace";

  const culturalPlaceData: InfoCulturalPlaceProps = {
    title: "Catedral-Basílica de Nuestra Señora del Pilar",
    location: "Plaza del Pilar, s/n, Casco Antiguo, 50003 Zaragoza",
    rating: 5,
    totalReviews: 40637,
    ratingDistribution: {
      5: 40637,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
    timetable: "Abierto todos los días",
    description: "Basílica barroca con cúpulas con pinturas, una famosa capilla dedicada a la Virgen María y frescos de Goya.",
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
            username: "User Z",
            comment: "De nada! 😊",
            date: "hace 2 meses",
            replies: [],
            onReply: function (): void {
              throw new Error("Function not implemented.");
            },
            onDelete: function (): void {
              throw new Error("Function not implemented.");
            }
          },
        ],
      },
      {
        userId: 3,
        username: "User A",
        rating: 5,
        comment: "Me ha encantado!",
        date: "hace 2 días",
        replies: [],
      },
    ],
    onClose: () => null,
  };

function CulturalPlaceDetails() {
  return <InfoCulturalPlace {...culturalPlaceData} />;
}

export default CulturalPlaceDetails;
