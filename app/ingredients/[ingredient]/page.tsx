"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { Ingredient } from "@/interfaces/ingredient";
import InfoRow from "@/components/infoRow";
import Carousel from "@/components/carousel";
import { Cocktail } from "@/interfaces/cocktails";
import { getIngredientData } from "@/helpers/ingredientFuncs";
import { getCocktailsWithIngredient } from "@/helpers/cocktailFuncs";
import CocktailGrid from "@/components/cocktailGrid";

// 1 through 15

export default function Page({ params }: { params: { ingredient: string } }) {
  const [ingredientData, setIngredientData] = useState({} as Ingredient);
  const [cocktails, setCocktails] = useState([] as Cocktail[]);

  const loading = Object.keys(ingredientData).length === 0;

  useEffect(() => {
    getIngredientData(params.ingredient).then((data) => {
      setIngredientData(data[0]);
    });

    getCocktailsWithIngredient(params.ingredient).then((data) => {
      setCocktails(data);
    });
  }, [params]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col p-4 bg-accent text-text w-full wrapper">
      <div className="mb-6">
        <h1 className="text-3xl font-bold my-2">
          {ingredientData.strIngredient}{" "}
        </h1>

        <Image
          src={`https://www.thecocktaildb.com/images/ingredients/${ingredientData.strIngredient}.png`}
          alt={ingredientData.strIngredient}
          height={250}
          width={250}
          className="rounded-md"
          priority
        />
      </div>
      <div className="mb-6 w-full">
        <h2 className="text-xl font-bold mb-2">Information</h2>
        {ingredientData.strAlcohol && (
          <InfoRow label="Contains Alcohol" value={ingredientData.strAlcohol} />
        )}
        {ingredientData.strType && (
          <InfoRow label="Category" value={ingredientData.strType} />
        )}
      </div>
      {ingredientData.strDescription && (
        <div className="w-full mb-6">
          <h2 className="text-xl font-bold">Description</h2>(
          <p>{ingredientData.strDescription}</p>)
        </div>
      )}
      <div className="mb-6 text-ellipsis">
        <h2 className="text-xl font-bold mb-2">Featured in</h2>
        {cocktails.length > 3 ? (
          <Carousel cocktails={cocktails} numItems={3} />
        ) : (
          <CocktailGrid cocktails={cocktails} />
        )}
      </div>
    </main>
  );
}
