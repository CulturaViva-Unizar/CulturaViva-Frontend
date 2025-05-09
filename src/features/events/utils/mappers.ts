import { EventResponse } from "../../../types/api";
import { Price } from "../../models";
import { Event } from "../types/models";

export const mapEventsResponseToEvent = (src: EventResponse): Event => ({
  id: src._id,
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
  price: src.price
    ? src.price.map<Price>(({ grupo, precio }) => ({ grupo, precio }))
    : undefined,
  instagram: src.instagram,
  twitter: src.twitter,
});
