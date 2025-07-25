import { Coordinates, Paginated, Price } from "../../../shared/types/models";

export type CulturalPlace = {
  id: string;
  title: string;
  location?: string;
  price: Price[];
  description?: string;
  coordinates?: Coordinates;
  openingHours?: string;
  image?: string;
  email?: string;
  phone?: string;
  category?: string;
  instagram?: string;
  twitter?: string;
};

export type PaginatedCulturalPlacesPage = Paginated<CulturalPlace>;
