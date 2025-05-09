import { CulturalPlaceResponse } from "../../../types/api";
import { Price } from "../../models";
import { CulturalPlace } from "../types/models";

export const mapCulturalPlaceResponseToCulturalPlace = (src: CulturalPlaceResponse): CulturalPlace => ({
  id: src._id,
  title: src.title,
  location: src.direction ?? undefined,
  description: src.description ?? undefined,
  image: src.image,
  category: src.category ?? "Otro",
  coordinates: src.coordinates
    ? {
        latitude: src.coordinates.latitude,
        longitude: src.coordinates.longitude,
      }
    : undefined,
  price: src.price.map<Price>(({ grupo, precio }) => ({ grupo, precio })),
  instagram: src.instagram,
  openingHours: src.openingHours ?? undefined,
  email: src.email ?? undefined,
  phone: src.phone ?? undefined
});
