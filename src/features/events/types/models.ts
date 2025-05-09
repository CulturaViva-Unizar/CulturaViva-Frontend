import { ReviewProps } from "../../reviews/types/models";

export type Event = {
  id: string;
  title: string;
  image?: string;
  location: string;
  rating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  date: string;
  description: string;
  price: number;
  organizer: string;
  attendeesInit: number;
  web?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  reviewsInit: ReviewProps[];
};
