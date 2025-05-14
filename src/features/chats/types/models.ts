export type Chat = {
  id: string;
  user: {
    _id: string;
    name: string;
  };
};

export type ChatMessage = {
  _id: string;
  text: string;
  timestamp: string;
  user: string;
}

export type CreatedChat = {
  id: string;
}