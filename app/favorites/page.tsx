"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserData, updateUserData } from "@/helpers/mongodbFuncs";
import { User } from "../page";
import { useEffect, useState } from "react";
import { Cocktail } from "@/interfaces/cocktails";
import CocktailGrid from "@/components/cocktailGrid";
import Loading from "@/components/loading";
import GenericError from "@/components/errors/genericError";
import GenericSection from "@/components/genericSection";
import HeroSection from "@/components/heroSection";
import FavoritesImg from "@/public/heroImages/favorites.jpg";
import { CocktailDbClient } from "@/helpers/cocktailClass";

const cocktailDbClient = new CocktailDbClient();

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
    const newUserData = cocktailDbClient.handleFavoriteCocktail(
      cocktailId,
      userData
    );

    setUserData(newUserData);
    updateUserData(newUserData);
  };

  if (isLoading || (cocktails.length === 0 && !error)) return <Loading />;

  // Cocktails were unabled to be fetched
  if (error) {
    return <GenericError text={error} />;
  }

  const favoriteCocktails = cocktails.filter((cocktail: Cocktail) =>
    userData.favoriteCocktails.includes(cocktail.cocktailId)
  );

  return (
    <main className="flex flex-col min-h-screen items-center">
      <HeroSection
        heading="My Favorites"
        bgImage={FavoritesImg}
        textAlignment="center"
      />
      <GenericSection darkBgColor>
        <CocktailGrid
          cocktails={favoriteCocktails}
          favoriteCocktails={userData.favoriteCocktails}
          onFavorite={handleFavorite}
          hasSearchBar
          hasFilters
        />
      </GenericSection>
    </main>
  );
}
