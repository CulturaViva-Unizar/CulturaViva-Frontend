import { TimeAnalyticsResponse } from "../../../types/api";
import { TimeAnalytics } from "../types/models";

export const mapTimeAnalyticsResponseToTimeAnalytics = (
  src: TimeAnalyticsResponse
): TimeAnalytics => {
  return {
    total: src.total,
    date: src.id,
  };
};
