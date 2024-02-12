"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import IngredientPicker from "@/components/ingredientPicker";
import CocktailGrid from "@/components/cocktailGrid";
import { Cocktail } from "@/interfaces/cocktails";
import {
  filterCocktails,
  filterUnusedIngredients,
  getAllCocktails,
} from "@/helpers/cocktailFuncs";
import Loading from "@/components/loading";
import { getAllIngredients } from "@/helpers/ingredientFuncs";
import { updateUserData, getUserData } from "@/helpers/mongodbFuncs";

export interface User {
  sub: string | undefined | null;
  allergies: string[];
  favoriteCocktails: string[];
}

// Multiple of 2, 4 and 7 for a nice grid layout
const numCocktailsToDisplay = 28;

export default function Home() {
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const [ingredients, setIngredients] = useState([] as string[]);
  const { user, error, isLoading } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);
  const [pickedIngredients, setPickedIngredients] = useState([] as string[]);
  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [],
    favoriteCocktails: [],
  } as User);

  useEffect(() => {
    getAllCocktails().then((data) => {
      setCocktails(data);
    });

    getAllIngredients().then((data) => {
      setIngredients(data);
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

  const handleFavorite = (cocktailId: string) => {
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

  const filteredCocktails = filterCocktails(
    cocktails,
    pickedIngredients,
    userData.allergies
  );

  const filteredIngredients = filterUnusedIngredients(
    ingredients,
    filteredCocktails,
    userData.allergies
  );

  userData.allergies.length > 0 && console.log(userData.allergies);

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
