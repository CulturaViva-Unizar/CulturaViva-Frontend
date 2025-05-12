export type Review = {
  id: string;
  userId: string;
  rating: number;
  comment?: string;
  date: string;
  replies: Reply[];
}

export type Reply = {
  userId: number;
  username: string;
  comment: string;
  date: string;
}
