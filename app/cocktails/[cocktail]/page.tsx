"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getNonNullIngredientKeys } from "@/helpers/cocktailFuncs";
import Loading from "@/components/loading";
import { Ingredient } from "@/interfaces/ingredient";
import { Cocktail } from "@/interfaces/cocktails";
import IngredientRow from "@/components/ingredientRow";

// 1 through 15

export default function Page({ params }: { params: { cocktail: string } }) {
  const [cocktailData, setCocktailData] = useState({} as Cocktail);
  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [validIngredientKeys, setValidIngredientKeys] = useState(
    [] as string[]
  );

  const loading = Object.keys(cocktailData).length === 0;

  useEffect(() => {
    fetch(`/api/cocktail?id=${params.cocktail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.drinks[0]);
        setCocktailData(data.drinks[0]);
        setValidIngredientKeys(getNonNullIngredientKeys(data.drinks[0]));
      });
  }, [params]);

  useEffect(() => {
    if (validIngredientKeys) {
      validIngredientKeys.forEach((key: string) => {
        fetch(`/api/ingredient?name=${cocktailData[key as keyof Cocktail]}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setIngredients((prev: Ingredient[]) => [
              ...prev,
              data.ingredients[0],
            ]);
          });
      });
    }
  }, [cocktailData, validIngredientKeys]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col p-4 bg-accent text-text w-full wrapper">
      <h1 className="text-3xl font-bold my-2">{cocktailData.strDrink}</h1>
      <Image
        src={cocktailData.strDrinkThumb}
        alt={cocktailData.strDrink}
        height={250}
        width={250}
        className="rounded-md shadow-md"
        priority
      />
      <p className="mt-1">{cocktailData.strAlcoholic}</p>
      <div className="my-4 w-full">
        <h2 className="text-xl font-bold mb-2">Ingredients</h2>
        <IngredientRow
          ingredients={ingredients}
          cocktailData={cocktailData}
          validIngredientKeys={validIngredientKeys}
        />
      </div>
      <div className="w-full">
        <h2 className="text-xl font-bold">Instructions</h2>
        <p>{cocktailData.strInstructions}</p>
      </div>
    </main>
  );
}
