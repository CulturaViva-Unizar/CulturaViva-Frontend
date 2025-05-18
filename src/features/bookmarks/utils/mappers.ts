import {
  BookmarkResponse,
  EventResponse,
  GetBookmarksByUserResponse,
} from "../../../types/api";
import { mapCulturalPlaceResponseToCulturalPlace } from "../../cultural-places/utils/mappers";
import { mapEventResponseToEvent } from "../../events/utils/mappers";
import { BookmarksPage } from "../types/models";

function isEventResponse(item: BookmarkResponse): item is EventResponse {
  return item.itemType == "Event";
}

export const mapGetBookmarksByUserResponseToBookmarksPage = (
  src: GetBookmarksByUserResponse
): BookmarksPage => {
  return {
    currentPage: src.currentPage,
    totalPages: src.totalPages,
    totalItems: src.totalItems,
    items: src.items.map((item) =>
      isEventResponse(item)
        ? mapEventResponseToEvent(item)
        : mapCulturalPlaceResponseToCulturalPlace(item)
    ),
  };
};
