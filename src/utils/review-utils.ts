import { Review } from "../features/reviews/types/models";
import { ORDER_REVIEWS_OPTIONS } from "../shared/constants/select-options";

const [
  ,
  // índice 0 = { value: "", label: "Ordenar" }∫
  masRecientesOpt,
  menosRecientesOpt,
  mayorPuntuacionOpt,
  menorPuntuacionOpt,
] = ORDER_REVIEWS_OPTIONS;

export const ORDER_REVIEW_COMPARATORS: Record<
  string,
  (a: Review, b: Review) => number
> = {
  [masRecientesOpt.value]: (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
  [menosRecientesOpt.value]: (a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime(),
  [mayorPuntuacionOpt.value]: (a, b) => b.rating - a.rating,
  [menorPuntuacionOpt.value]: (a, b) => a.rating - b.rating,
};
