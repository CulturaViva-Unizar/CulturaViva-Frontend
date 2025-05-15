import { Items } from "../../../shared/types/enums";

export type Review = {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment?: string;
  date: string;
  itemId: string;
  itemType?: Items;
  itemTitle?: string;
  responseTo?: string;
  deleted: boolean;
};

export type Reply = {
  id: string;
  userId: string;
  username: string;
  comment: string;
  date: string;
  responseTo: string;
};
