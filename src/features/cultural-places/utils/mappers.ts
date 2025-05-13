import { CulturalPlaceResponse, GetPaginatedCulturalPlacesResponse } from "../../../types/api";
import { Price } from "../../../shared/types/models";
import { CulturalPlace, PaginatedCulturalPlacesPage } from "../types/models";

export const mapCulturalPlaceResponseToCulturalPlace = (
  src: CulturalPlaceResponse
): CulturalPlace => ({
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
  twitter: src.twitter,
  openingHours: src.openingHours ?? undefined,
  email: src.email ?? undefined,
  phone: src.phone ?? undefined,
});

export const mapGetPaginatedCulturalPlacesResponseToPaginatedCulturalPlacesPage = (
  src: GetPaginatedCulturalPlacesResponse
): PaginatedCulturalPlacesPage => {
  return {
    currentPage: src.currentPage,
    totalPages: src.totalPages,
    totalItems: src.totalItems,
    items: src.items.map(mapCulturalPlaceResponseToCulturalPlace),
  };
};
