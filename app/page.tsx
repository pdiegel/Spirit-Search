"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import IngredientPicker from "@/components/ingredientPicker";
import CocktailGrid from "@/components/cocktailGrid";
import { Cocktail } from "@/interfaces/cocktails";
import {
  filterCocktails,
  filterUnusedIngredients,
} from "@/helpers/cocktailFuncs";
import Loading from "@/components/loading";

// Multiple of 2, 4 and 7 for a nice grid layout
const numCocktailsToDisplay = 28;

export default function Home() {
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const [ingredients, setIngredients] = useState([] as string[]);
  const { user, error, isLoading } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);
  const [pickedIngredients, setPickedIngredients] = useState([] as string[]);

  useEffect(() => {
    fetch("/api/cocktails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCocktails(data.drinks);
      });

    fetch("/api/ingredients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let ingredients = data.drinks.map((i: Cocktail) => i.strIngredient1);
        setIngredients(ingredients);
      });
  }, []);

  const handlePrevious = () => {
    setLowerCocktailIndex(lowerCocktailIndex - numCocktailsToDisplay);
  };

  const handleNext = () => {
    setLowerCocktailIndex(lowerCocktailIndex + numCocktailsToDisplay);
  };

  const handlePickedIngredients = (i: string) => {
    if (pickedIngredients.includes(i)) {
      setPickedIngredients(
        pickedIngredients.filter((ingredient) => ingredient !== i)
      );
      return;
    }
    setPickedIngredients((prevIngredients) => [...prevIngredients, i]);
  };

  if (isLoading || cocktails.length === 0) return <Loading />;

  const filteredCocktails = filterCocktails(cocktails, pickedIngredients);
  const filteredIngredients = filterUnusedIngredients(ingredients, cocktails);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-accent w-full wrapper">
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
      {filteredCocktails.length > 0 && (
        <CocktailGrid
          cocktails={filteredCocktails.slice(
            lowerCocktailIndex,
            lowerCocktailIndex + numCocktailsToDisplay
          )}
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
