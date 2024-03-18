"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "../page";
import { CocktailDbClient } from "@/helpers/cocktailClass";
import { Cocktail } from "@/interfaces/cocktails";
import HeroSection from "@/components/heroSection";
import ExploreImg from "@/public/heroImages/explore.jpg";
import { useRouter } from "next/navigation";
import GenericSection from "@/components/genericSection";
import FilterDropDown from "@/components/filterDropDown";
import CocktailGrid from "@/components/cocktailGrid";

const cocktailDbClient = new CocktailDbClient();

// 12 is a Multiple of 2, 3, 4 and 6. Creates a nice grid layout
const numCocktailsToDisplay = 12;

export default function Page() {
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const [cocktailFilter, setCocktailFilter] = useState("");
  const { user, isLoading } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);
  const router = useRouter();

  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [] as string[],
    favoriteCocktails: [] as string[],
  } as User);

  useEffect(() => {
    fetch("/api/cocktails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: Cocktail[]) => {
        setCocktails(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const redirectToRandomCocktailPage = async () => {
    fetch("/api/cocktails?random=true", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: Cocktail) => {
        console.log(data);
        router.push(`/cocktails/${data.cocktailId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFavorite = (cocktailId: string): void => {
    let newUserData;
    if (userData.favoriteCocktails.includes(cocktailId)) {
      newUserData = {
        ...userData,
        favoriteCocktails: userData.favoriteCocktails.filter(
          (id) => id !== cocktailId
        ),
      };
    } else {
      newUserData = {
        ...userData,
        favoriteCocktails: [...userData.favoriteCocktails, cocktailId],
      };
    }
  };

  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };

  let filteredCocktails = cocktailDbClient.filterCocktails(
    userData.allergies,
    cocktails
  );

  filteredCocktails = cocktailFilter
    ? filteredCocktails.filter((cocktail) =>
        cocktail.name.toLowerCase().includes(cocktailFilter.toLowerCase())
      )
    : filteredCocktails;

  return (
    <main className="flex flex-col min-h-screen items-center">
      <HeroSection
        heading="Explore our Collection of Recipes"
        pText="From timeless classics to innovative new mixes, find the perfect recipe for any occasion."
        bgImage={ExploreImg}
        buttons={[
          { text: "Surprise Me!", onClick: redirectToRandomCocktailPage },
        ]}
      />
      <GenericSection>
        <FilterDropDown
          heading="Alcoholic"
          filters={["Yes", "No"]}
          selectedFilters={["Yes"]}
          onFilterClick={onFilterClick}
        />
        <CocktailGrid
          cocktails={filteredCocktails.slice(
            lowerCocktailIndex,
            lowerCocktailIndex + numCocktailsToDisplay
          )}
          favoriteCocktails={userData.favoriteCocktails}
          onFavorite={handleFavorite}
        />
      </GenericSection>

      <div className="w-full">
        <input
          type="text"
          className="px-2 py-1 rounded-md border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out"
          onChange={(e) => setCocktailFilter(e.target.value)}
          value={cocktailFilter}
          placeholder="Search for a cocktail"
        />
        <button
          onClick={() => setCocktailFilter("")}
          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out"
        >
          Clear
        </button>
      </div>
    </main>
  );
}
