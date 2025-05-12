import { Coordinates, Paginated, Price } from "../../../shared/types/models";

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
  assistants: string[];
  price?: Price[];
  instagram?: string;
};

export type PaginatedEventsPage = Paginated<Event>;

export type PopularEventsPage = Paginated<Event>;
