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
import CocktailGrid from "@/components/cocktailGrid";
import { updateUserData } from "@/helpers/mongodbFuncs";
import Loading from "@/components/loading";

const cocktailDbClient = new CocktailDbClient();

export default function Page() {
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const { user, isLoading } = useUser();
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
    const newUserData = cocktailDbClient.handleFavoriteCocktail(
      cocktailId,
      userData
    );

    setUserData(newUserData);
    updateUserData(newUserData);
  };

  let filteredCocktails = cocktailDbClient.filterCocktails(
    userData.allergies,
    cocktails
  );

  if (isLoading || cocktails.length === 0) return <Loading />;

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
      <GenericSection darkBgColor>
        <div className="mx-auto">
          <CocktailGrid
            cocktails={filteredCocktails}
            favoriteCocktails={userData.favoriteCocktails}
            onFavorite={handleFavorite}
            hasSearchBar
            hasFilters
          />
        </div>
      </GenericSection>
    </main>
  );
}
