import {
  GetEventsAnalyticsResponse,
  GetUsersAnalyticsResponse,
} from "../../../types/api";
import { Analytics } from "../types/models";

export const mapGetUsersAnalyticsResponseToAnalytics = (
  src: GetUsersAnalyticsResponse
): Analytics => {
  return {
    totalUsers: src.count,
  };
};

export const mapGetEventsAnalyticsResponseToAnalytics = (
  src: GetEventsAnalyticsResponse
): Analytics => {
  return {
    totalEvents: src.count,
  };
};
