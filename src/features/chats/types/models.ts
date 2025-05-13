export type Chat = {
  id: string;
  user: {
    id: string;
    name: string;
  };
};

export type ChatMessage = {
  _id: string;
  text: string;
  timestamp: string;
  user: string;
}