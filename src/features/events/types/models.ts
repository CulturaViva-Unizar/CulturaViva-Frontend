import { Coordinates, Price } from "../../models";

export type Event = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  location?: string;
  coordinates?: Coordinates;
  startDate: string;
  endDate: string;
  totalAssistants: number;
  price?: Price[];
  instagram?: string;
  twitter?: string;
};
