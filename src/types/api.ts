export type ApiResponse<T> = {
  success: false;
  message: string;
  data: T;
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

export type CreateUserRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
};

export type CreateUserRespose = LoginUserResponse;

export type GetEventsResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: EventResponse[];
};

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

export type GetCulturalPlacesResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: CulturalPlaceResponse[];
};

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

export type BookmarkResponse = EventResponse | CulturalPlaceResponse;

export type GetBookmarksByUserResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: BookmarkResponse[];
};

export type GetPaginatedEventsRequest = {
  userId: string;
  eventType?: string;
  eventName?: string;
  eventDate?: Date;
  eventCategory?: string;
  page: number;
  limit: number;
};

export type GetEventsRequest = {
  name?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  limit: number;
  sort?: string;
  order?: string;
};

export type GetCulturalPlacesRequest = {
  name?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  limit: number;
  sort?: string;
  order?: string;
};

type ChatResponse = {
  id: string;
  user1: string;
  user2: string;
  createdAt: string;
  updatedAt: string;
};

export type GetChatsByUserResponse = ChatResponse[];

export type GetReviewsByEventResponse = ReviewResponse[];

export type ReviewResponse = {
  id: string;
  user: string;
  text: string;
  createdAt: string;
  date: string;
  event: string;
  value: number;
  responseTo: string;
};
