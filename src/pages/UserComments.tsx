import { useParams } from "react-router";
import SearchBar from "../components/SearchBar";
import MainLayout from "../layouts/MainLayout";
import { CommentCard } from "../components/CommentCard";

function UserComments() {
  const { userId } = useParams();

  return (
    <MainLayout title={`Comentarios de User ${userId}`}>
      <div className="mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center">
        <div className="col-12 col-md-5">
          <SearchBar />
        </div>
      </div>
      {[...Array(9)].map((_, i) => (
        <div key={i}>
          <CommentCard
            item="Regálame esta noche. Albena Teatro"
            rating={4.1}
            date="hace dos semanas"
            comment="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <hr />
        </div>
      ))}
    </MainLayout>
  );
}

export default UserComments;
