import { Select } from "./select";
import { UserMenu } from "./user-menu";
import SearchBar from "./search-bar";
import { DatePicker } from "./date-picker";
import { Range } from "./range";
import { CSSProperties } from "react";
import { ITEM_TYPE_SELECT_OPTIONS } from "../../shared/constants/select-options";
import { useGetCulturalPlaceCategories } from "../../features/cultural-places/api/get-cultural-place-categories";
import { useGetEventCategories } from "../../features/events/api/get-event-categories";

type NavBarProps = {
  searchText: string;
  onSearchTextChange: (v: string) => void;
  itemType: string;
  onItemTypeChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  price: number;
  onPriceChange: (v: number) => void;
  date: Date | null;
  onDateChange: (v: Date | null) => void;
  className?: string;
  style?: CSSProperties;
};

export const Navbar: React.FC<NavBarProps> = ({
  searchText,
  onSearchTextChange,
  itemType,
  onItemTypeChange,
  category,
  onCategoryChange,
  price,
  onPriceChange,
  date,
  onDateChange,
  className = "",
  style,
}) => {
  const {
    data: eventCategories,
    isLoading: isLoadingEventCategories,
    error: errorEventCategories,
  } = useGetEventCategories();
  const {
    data: culturalPlaceCategories,
    isLoading: isLoadingCulturalPlaceCategories,
    error: errorCulturalPlaceCategories,
  } = useGetCulturalPlaceCategories();

  const eventCategoriesOptions =
    eventCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? [];

  const culturalPlaceCategoriesOptions =
    culturalPlaceCategories?.map((cat) => ({
      value: cat,
      label: cat,
    })) ?? [];

  const categoryOptions = [
    { value: "", label: "Categoría" },
    ...eventCategoriesOptions,
    ...culturalPlaceCategoriesOptions,
  ];

  const isLoading =
    isLoadingEventCategories || isLoadingCulturalPlaceCategories;
  const isError = Boolean(errorEventCategories || errorCulturalPlaceCategories);

  return (
    <nav className={`row py-md-4 gap-2 m-0 ${className}`} style={style}>
      <div className="row col-11 col-md-3 order-1">
        <SearchBar
          value={searchText}
          onSearch={onSearchTextChange}
          className="gx-0 rounded-pill shadow bg-white"
        />
      </div>
      <div
        className="row col-12 col-md flex-nowrap overflow-x-auto hide-scrollbar gap-2 gx-2 py-1 order-3 order-md-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <Select
          className="col shadow-sm"
          options={ITEM_TYPE_SELECT_OPTIONS}
          value={itemType}
          onChange={onItemTypeChange}
        />
        {!isLoading && !isError && (
          <Select
            className="col shadow-sm"
            options={categoryOptions}
            value={category}
            onChange={onCategoryChange}
            style={{ maxWidth: 150 }}
          />
        )}
        <Range
          className="col bg-white shadow-sm"
          hideWhenMaxValue={true}
          value={price}
          onChange={onPriceChange}
        />
        <DatePicker
          value={date}
          onChange={onDateChange}
          className="col shadow-sm bg-white"
        />
      </div>
      <UserMenu className="col-1 col-md text-end order-2 order-md-3" />
    </nav>
  );
};
