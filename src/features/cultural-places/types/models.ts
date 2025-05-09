import { ReviewProps } from "../../reviews/types/models";

export type CulturalPlace = {
  id: string;
  image?: string;
  title: string;
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
  timetable: string;
  description: string;
  phone?: string;
  web?: string;
  price?: number;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  reviewsInit: ReviewProps[];
}