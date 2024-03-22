"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { Ingredient } from "@/interfaces/ingredient";
import InfoRow from "@/components/infoRow";
import { Cocktail } from "@/interfaces/cocktails";
import CocktailGrid from "@/components/cocktailGrid";
import ShelfImg from "@/public/heroImages/shelf.png";
import HeroSection from "@/components/heroSection";
import GenericSection from "@/components/genericSection";
import HeaderWithText from "@/components/headerWithText";
import { breakTextIntoTwoSentenceChunks } from "@/helpers/textFuncs";
import { User } from "@/app/page";
import { getUserData, updateUserData } from "@/helpers/mongodbFuncs";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CocktailDbClient } from "@/helpers/cocktailClass";

const cocktailDbClient = new CocktailDbClient();

export default function Page({ params }: { params: { ingredient: string } }) {
  const [ingredientData, setIngredientData] = useState({} as Ingredient);
  const [cocktails, setCocktails] = useState([] as Cocktail[]);
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState({
    sub: user?.sub,
    allergies: [] as string[],
    favoriteCocktails: [] as string[],
  } as User);

  useEffect(() => {
    if (user?.sub) {
      getUserData(user.sub).then((data) => {
        delete data._id;
        setUserData(data);
      });
    }
  }, [user]);

  const loading = Object.keys(ingredientData).length === 0;

  useEffect(() => {
    fetch(`/api/ingredients?name=${params.ingredient}`)
      .then((res) => res.json())
      .then((data) => {
        setIngredientData(data);
      });

    fetch(`/api/cocktails?name=${params.ingredient}`)
      .then((res) => res.json())
      .then((data) => {
        setCocktails(data);
      });
  }, [params]);

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

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col min-h-screen items-center">
      <HeroSection
        heading={ingredientData.name}
        bgImage={ShelfImg}
        fgImage={`https://www.thecocktaildb.com/images/ingredients/${ingredientData.name}.png`}
        fgImageAlt={ingredientData.name}
        textAlignment="center"
        fgIsIngredient
      />

      <GenericSection darkBgColor>
        <h2 className="text-3xl text-center">Quick Facts</h2>
        <div
          className={`flex flex-wrap gap-2 justify-center md:text-center md:flex-row  md:gap-4 md:mx-auto`}
        >
          <InfoRow
            label="Contains Alcohol"
            value={ingredientData.containsAlcohol}
          />
          <InfoRow label="Category" value={ingredientData.type} />
          {ingredientData.alcoholByVolume && (
            <InfoRow
              label="Alcohol By Volume"
              value={ingredientData.alcoholByVolume}
            />
          )}
        </div>
      </GenericSection>

      {ingredientData.description && (
        <GenericSection>
          <div className="mx-auto">
            <HeaderWithText
              header="Description"
              textContents={breakTextIntoTwoSentenceChunks(
                ingredientData.description
              )}
            />
          </div>
        </GenericSection>
      )}

      <GenericSection darkBgColor>
        <div className="mx-auto flex flex-col gap-8">
          <HeaderWithText
            header="Featured Cocktails"
            textContents={[
              "Check out these cocktails that contain " + ingredientData.name,
            ]}
            textAlignment="center"
          />
          <CocktailGrid
            cocktails={filteredCocktails}
            favoriteCocktails={userData.favoriteCocktails}
            onFavorite={handleFavorite}
            hasSearchBar
          />
        </div>
      </GenericSection>
    </main>
  );
}
