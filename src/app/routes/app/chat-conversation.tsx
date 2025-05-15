import { useState, FormEvent, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router";
import { useGetMessagesByChat } from "../../../features/chats/api/get-messages-by-chat";
import { useChat } from "../../../features/chats/hooks/useChat";
import { useUser } from "../../../lib/auth";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoBackBtn } from "../../../components/ui/go-back-btn";
import { Message } from "../../../components/ui/message";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";


function ChatConversation() {
  const { chatId } = useParams<{ chatId: string }>();
  const location = useLocation();
  const { username } = (location.state || {}) as { username?: string };

  // ─── Todos los hooks antes de cualquier return ───
  const { data: userData } = useUser();
  const userId = userData?.id;

  // hooks de datos (si chatId es falsy, quedan en estado “idle”)
  const {
    data: initialMessages = [],
    isLoading,
    isError,
    error,
  } = useGetMessagesByChat(chatId ?? "");

  const { messages: socketMessages, sendMessage } = useChat(chatId ?? "" );
  const endRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState("");
  const height = window.innerWidth < 768 ? "95vh" : "85vh";

  const allMessages = [...initialMessages, ...socketMessages].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setText("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);        // ← se ejecuta en cada cambio

  if (!chatId) {
    return <ErrorMessage message="Conversación no válida" />;
  }

  if (isLoading) {
    return <LoadingIndicator message="Cargando conversación..." />;
  };
  if (isError) {
    return <ErrorMessage message="Error al cargar la conversación" />;
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        height: height,
        position: "relative",
      }}
    >
      {/* Header */}
      <div className="row">
        <div className="col h-100 d-flex d-md-none">
          <GoBackBtn />
        </div>
        <h2 className="col-10 col-md-12 text-center">Chat {username}</h2>
      </div>

      {/* Mensajes */}
      <div className="flex-grow-1 d-flex flex-column overflow-auto p-3 bg-light border">
        {allMessages.map((msg) => (
          <Message
            key={msg.id}
            message={msg.text}
            dateTime={new Date(msg.timestamp).toLocaleString([], {hour: '2-digit', minute:'2-digit', day: '2-digit', month: '2-digit', year: '2-digit'})}
            isOwn={msg.user === userId}
          />
        ))}
        {/* ancla invisible */}
        <div ref={endRef} />
      </div>

      {/* Formulario de envío */}
      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-center p-3"

      >
        <input
          type="text"
          className="form-control rounded-pill me-2 shadow"
          placeholder="Escribe..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-dark rounded-circle shadow">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default ChatConversation;
