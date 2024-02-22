"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserData, updateUserData } from "@/helpers/mongodbFuncs";
import { User } from "../page";
import { useEffect, useState } from "react";
import { Cocktail } from "@/interfaces/cocktails";
import CocktailGrid from "@/components/cocktailGrid";
import Loading from "@/components/loading";
import GenericError from "@/components/errors/genericError";

export default function FavoriteCocktailsPage() {
  const { user, isLoading } = useUser();
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [],
    favoriteCocktails: [],
  } as User);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.sub) {
      getUserData(user.sub).then((data) => {
        delete data._id;
        setUserData(data);
      });

      fetch("/api/cocktails")
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setError("Error fetching cocktails");
          }
          setCocktails(data);
        });
    }
  }, [user]);

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

  if (isLoading || (cocktails.length === 0 && !error)) return <Loading />;

  // Cocktails were unabled to be fetched
  if (error) {
    return <GenericError text={error} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-accent w-full wrapper">
      <h1 className="text-3xl font-bold mb-6 mt-2">Your Favorite Cocktails</h1>
      <CocktailGrid
        cocktails={cocktails.filter((cocktail) =>
          userData.favoriteCocktails.includes(cocktail.cocktailId)
        )}
        favoriteCocktails={userData.favoriteCocktails}
        onFavorite={handleFavorite}
      />
    </main>
  );
}
