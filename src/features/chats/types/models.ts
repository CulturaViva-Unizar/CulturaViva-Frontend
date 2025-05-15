export type Chat = {
  id: string;
  user: {
    id: string;
    name: string;
  };
};

export type ChatMessage = {
  id: string;
  text: string;
  timestamp: string;
  user: string;
}

export type CreatedChat = {
  id: string;
}