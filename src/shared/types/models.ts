export type SelectOption = {
  value: string;
  label: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Price = {
  grupo: string;
  precio: number | null;
};

export type Paginated<T> = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
};
