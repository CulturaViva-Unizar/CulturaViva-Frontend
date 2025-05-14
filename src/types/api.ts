/* Shared ----------------------------------------------------------------------------*/

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type Paginated<T> = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
};

type Coordinates = {
  latitude: number;
  longitude: number;
  _id?: string;
};

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
  comments: [];
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

/* Events ----------------------------------------------------------------------------*/

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

export type GetEventsResponse = Paginated<EventResponse>;

export type GetEventByIdResponse = EventResponse;

export type GetPaginatedEventsRequest = {
  userId?: string;
  eventType?: string;
  eventName?: string;
  eventDate?: Date;
  eventCategory?: string;
  page: number;
  limit: number;
};

export type GetPaginatedEventsResponse = Paginated<EventResponse>;

export type PostAttendingEventsRequest = {
  eventId: string;
};

export type GetPopularEventsRequest = {
  category?: string;
  page: number;
  limit: number;
};

/* Cultural places -------------------------------------------------------------------*/

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

export type GetPaginatedCulturalPlacesResponse =
  Paginated<CulturalPlaceResponse>;

export type GetCulturalPlaceByIdResponse = CulturalPlaceResponse;

/* Bookmarks -------------------------------------------------------------------------*/

export type BookmarkResponse = EventResponse | CulturalPlaceResponse;

export type GetBookmarksByUserResponse = Paginated<BookmarkResponse>;

export type CreateBookmarkRequest = {
  eventId: string;
};

/* Chats -----------------------------------------------------------------------------*/

type ChatResponse = {
  id: string;
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type GetChatsByUserResponse = ChatResponse[];

export type ChatMessage = {
  id: string;
  text: string;
  timestamp: string;
  user: string;
  chat: string;
};

export type GetMessagesByChatResponse = ChatMessage[];

/* Reviews ---------------------------------------------------------------------------*/

export type GetReviewsByEventResponse = ReviewResponse[];

export type GetReviewsByUserResponse = ReviewResponse[];

export type GetReviewsByCulturalPlaceResponse = ReviewResponse[];

export type ReviewResponse = {
  id: string;
  user: {
    id: string;
    name: string;
  };
  text: string;
  createdAt: string;
  date: string;
  event: string;
  value: number;
  responseTo: string;
};

export type CreateReviewRequest = {
  text: string;
  value: number;
};

/* Analytics -------------------------------------------------------------------------*/

export type GetUsersAnalyticsRequest = {
  type?: string;
};

export type GetUsersAnalyticsResponse = {
  count: number;
};

export type GetEventsAnalyticsRequest = {
  category?: string;
};

export type GetEventsAnalyticsResponse = {
  count: number;
};

/* Users -----------------------------------------------------------------------------*/

export type UserResponse = {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
  active: boolean;
  phone: string;
  chats: string[];
  asistsTo: string[];
  savedItems: string[];
  userType?: string;
  createdAt: string;
  __v: number;
};

export type GetUsersRequest = {
  name?: string;
  type?: string;
  page: number;
  limit: number;
  sort?: string;
  order?: string;
};

export type GetPaginatedUsersResponse = Paginated<UserResponse>;
