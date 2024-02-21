"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import IngredientPicker from "@/components/ingredientPicker";
import CocktailGrid from "@/components/cocktailGrid";
import { Cocktail } from "@/interfaces/cocktails";
import Loading from "@/components/loading";
import { updateUserData, getUserData } from "@/helpers/mongodbFuncs";
import { CocktailDbClient } from "@/helpers/cocktailClass";

export interface User {
  sub: string;
  allergies: string[];
  favoriteCocktails: string[];
}

// Multiple of 2, 4 and 7 for a nice grid layout
const numCocktailsToDisplay = 28;
const cocktailDbClient = new CocktailDbClient();

export default function Home() {
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const { user, isLoading } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);
  const [pickedIngredients, setPickedIngredients] = useState([] as string[]);
  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [] as string[],
    favoriteCocktails: [] as string[],
  } as User);
  const [cocktailFilter, setCocktailFilter] = useState("");

  useEffect(() => {
    fetch("/api/cocktails")
      .then((res) => res.json())
      .then((data) => {
        setCocktails(data);
      });

    if (user?.sub) {
      getUserData(user.sub).then((data) => {
        delete data._id;
        setUserData(data);
      });
    }
  }, [user]);

  useEffect(() => {
    setLowerCocktailIndex(0);
  }, [pickedIngredients]);

  const handlePrevious = (): void => {
    setLowerCocktailIndex(lowerCocktailIndex - numCocktailsToDisplay);
  };

  const handleNext = (): void => {
    setLowerCocktailIndex(lowerCocktailIndex + numCocktailsToDisplay);
  };

  const handlePickedIngredients = (i: string): void => {
    if (pickedIngredients.includes(i)) {
      setPickedIngredients(
        pickedIngredients.filter((ingredient) => ingredient !== i)
      );
      return;
    }
    setPickedIngredients((prevIngredients) => [...prevIngredients, i]);
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

    setUserData(newUserData);
    updateUserData(newUserData);
  };

  if (isLoading || cocktails.length === 0) return <Loading />;

  let filteredCocktails = cocktailDbClient.filterCocktails(
    pickedIngredients,
    userData.allergies,
    cocktails
  );

  const filteredIngredients =
    cocktailDbClient.getUniqueCocktailIngredients(filteredCocktails);

  filteredCocktails = cocktailFilter
    ? filteredCocktails.filter((cocktail) =>
        cocktail.name.toLowerCase().includes(cocktailFilter.toLowerCase())
      )
    : filteredCocktails;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-accent w-full wrapper">
      {/* Ingredient Picker */}
      {filteredIngredients && (
        <div className="w-full overflow-hidden">
          <IngredientPicker
            availableIngredients={filteredIngredients}
            pickedIngredients={pickedIngredients}
            onSelection={handlePickedIngredients}
          />
        </div>
      )}

      {/* Cocktail Grid */}
      <div className="w-full">
        <h1 className="text-2xl font-bold mt-6">
          {pickedIngredients.length > 0
            ? "Cocktails with selected ingredients"
            : "All Cocktails"}
        </h1>
        <input
          type="text"
          className="px-2 py-1 rounded-md mt-2 mb-2 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out"
          onChange={(e) => setCocktailFilter(e.target.value)}
          value={cocktailFilter}
          placeholder="Search for a cocktail"
        />
        <button
          onClick={() => setCocktailFilter("")}
          className="bg-red-500 text-white px-2 py-1 ml-2 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out"
        >
          Clear
        </button>
      </div>
      {filteredCocktails.length > 0 && (
        <CocktailGrid
          cocktails={filteredCocktails.slice(
            lowerCocktailIndex,
            lowerCocktailIndex + numCocktailsToDisplay
          )}
          favoriteCocktails={userData.favoriteCocktails}
          onFavorite={handleFavorite}
        />
      )}

      {/* Pagination buttons */}
      <div className="flex justify-between w-full my-4">
        <button
          onClick={handlePrevious}
          disabled={lowerCocktailIndex < numCocktailsToDisplay}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-secondary p-2 rounded-md text-white"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={
            lowerCocktailIndex >
            filteredCocktails.length - numCocktailsToDisplay
          }
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-secondary p-2 rounded-md text-white"
        >
          Next
        </button>
      </div>
    </main>
  );
}
