/* eslint-disable @typescript-eslint/no-explicit-any */
export type ChartProps = {
  data: any;
  options?: any;
  className?: string;
};

export type ItemByCategory = {
  category: string;
  count: number;
};

export type CommentsAnalytics = {
  totalEliminated: number;
  totalAdded: number;
};

export type TimeAnalytics = {
  total: number;
  date: string;
};
