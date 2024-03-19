"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Cocktail } from "@/interfaces/cocktails";
import FilterSideBar, { FilterOptions } from "./filterSideBar";
import { MouseEvent, useEffect, useState } from "react";
import SearchBar from "./searchBar";

// 12 is a Multiple of 2, 3, 4 and 6. Creates a nice grid layout
const numCocktailsToDisplay = 12;

const filters = {
  Category: new Set<string>(),
  GlassType: new Set<string>(),
  Alcoholic: new Set<string>(),
};

export type selectedFilterType = {
  [key: string]: Set<string>;
};

export default function CocktailGrid({
  cocktails,
  favoriteCocktails,
  onFavorite,
  hasFilters = false,
  hasSearchBar = false,
}: {
  cocktails: Cocktail[];
  favoriteCocktails?: string[];
  onFavorite?: Function;
  hasFilters?: boolean;
  hasSearchBar?: boolean;
}) {
  const { user } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);
  const [cocktailFilter, setCocktailFilter] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(
    {} as selectedFilterType
  );
  const [filteredCocktails, setFilteredCocktails] = useState([] as Cocktail[]);

  const generateFilterOptions = (cocktails: Cocktail[]): FilterOptions[] => {
    const categories = new Set<string>();
    const glassType = new Set<string>();
    const alcoholic = new Set<string>();

    cocktails.forEach((cocktail) => {
      categories.add(cocktail.category);
      glassType.add(cocktail.glassType);
      alcoholic.add(cocktail.isAlcoholic);
    });

    const handleFilterClick = (e: MouseEvent) => {
      const filterType = e.currentTarget.getAttribute("data-filter-type");
      const filterValue = e.currentTarget.getAttribute("data-filter-value");
      if (!filterType || !filterValue) return;
      const newSelectedFilters = new Set(selectedFilters[filterType as string]);

      if (newSelectedFilters.has(filterValue)) {
        newSelectedFilters.delete(filterValue);
      } else {
        newSelectedFilters.add(filterValue);
      }

      setSelectedFilters({
        ...selectedFilters,
        [filterType]: newSelectedFilters,
      });
    };

    return [
      {
        parameter: "Category",
        header: "Category",
        filters: Array.from(categories),
        selectedFilters: selectedFilters["Category"],
        onFilterClick: (e) => handleFilterClick(e),
      },
      {
        parameter: "GlassType",
        header: "Glass Type",
        filters: Array.from(glassType),
        selectedFilters: selectedFilters["GlassType"],
        onFilterClick: (e) => handleFilterClick(e),
      },
      {
        parameter: "Alcoholic",
        header: "Alcoholic",
        filters: Array.from(alcoholic),
        selectedFilters: selectedFilters["Alcoholic"],
        onFilterClick: (e) => handleFilterClick(e),
      },
    ];
  };

  useEffect(() => {
    let filteredCocktails = [...cocktails];
    cocktails.forEach((cocktail) => {
      Object.entries(selectedFilters).forEach(([filterType, filterValues]) => {
        if (filterValues.size > 0) {
          if (filterType === "Category") {
            filteredCocktails = filteredCocktails.filter((c) =>
              filterValues.has(c.category)
            );
          }
          if (filterType === "GlassType") {
            filteredCocktails = filteredCocktails.filter((c) =>
              filterValues.has(c.glassType)
            );
          }
          if (filterType === "Alcoholic") {
            filteredCocktails = filteredCocktails.filter((c) =>
              filterValues.has(c.isAlcoholic)
            );
          }
        }
      });
    });

    setFilteredCocktails(filteredCocktails);
  }, [cocktails, selectedFilters]);

  useEffect(() => {
    selectAllFilters();
  }, [cocktails]);

  const handlePrevious = (): void => {
    setLowerCocktailIndex(lowerCocktailIndex - numCocktailsToDisplay);
  };

  const handleNext = (): void => {
    setLowerCocktailIndex(lowerCocktailIndex + numCocktailsToDisplay);
  };

  useEffect(() => {
    setLowerCocktailIndex(0);
  }, [filteredCocktails]);

  const getAllFilters = (cocktails: Cocktail[]): {} => {
    cocktails.forEach((cocktail) => {
      filters.Category.add(cocktail.category);
      filters.Alcoholic.add(cocktail.isAlcoholic);
      filters.GlassType.add(cocktail.glassType);
    });
    return filters;
  };

  const displayCocktails = filteredCocktails.slice(
    lowerCocktailIndex,
    lowerCocktailIndex + numCocktailsToDisplay
  );

  const filterOptions = generateFilterOptions(cocktails);

  const selectAllFilters = () => {
    const newFilters = {} as selectedFilterType;
    const filters = getAllFilters(cocktails);
    Object.entries(filters).forEach(([filterType, filterValues]) => {
      newFilters[filterType] = new Set(filterValues as string[]);
    });
    setSelectedFilters({
      ...selectedFilters,
      ...newFilters,
    });
  };

  return (
    <div className="flex gap-4 mx-auto">
      {hasFilters && (
        <div>
          <FilterSideBar
            filterOptions={filterOptions}
            onFilterClear={() => selectAllFilters()}
            selectedFilters={selectedFilters}
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {hasSearchBar && (
          <SearchBar
            onSearch={(search) => setCocktailFilter(search)}
            onClear={() => setCocktailFilter("")}
          />
        )}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4">
          {displayCocktails.map((cocktail: Cocktail) => {
            return (
              <div
                className="hover:scale-105 transition-scale duration-200 relative"
                key={cocktail.cocktailId}
              >
                {user && (
                  <Image
                    onClick={() => onFavorite!(cocktail.cocktailId)}
                    src={
                      favoriteCocktails?.includes(cocktail.cocktailId)
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/300px-Star%2A.svg.png?20070316213819"
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png"
                    }
                    alt={cocktail.name}
                    height={30}
                    width={30}
                    className="absolute top-1/8 left-1/8 cursor-pointer hover:scale-150 transition-transform duration-200 bg-white/70 rounded-full p-1 z-10"
                  />
                )}
                <Link
                  href={`/cocktails/${cocktail.cocktailId}`}
                  className="flex text-center"
                >
                  <div className="relative w-full">
                    <Image
                      src={cocktail.thumbnail + "/preview"}
                      alt={cocktail.name}
                      height={160}
                      width={160}
                      className="rounded-xl w-full"
                    />
                    <p className="absolute bottom-0 text-center p-1 w-full text-balance break-words font-medium bg-primaryDark/70 rounded-b-xl shadow-md z-10">
                      {cocktail.name}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {/* Pagination buttons */}
        <div className="flex justify-between w-full gap-4">
          <button
            onClick={handlePrevious}
            disabled={lowerCocktailIndex < numCocktailsToDisplay}
            className="disabled:pointer-events-none disabled:opacity-50 button-primary outside-nav w-full"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={
              lowerCocktailIndex >
              filteredCocktails.length - numCocktailsToDisplay
            }
            className="disabled:pointer-events-none disabled:opacity-50 button-primary outside-nav w-full"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
