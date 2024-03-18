"use client";

import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "../page";
import { CocktailDbClient } from "@/helpers/cocktailClass";
import { Cocktail } from "@/interfaces/cocktails";

const cocktailDbClient = new CocktailDbClient();

export default function Page() {
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const [cocktailFilter, setCocktailFilter] = useState("");
  const { user, isLoading } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);
  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [] as string[],
    favoriteCocktails: [] as string[],
  } as User);

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
    <main className="flex flex-col p-4 bg-accent text-text w-full wrapper">
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
