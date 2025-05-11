import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Event } from "../types/models";
import { ApiResponse, GetEventsResponse } from "../../../types/api";
import { mapEventResponseToEvent } from "../utils/mappers";

const getEvents = async (): Promise<Event[]> => {
  const response: ApiResponse<GetEventsResponse> = await api.get(
    "/items/events"
  );

  const { data: events = [] } = response;

  return events.map(mapEventResponseToEvent);
};

export const useGetEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};
