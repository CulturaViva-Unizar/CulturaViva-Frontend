import { Select, SelectOption } from "./select";
import { UserMenu } from "./user-menu";
import SearchBar from "./search-bar";
import { DatePicker } from "./date-picker";
import { Range } from "./range";
import { Categories, Items } from "../../features/enums";
import { CSSProperties } from "react";

type NavBarProps = {
  className?: string;
  style?: CSSProperties;
};

export const Navbar: React.FC<NavBarProps> = ({ className = "", style }) => {
  const items_options: SelectOption[] = [
    { value: "", label: "Todos" },
    ...Object.values(Items).map((v) => ({
      value: v,
      label: v.charAt(0).toUpperCase() + v.slice(1),
    })),
  ];

  const category_options: SelectOption[] = [
    { value: "", label: "Categoría" },
    ...Object.values(Categories).map((v) => ({
      value: v,
      label: v.charAt(0).toUpperCase() + v.slice(1),
    })),
  ];

  return (
    <nav className={`row py-md-4 gap-2 m-0 ${className}`} style={style}>
      <div className="row col-11 col-md-3 order-1">
        <SearchBar className="gx-0 rounded-pill shadow bg-white" />
      </div>
      <div
        className="row col-12 col-md flex-nowrap overflow-x-auto hide-scrollbar gap-2 gx-2 py-1 order-3 order-md-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <Select
          className="col shadow-sm"
          options={items_options}
          initialValue=""
          onChange={(newValue) => console.log(newValue)}
        />
        <Select
          className="col shadow-sm"
          options={category_options}
          initialValue=""
          onChange={(newValue) => console.log(newValue)}
        />
        <Range
          className="col bg-white shadow-sm"
          hideWhenMaxValue={true}
          initialValue={100}
        />
        <DatePicker className="col shadow-sm bg-white" />
      </div>
      <UserMenu className="col-1 col-md text-end order-2 order-md-3" />
    </nav>
  );
};
