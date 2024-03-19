import { MouseEventHandler } from "react";
import FilterDropDown from "./filterDropDown";
import { selectedFilterType } from "./cocktailGrid";

export type FilterOptions = {
  parameter: string;
  header: string;
  filters: string[];
  selectedFilters: Set<string>;
  onFilterClick: MouseEventHandler<HTMLButtonElement>;
};

export default function FilterSideBar({
  filterOptions,
  onFilterClear,
  selectedFilters = {} as selectedFilterType,
  bgColor = "bg-primaryDark",
}: {
  filterOptions: FilterOptions[];
  onFilterClear: MouseEventHandler<HTMLButtonElement>;
  selectedFilters?: selectedFilterType;
  bgColor?: string;
}) {
  return (
    <aside className={`flex flex-col gap-8 p-4 rounded-lg max-w-60 ${bgColor}`}>
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl">Filters</h3>
        <button className="button-category" onClick={onFilterClear}>
          Clear Filters
        </button>
      </div>
      {filterOptions.map((option) => (
        <FilterDropDown
          key={option.header}
          parameter={option.parameter}
          heading={option.header}
          filters={option.filters}
          selectedFilters={selectedFilters}
          onFilterClick={option.onFilterClick}
        />
      ))}
    </aside>
  );
}
