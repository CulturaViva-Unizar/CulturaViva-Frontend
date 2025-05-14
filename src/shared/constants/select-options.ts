import { Items, Timeframe } from "../types/enums";
import { SelectOption } from "../types/models";

export const ITEM_TYPE_SELECT_OPTIONS: SelectOption[] = [
  { value: "", label: "Todos" },
  ...Object.values(Items).map((v) => ({
    value: v,
    label: v,
  })),
];

export const CHART_SELECT_OPTIONS: SelectOption[] = [
  { value: "", label: "Todos" },
  ...Object.values(Items).map((v) => ({
    value: v,
    label: v,
  })),
];

export const TIMEFRAME_SELECT_OPTIONS: SelectOption[] = [
  { value: Timeframe.Semana, label: "Última semana" },
  { value: Timeframe.Mes, label: "Último mes" },
  { value: Timeframe.TresMeses, label: "Últimos 3 meses" },
  { value: Timeframe.SeisMeses, label: "Últimos 6 meses" },
  { value: Timeframe.NueveMeses, label: "Últimos 9 meses" },
  { value: Timeframe.Anio, label: "Último año" },
];

export const ORDER_REVIEWS_OPTIONS: SelectOption[] = [
  { value: "", label: "Ordenar" },
  { value: "masRecientes", label: "Más Recientes" },
  { value: "menosRecientes", label: "Menos Recientes" },
  { value: "mayorPuntuacion", label: "Mayor Puntuación" },
  { value: "menorPuntuacion", label: "Menor Puntuación" },
];

export const FILTER_REVIEWS_OPTIONS: SelectOption[] = [
  { value: "", label: "Filtrar" },
  { value: "5", label: "5 estrellas" },
  { value: "4", label: "4 estrellas" },
  { value: "3", label: "3 estrellas" },
  { value: "2", label: "2 estrellas" },
  { value: "1", label: "1 estrellas" },
];

export const USER_ANALYTICS_FILTER_OPTIONS: SelectOption[] = [
  { value: "", label: "Todos" },
  { value: "activos", label: "activos" },
  { value: "inactivos", label: "inactivos" },
];
