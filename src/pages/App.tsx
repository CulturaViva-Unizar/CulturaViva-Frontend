import SearchBar from "../components/SearchBar";
import { Select } from "../components/Select";
import { UserMenu } from "../components/UserMenu";
import { Range } from "../components/Range";
import { DatePicker } from "../components/DatePicker";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Drawer } from "../components/Drawer";
import InfoEvent from "../components/InfoEvent";
import { Card } from "../components/Card";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoEventProps } from "../common/interfaces";

function App() {
  const [showEventDrawer, setShowEventDrawer] = useState(false);
  const [showEventListDrawer, setShowEventListDrawer] = useState(false);

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
    onClose: () => setShowEventDrawer(false),
  };

  return (
    <div className="gx-0">
      <nav className="row p-3 px-md-5 py-md-4 gap-2 m-0">
        <div className="row col-10 col-md-3 order-1">
          <SearchBar />
        </div>
        <div
          className="row col-12 col-md flex-nowrap overflow-x-auto hide-scrollbar gap-2 gx-2 py-1 order-3 order-md-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <Select
            className="col"
            options={[
              { value: "todos", label: "Todos" },
              { value: "eventos", label: "Eventos" },
              { value: "lugares", label: "Lugares" },
            ]}
            initialValue="todos"
            onChange={(newValue) => console.log(newValue)}
          />
          <Select
            className="col"
            options={[
              { value: "categoria", label: "Categoría" },
              { value: "arte", label: "Arte" },
              { value: "ocio", label: "Ocio" },
            ]}
            initialValue="categoria"
            onChange={(newValue) => console.log(newValue)}
          />
          <Range className="col" hideWhenMaxValue={true} initialValue={100} />
          <DatePicker className="col" />
        </div>
        <UserMenu className="col-2 col-md text-end order-2 order-md-3" />
      </nav>
      <div className="d-flex justify-content-center gap-3">
        <div>
          <Button onClick={() => setShowEventDrawer(true)}>Evento</Button>
          <Drawer
            show={showEventDrawer}
            onClose={() => setShowEventDrawer(false)}
          >
            <InfoEvent
              {...eventData}
              onClose={() => setShowEventDrawer(false)}
            />
          </Drawer>
        </div>
        <div>
          <Button onClick={() => setShowEventListDrawer(true)}>
            Lista eventos
          </Button>
          <Drawer
            show={showEventListDrawer}
            onClose={() => setShowEventListDrawer(false)}
          >
            <div className="d-flex flex-row-reverse mb-2 gap-2">
              <Button
                className="btn btn-light rounded-circle"
                onClick={() => setShowEventListDrawer(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </div>
            {[...Array(10)].map((_, index) => (
              <div className="mb-3" key={index}>
                <Card
                  image={eventData.image}
                  title={eventData.title}
                  location={eventData.location}
                  rating={eventData.rating}
                  reviews={eventData.reviewsInit.length}
                  description={eventData.description}
                  className="rounded bg-light shadow"
                />
              </div>
            ))}
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default App;
