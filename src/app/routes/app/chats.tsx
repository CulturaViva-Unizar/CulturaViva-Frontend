import { Outlet, useLocation } from "react-router";
import { GoBackBtn } from "../../../components/ui/go-back-btn";
import SearchBar from "../../../components/ui/search-bar";
import { UserMenu } from "../../../components/ui/user-menu";
import { useState, useEffect } from "react";
import { ChatCard } from "../../../components/ui/chat-card";

function Chats() {
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState(false);

  useEffect(() => {
    setSelectedChat(location.pathname !== "/chats");

    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="p-3 p-md-4">
      <div className={`row mb-4 ${selectedChat ? "d-none d-md-flex" : ""}`}>
        <div className="col h-100">
          <GoBackBtn />
        </div>
        <h1 className="col-8 text-center">Chats</h1>
        <UserMenu className="col text-end" />
      </div>
      <div className="row">
        <div
          className={`col-12 col-md-3 ${
            selectedChat ? "d-none d-md-block" : ""
          }`}
        >
          <div className="mb-3">
            <SearchBar />
          </div>
          <div
            className="overflow-auto hide-scrollbar"
            style={{ maxHeight: "calc(100vh - 12%)" }}
          >
            {[...Array(24)].map((_, i) => (
              <ChatCard
                key={i}
                username={`User ${i}`}
                lastMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                date="Hace 27 días"
                unreadMessages={3}
                to={`${i}`}
              />
            ))}
          </div>
        </div>
        <div
          className={`col-12 col-md-9 ${
            !selectedChat ? "d-none d-md-block" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Chats;
