"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import HeroSection from "@/components/heroSection";
import CocktailGrid from "@/components/cocktailGrid";
import { Cocktail } from "@/interfaces/cocktails";
import Loading from "@/components/loading";
import { updateUserData, getUserData } from "@/helpers/mongodbFuncs";
import { CocktailDbClient } from "@/helpers/cocktailClass";
import GenericError from "@/components/errors/genericError";
import HomeImg from "@/public/heroImages/home.jpg";
import CocktailBarImg from "@/public/flavorImages/cocktailBar.webp";
import HeaderWithText from "@/components/headerWithText";
import GenericSection from "@/components/genericSection";
import Image from "next/image";

export interface User {
  sub: string;
  allergies: string[];
  favoriteCocktails: string[];
}

const cocktailDbClient = new CocktailDbClient();
const cocktailCategoryOptions = ["Popular", "New", "Random"];

export default function Home() {
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [] as string[],
    favoriteCocktails: [] as string[],
  } as User);
  const [error, setError] = useState("");
  const [cocktailCategory, setCocktailCategory] = useState("Popular");

  useEffect(() => {
    if (user?.sub) {
      getUserData(user.sub).then((data) => {
        delete data._id;
        setUserData(data);
      });
    }
  }, [user]);

  useEffect(() => {
    fetch(`/api/cocktails/category?category=${cocktailCategory}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setError("Error fetching cocktails");
        }
        setCocktails(data);
      });
  }, [cocktailCategory]);

  const handleFavorite = (cocktailId: string): void => {
    const newUserData = cocktailDbClient.handleFavoriteCocktail(
      cocktailId,
      userData
    );

    setUserData(newUserData);
    updateUserData(newUserData);
  };

  if (isLoading || (cocktails.length === 0 && !error)) return <Loading />;

  if (error) return <GenericError text={error} />;

  let filteredCocktails = cocktailDbClient.filterCocktails(
    userData.allergies,
    cocktails
  );

  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection
        heading="Discover Your Next Favorite Cocktail"
        pText="Explore a world of cocktails tailored to your taste. Use your own ingredients to search and find your perfect mix, from timeless classics to innovative modern twists. Your adventure in flavor starts now."
        bgImage={HomeImg}
        buttons={[
          { text: "Start Exploring", href: "/explore" },
          { text: "Learn More", href: "/about" },
        ]}
      />
      <GenericSection containsImg>
        <Image
          src={CocktailBarImg}
          alt="Cocktail Bar"
          placeholder="blur"
          className="largeImg"
        />
        <HeaderWithText
          header="How It Works"
          textContents={[
            "Choose Your Spirit - Select from a wide range of spirits to find cocktails you’ll love.",
            "Discover Recipes - Explore curated cocktail recipes that match your taste.",
            "Mix & Enjoy - Follow easy steps to mix your perfect cocktail at home.",
          ]}
        />
      </GenericSection>
      <GenericSection darkBgColor>
        <HeaderWithText
          header="Our Curated Collections"
          textContents={[
            "Explore popular favorites, discover the latest creations, or let chance guide you. Your next drink is just a click away.",
          ]}
          textAlignment="center"
        />
        <div className="flex flex-col gap-4">
          <div className="flex justify-center w-full gap-2">
            {cocktailCategoryOptions.map((category) => (
              <button
                key={category}
                className={`button-tertiary ${
                  cocktailCategory === category ? "active" : ""
                }`}
                onClick={() => setCocktailCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            {filteredCocktails.length > 0 && (
              <CocktailGrid
                cocktails={filteredCocktails}
                favoriteCocktails={userData.favoriteCocktails}
                onFavorite={handleFavorite}
              />
            )}
          </div>
        </div>
      </GenericSection>
    </main>
  );
}
