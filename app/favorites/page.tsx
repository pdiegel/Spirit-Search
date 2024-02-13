"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserData, updateUserData } from "@/helpers/mongodbFuncs";
import { User } from "../page";
import { useEffect, useState } from "react";
import { Cocktail } from "@/interfaces/cocktails";
import { getAllCocktails } from "@/helpers/cocktailFuncs";
import CocktailGrid from "@/components/cocktailGrid";

export default function FavoriteCocktailsPage() {
  const { user } = useUser();
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [],
    favoriteCocktails: [],
  } as User);

  useEffect(() => {
    if (user?.sub) {
      getUserData(user.sub).then((data) => {
        delete data._id;
        setUserData(data);
      });

      getAllCocktails().then((data) => {
        setCocktails(data);
      });
    }
  }, [user]);

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

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-accent w-full wrapper">
      <h1
        className="text-2xl font-semibold
        text-center -mb-4"
      >
        Your Favorite Cocktails
      </h1>
      <CocktailGrid
        cocktails={cocktails.filter((cocktail) =>
          userData.favoriteCocktails.includes(cocktail.idDrink)
        )}
        favoriteCocktails={userData.favoriteCocktails}
        onFavorite={handleFavorite}
      />
    </main>
  );
}
