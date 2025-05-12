import { useState, FormEvent } from "react";
import { useParams } from "react-router";
import { useGetMessagesByChat } from "../../../features/chats/api/get-messages-by-chat";
import { useChat } from "../../../features/chats/hooks/useChat";
import { useUser } from "../../../lib/auth";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoBackBtn } from "../../../components/ui/go-back-btn";
import { Message } from "../../../components/ui/message";


function ChatConversation() {
  const { chatId } = useParams<{ chatId: string }>();

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

  const [text, setText] = useState("");

  if (!chatId) {
    return <p>Chat no válido</p>;
  }

  if (isLoading) return <p>Cargando mensajes…</p>;
  if (isError) return <p>Error: {error.message}</p>;

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

  const height = window.innerWidth < 768 ? "95vh" : "82vh";

  return (
    <div
      className="d-flex flex-column"
      style={{
        height: height,
        position: "relative",
      }}
    >
      {/* Header */}
      <div className="row mb-4 pb-3 border-bottom">
        <div className="col h-100 d-flex d-md-none">
          <GoBackBtn />
        </div>
        <h2 className="col-10 col-md-12 text-center">Chat {chatId}</h2>
      </div>

      {/* Mensajes */}
      <div className="flex-grow-1 d-flex flex-column overflow-auto px-3">
        {allMessages.map((msg) => (
          <Message
            key={msg.id}
            message={msg.text}
            dateTime={new Date(msg.timestamp).toLocaleString()}
            isOwn={msg.user === userId}
          />
        ))}
      </div>

      {/* Formulario de envío */}
      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-center py-3 border-top"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "0 1rem",
          background: "white",
        }}
      >
        <input
          type="text"
          className="form-control rounded-pill me-2"
          placeholder="Escribe..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-light rounded-circle">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default ChatConversation;
