import { Outlet, useLocation, useNavigate } from "react-router";
import { GoBackBtn } from "../../../components/ui/go-back-btn";
import SearchBar from "../../../components/ui/search-bar";
import { UserMenu } from "../../../components/ui/user-menu";
import { useState, useEffect, useMemo } from "react";
import { ChatCard } from "../../../features/chats/components/chat-card";
import { useGetChatsByUser } from "../../../features/chats/api/get-chats-by-user";
import { useUser } from "../../../lib/auth";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { paths } from "../../../config/paths";

function Chats() {
  const user = useUser();
  const {
    data: chats = [],
    isLoading,
    error,
  } = useGetChatsByUser(user.data!.id);

  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname;

    const segments = pathname.split("/");
    const idFromSplit = segments.length > 3 ? segments[3] : null;

    setSelectedChat(idFromSplit);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Filtrar chats según searchText
  const filteredChats = useMemo(
    () =>
      chats.filter((chat) =>
        chat.user.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [chats, searchText]
  );
  
  if (isLoading && !error) {
    return <LoadingIndicator message="Cargando chats..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los chats" />;
  }

  console.log(selectedChat);

  return (
    <div className="p-3 p-md-4">
      <div className={`row mb-4 ${selectedChat ? "d-none d-md-flex" : ""}`}>
        <div className="col h-100">
          <GoBackBtn onClick={() =>  navigate(selectedChat ? paths.app.chats.getHref() : paths.home.getHref())} />
        </div>
        <h1 className="col-8 text-center">Chats</h1>
        <UserMenu className="col text-end" />
      </div>
      <div className="row">
        <div
          className={`col-12 col-md-3 p-0 ${
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
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <ChatCard
                  key={chat.id}
                  username={chat.user.name}
                  to={`${chat.id}`}
                  active={selectedChat === chat.id}
                />
              ))
            ) : (
              <p className="text-center text-muted">No se encontraron chats</p>
            )}
          </div>
        </div>
        <div
          className={`col-12 col-md-9 p-0 ${
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
