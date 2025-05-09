export type ApiResponse<T> = {
  success: false;
  message: string;
  data: T;
};

/* Auth ------------------------------------------------------------------------------*/
export type CreateUserRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
};

export type CreateUserRespose = {
  id: string;
  email: string;
  name: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  accessToken: string;
  user: LoggedUser;
};

export type LoggedUser = {
  id: string;
  email: string;
  name: string;
  admin: boolean;
  userType: number;
};

/* Events ------------------------------------------------------------------------------*/
export type GetEventsResponse = EventResponse[];

export type GetEventByIdRequest = {
  id: string;
};

export type GetEventByIdResponse = EventResponse;

type Price = {
  grupo: string;
  precio: number | null;
};

export type EventResponse = {
  _id: string;
  title: string;
  coordinates: Coordinates | null;
  itemType: string;
  startDate: string;
  endDate: string;
  asistentes: string[];
  price: Price[] | null;
  description?: string;
  image?: string;
  category?: string;
  permanent?: boolean;
  place?: string;
  instagram?: string;
  twitter?: string;
  __v: number;
};

/* Places -----------------------------------------------------------------------------*/
export type GetCulturalPlacesResponse = CulturalPlaceResponse[];

export type GetPlaceByIdRequest = {
  id: string;
};
export type GetPlaceByIdResponse = CulturalPlaceResponse;

export type CulturalPlaceResponse = {
  _id: string;
  title: string;
  itemType: string;
  direction: string | null;
  price: Price[];
  coordinates?: Coordinates;
  category?: string;
  description?: string | null;
  image?: string;
  email?: string | null;
  phone?: string | null;
  openingHours?: string | null;
  instagram?: string;
  twitter?: string;
  __v: number;
};

export type OpeningHours = {
  [day: string]: string;
};

/* Users ------------------------------------------------------------------------------*/
export type GetUsersResponse = {
  items: User[];
};

export type GetUserByIdRequest = {
  id: string;
};
export type GetUserByIdResponse = {
  item: User;
};

export type SaveEventRequest = {
  userId: string;
  eventId: string;
};
export type SaveEventResponse = {
  saved: boolean;
};

export type AttendEventRequest = {
  userId: string;
  eventId: string;
};
export type AttendEventResponse = {
  attending: boolean;
};

type Coordinates = {
  latitude: number;
  longitude: number;
  _id?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  active: boolean;
  admin: boolean;
  savedEvents?: string[];
  attendingEvents?: string[];
};
