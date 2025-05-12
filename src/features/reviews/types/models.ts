export type Review = {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment?: string;
  date: string;
  replies: Reply[];
  itemId: string;
};

export type Reply = {
  userId: string;
  username: string;
  comment: string;
  date: string;
};
