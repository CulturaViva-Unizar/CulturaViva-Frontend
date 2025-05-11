import { Outlet, useLocation } from "react-router";
import { GoBackBtn } from "../../../components/ui/go-back-btn";
import SearchBar from "../../../components/ui/search-bar";
import { UserMenu } from "../../../components/ui/user-menu";
import { useState, useEffect } from "react";
import { ChatCard } from "../../../components/ui/chat-card";
import { useGetChatsByUser } from "../../../features/chats/api/get-chats-by-user";
import { useUser } from "../../../lib/auth";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";

function Chats() {
  const user = useUser();
  const {
    data: chats = [],
    isLoading,
    error,
  } = useGetChatsByUser(user.data!.id);
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setSelectedChat(location.pathname !== "/chats");

    window.scrollTo(0, 0);
  }, [location]);

  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando chats..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los chats" />;
  }

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
            <SearchBar
              value={searchText}
              onSearch={setSearchText}
              className="shadow rounded-pill"
            />
          </div>
          <div
            className="overflow-auto hide-scrollbar"
            style={{ maxHeight: "calc(100vh - 12%)" }}
          >
            {chats.map((chat, i) => {
              const userChat = chat.user1 == user.data!.id ? chat.user2 : chat.user1;
              return (
                <ChatCard
                  key={i}
                  username={`User ${userChat}`}
                  lastMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  date={chat.updatedAt}
                  unreadMessages={3}
                  to={`${chat.id}`}
                />
              );
            })}
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
