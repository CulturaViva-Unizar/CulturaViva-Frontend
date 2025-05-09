import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Event } from "../types/models";
import { GetEventsResponse } from "../../../types/api";

export const getEvents = async (): Promise<Event[]> => {
  const events: GetEventsResponse = await api.get("/items/events");

  return events;
};

export const useGetEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};
