export interface ReviewProps {
  userId: number;
  username: string;
  rating?: number;
  comment: string;
  date: string;
  replies?: ReplyProps[];
}

export interface ReplyProps {
  userId: number;
  username: string;
  comment: string;
  date: string;
  replies?: ReplyProps[];
}
