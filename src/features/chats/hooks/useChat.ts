// src/hooks/useChat.ts
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "../../../lib/auth";
import { ChatMessage } from "../types/models";

type SocketChatMessage = {
  _id: string;
  chat: string;
  user: string;
  text: string;
  timestamp: string;
};

function socketToChatMessage(msg: SocketChatMessage): ChatMessage {
  return {
    _id: msg._id,
    text: msg.text,
    timestamp: msg.timestamp,
    user: msg.user,
  };
}

export type UseChatResult = {
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
};

export function useChat(chatId: string): UseChatResult {
  const { data: userData } = useUser();
  const userId = userData?.id;
  const token = localStorage.getItem("token") ?? undefined;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!chatId || !userId) {
      return;
    }

    const url = import.meta.env.VITE_API_URL;

    const socket = io(url, {
      extraHeaders: { Authorization: `Bearer ${token}` }
    });
    socketRef.current = socket;

    socketRef.current.emit("joinChat", chatId);

    socketRef.current.on("receiveMessage", (msg: SocketChatMessage) => {
      setMessages((prev) => [...prev, socketToChatMessage(msg)]);
    });

    return () => {
      socket.emit("leaveChat", chatId);
      socket.disconnect();
    };
  }, [chatId, userId, token]);

  const sendMessage = (text: string): void => {
    if (!socketRef.current || !userId) {
      return;
    }
    socketRef.current.emit("sendMessage", { chatId, userId, text });
  };

  return { messages, sendMessage };
}
