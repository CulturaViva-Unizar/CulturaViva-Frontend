import { Categories, Items, Timeframe } from "../types/enums";
import { SelectOption } from "../types/models";

export const CATEGORY_SELECT_OPTIONS: SelectOption[] = [
  { value: "", label: "Categoría" },
  ...Object.values(Categories).map((v) => ({
    value: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
  })),
];

export const ITEM_TYPE_SELECT_OPTIONS: SelectOption[] = [
  { value: "", label: "Todos" },
  ...Object.values(Items).map((v) => ({
    value: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
  })),
];

export const CHART_SELECT_OPTIONS: SelectOption[] = [
  { value: "", label: "Todos" },
  ...Object.values(Items).map((v) => ({
    value: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
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
