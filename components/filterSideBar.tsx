"use client";

import { useState } from "react";
import { MouseEventHandler } from "react";
import FilterDropDown from "./filterDropDown";
import { selectedFilterType } from "./cocktailGrid";
import CloseImg from "@/public/close.svg";
import Image from "next/image";

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
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {!showFilters && (
        <div className="flex gap-2 sm:hidden">
          <button
            className="button-category"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </button>
          <button className="button-category" onClick={onFilterClear}>
            Clear Filters
          </button>
        </div>
      )}
      <aside
        className={`flex flex-col gap-8 p-4 rounded-lg w-3/4 sm:max-w-60 ${bgColor} absolute sm:static sm:translate-x-0 transition-transform duration-500 z-20 ${
          showFilters ? "translate-x-0 left-2" : "-translate-x-full left-0"
        }`}
      >
        <Image
          src={CloseImg.src}
          alt="Close Filters"
          className="absolute top-2 right-2 cursor-pointer sm:hidden"
          onClick={() => setShowFilters(!showFilters)}
          width={40}
          height={40}
        />
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
    </>
  );
}
