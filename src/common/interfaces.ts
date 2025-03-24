import { JSX } from "react";

export interface ChartProps {
  data: any;
  options?: any;
  className?: string;
}

export interface CardProps {
  image?: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  onClick?: () => void;
  className?: string;
  to?: string;
}

export interface InfoEventProps {
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
  date: string;
  description: string;
  price: number;
  organizer: string;
  attendeesInit: number;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  reviewsInit: ReviewProps[];
  onClose: () => void;
}

export interface ReviewProps {
  map(arg0: (review: any) => JSX.Element): React.ReactNode;
  userId: number;
  username: string;
  rating?: number;
  comment: string;
  date: string;
  replies?: Reply[];
}

export interface Reply {
  userId: number;
  user: string;
  comment: string;
  date: string;
  replies?: Reply[];
}

export interface UserCardProps {
  userId: number;
  username: string;
  totalComments: number;
  deletedComments: number;
  isEnabledInit: boolean;
  className?: string;
}
