export type Chat = {
  id: string;
  user1: string;
  user2: string;
};

export type ChatMessage = {
  _id: string;
  text: string;
  timestamp: string;
  user: string;
}