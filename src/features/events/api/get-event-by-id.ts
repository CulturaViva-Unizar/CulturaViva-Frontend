import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Event } from "../types/models";
import { ApiResponse, GetEventByIdResponse } from "../../../types/api";
import { mapEventResponseToEvent } from "../utils/mappers";

const getEventById = async (id: string): Promise<Event> => {
  const response: ApiResponse<GetEventByIdResponse> = await api.get(
    `/items/events/${id}`
  );

  const { data: event } = response;

  return mapEventResponseToEvent(event);
};

export const useGetEventById = (id: string) => {
  return useQuery<Event, Error>({
    queryKey: ["events", id],
    queryFn: () => getEventById(id),
  });
};
