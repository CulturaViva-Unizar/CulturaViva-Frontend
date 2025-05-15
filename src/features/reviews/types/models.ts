export type Review = {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment?: string;
  date: string;
  itemId: string;
  responseTo?: string;
};

export type Reply = {
  id: string;
  userId: string;
  username: string;
  comment: string;
  date: string;
  responseTo: string;
};
