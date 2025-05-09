import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Event } from "../types/models";
import { GetEventsByIdResponse } from "../../../types/api";

const getEventById = async (id: string): Promise<Event[]> => {
  const events: GetEventsByIdResponse = await api.get(`/items/events${id}`);

  return events;
};

export const useGetEventById = (id: string) => {
  return useQuery<Event[], Error>({
    queryKey: ["events", id],
    queryFn: () => getEventById(id),
  });
};
