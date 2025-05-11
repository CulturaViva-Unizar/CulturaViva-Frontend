import { Paginated } from "../../../shared/types/models";
import { CulturalPlace } from "../../cultural-places/types/models";
import { Event } from "../../events/types/models";

export type BookmarksPage = Paginated<Event | CulturalPlace>;
