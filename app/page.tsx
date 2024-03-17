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

// 12 is a Multiple of 2, 3, 4 and 6. Creates a nice grid layout
const numCocktailsToDisplay = 12;
const cocktailDbClient = new CocktailDbClient();

export default function Home() {
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const { user, isLoading } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);
  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [] as string[],
    favoriteCocktails: [] as string[],
  } as User);
  const [cocktailFilter, setCocktailFilter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cocktails")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          setError("Error fetching cocktails");
        }
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
  }, [cocktails]);

  const handlePrevious = (): void => {
    setLowerCocktailIndex(lowerCocktailIndex - numCocktailsToDisplay);
  };

  const handleNext = (): void => {
    setLowerCocktailIndex(lowerCocktailIndex + numCocktailsToDisplay);
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

  if (isLoading || (cocktails.length === 0 && !error)) return <Loading />;

  if (error) return <GenericError text={error} />;

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
    <main className="flex min-h-screen flex-col items-center bg-accent">
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
          header="Explore Our Curated Collections"
          textContents={[
            "Dive into the heart of mixology with just a click. Whether you're in the mood for crowd-pleasers, the newest concoctions, or a surprise mix with our random selection, your perfect cocktail awaits. Embrace the adventure of discovery.",
          ]}
          textAlignment="center"
        />
        <div className="flex flex-col">
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
        </div>
        {/* Pagination buttons */}
        <div className="flex justify-between w-full my-4">
          <button
            onClick={handlePrevious}
            disabled={lowerCocktailIndex < numCocktailsToDisplay}
            className="disabled:pointer-events-none disabled:opacity-50 button-primary outside-nav"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={
              lowerCocktailIndex >
              filteredCocktails.length - numCocktailsToDisplay
            }
            className="disabled:pointer-events-none disabled:opacity-50 button-primary outside-nav"
          >
            Next
          </button>
        </div>
      </GenericSection>
      <div className="w-full">
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
    </main>
  );
}
