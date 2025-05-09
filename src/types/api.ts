export type ApiResponse<T> = {
  success: false;
  message: string;
  data: T;
};

/* Auth ------------------------------------------------------------------------------*/
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

export type CreateUserRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
};

export type CreateUserRespose = LoginUserResponse;


/* Events ------------------------------------------------------------------------------*/
export type GetEventsResponse = {
  items: Event[];
};

export type GetEventByIdRequest = {
  id: string;
};
export type GetEventByIdResponse = {
  item: Event;
};

export type Event = {
  id: string;
  title: string;
  category: string;
  instagram?: string;
  twitter?: string;
  description?: string;
  image?: string;
  price?: number | null;
  coordinates?: Coordinates;
  startDate?: string;
  endDate?: string;
  permanent?: boolean;
  place?: string;
};

/* Places -----------------------------------------------------------------------------*/
export type GetPlacesResponse = {
  items: Place[];
};

export type GetPlaceByIdRequest = {
  id: string;
};
export type GetPlaceByIdResponse = {
  item: Place;
};

export type Place = {
  id: string;
  title: string;
  category: string;
  instagram?: string;
  twitter?: string;
  description?: string;
  image?: string;
  price?: number | null;
  coordinates?: Coordinates;
  direction?: string;
  openingHours?: OpeningHours;
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

export type Coordinates = {
  lat: number;
  lng: number;
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
