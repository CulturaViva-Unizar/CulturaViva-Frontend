import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Event } from "../types/models";
import { ApiResponse, GetEventsResponse } from "../../../types/api";
import { mapEventsResponseToEvent } from "../utils/mappers";

export const getEvents = async (): Promise<Event[]> => {
  const response: ApiResponse<GetEventsResponse> = await api.get(
    "/items/events"
  );

  const { data: events = [] } = response;

  return events.map(mapEventsResponseToEvent);
};

export const useGetEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};
