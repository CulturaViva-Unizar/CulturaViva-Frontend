import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoBackBtn } from "../../../components/ui/go-back-btn";
import { useParams } from "react-router";
import { Message } from "../../../components/ui/message";
import { Key, useState } from "react";

function ChatConversation() {
  const { chatId } = useParams();

  const [messages] = useState([
    {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "12:00 PM | Aug 13",
      isOwn: false,
    },
    {
      message:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      time: "12:05 PM | Aug 13",
      isOwn: true,
    },
    {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "12:00 PM | Aug 13",
      isOwn: false,
    },
    {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "12:00 PM | Aug 13",
      isOwn: false,
    },
  ]);

  return (
    <div
      className="d-flex flex-column"
      style={{ maxHeight: "calc(100vh - 12%)" }}
    >
      <div className="row mb-4 pb-3 border-bottom">
        <div className="col h-100 d-flex d-md-none">
          <GoBackBtn />
        </div>
        <h2 className="col-10 col-md-12 text-center">User {chatId}</h2>
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-auto">
        {messages.map(
          (
            msg: { message: string; time: string; isOwn: boolean },
            index: Key | null | undefined
          ) => (
            <Message
              key={index}
              message={msg.message}
              dateTime={msg.time}
              isOwn={msg.isOwn}
            />
          )
        )}
      </div>
      <div
        className="d-flex align-items-center py-3 border-top"
        style={{ position: "absolute", bottom: 0 }}
      >
        <input
          type="text"
          className="form-control rounded-pill me-2"
          placeholder="Escribe..."
        />
        <button className="btn btn-light rounded-circle">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default ChatConversation;
