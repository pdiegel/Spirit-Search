"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import IngredientPicker from "@/components/ingredientPicker";
import { toSentenceCase } from "@/helpers/textFuncs";
import CocktailGrid from "@/components/cocktailGrid";

const numCocktailsToDisplay = 50;

export default function Home() {
  const [cocktails, setCocktails] = useState([] as any);
  const [ingredients, setIngredients] = useState([] as string[]);
  const [apiData, setApiData] = useState({} as any);
  const { user, error, isLoading } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);
  const [pickedIngredients, setPickedIngredients] = useState([] as string[]);

  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
      });

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
        const ingredients = data.drinks.map((i: any) => i.strIngredient1);
        setIngredients(ingredients);
      });
  }, []);

  const handlePickedIngredients = (i: string) => {
    if (pickedIngredients.includes(i)) {
      setPickedIngredients(
        pickedIngredients.filter((ingredient) => ingredient !== i)
      );
      return;
    }
    setPickedIngredients((prevIngredients) => [...prevIngredients, i]);
  };

  const filteredCocktails = cocktails.filter((cocktail: any) => {
    const cocktailIngredients = Object.keys(cocktail)
      .filter((key) => key.includes("strIngredient"))
      .map((key) => cocktail[key]);
    return pickedIngredients.every((ingredient) =>
      cocktailIngredients.includes(toSentenceCase(ingredient))
    );
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-accent w-full">
      {ingredients && (
        <div className="w-full overflow-hidden">
          <IngredientPicker
            availableIngredients={ingredients}
            pickedIngredients={pickedIngredients}
            onSelection={handlePickedIngredients}
          />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {filteredCocktails.length > 0 && (
          <CocktailGrid
            cocktails={filteredCocktails.slice(
              lowerCocktailIndex,
              lowerCocktailIndex + numCocktailsToDisplay
            )}
          />
        )}
      </div>
      <div className="flex justify-between w-full my-4">
        <button
          onClick={() => {
            setLowerCocktailIndex(lowerCocktailIndex - numCocktailsToDisplay);
          }}
          disabled={lowerCocktailIndex < numCocktailsToDisplay}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-secondary p-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setLowerCocktailIndex(lowerCocktailIndex + numCocktailsToDisplay);
          }}
          disabled={
            lowerCocktailIndex >
            filteredCocktails.length - numCocktailsToDisplay
          }
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-secondary  p-2 rounded-md"
        >
          Next
        </button>
      </div>
    </main>
  );
}
