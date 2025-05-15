import { EventResponse, GetPaginatedEventsResponse } from "../../../types/api";
import { Price } from "../../../shared/types/models";
import { PaginatedEventsPage, Event } from "../types/models";

export const mapEventResponseToEvent = (src: EventResponse): Event => ({
  id: src.id,
  title: src.title,
  description: src.description,
  image: src.image,
  category: src.category ?? "Otro",
  location: src.place,
  coordinates: src.coordinates
    ? {
        latitude: src.coordinates.latitude,
        longitude: src.coordinates.longitude,
      }
    : undefined,
  startDate: src.startDate,
  endDate: src.endDate,
  totalAssistants: src.asistentes?.length ?? 0,
  assistants: src.asistentes,
  price: src.price
    ? src.price.map<Price>(({ grupo, precio }) => ({ grupo, precio }))
    : undefined,
  instagram: src.instagram,
  twitter: src.twitter,
});

export const mapGetPaginatedEventsResponseToPaginatedEventsPage = (
  src: GetPaginatedEventsResponse
): PaginatedEventsPage => {
  return {
    currentPage: src.currentPage,
    totalPages: src.totalPages,
    totalItems: src.totalItems,
    items: src.items.map(mapEventResponseToEvent),
  };
};
