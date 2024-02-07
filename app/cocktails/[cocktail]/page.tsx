"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getNonNullIngredientKeys } from "@/helpers/cocktailFuncs";
import Loading from "@/components/loading";

// 1 through 15

export default function Page({ params }: { params: { cocktail: string } }) {
  const [cocktailData, setCocktailData] = useState({} as any);
  const [ingredients, setIngredients] = useState([] as any);
  const [validIngredientKeys, setValidIngredientKeys] = useState([] as any);

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
        console.log("Fetching ingredient image for", cocktailData[key]);
        fetch(`/api/ingredient?name=${cocktailData[key]}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setIngredients((prev: string[]) => [...prev, data.ingredients[0]]);
          });
      });
    }
  }, [cocktailData, validIngredientKeys]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col items-center justify-between p-4 bg-accent text-text w-full">
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
      <div className="w-3/4 mb-4 self-start">
        <h2 className="text-xl font-bold mb-2">Ingredients</h2>
        <ul>
          {validIngredientKeys &&
            validIngredientKeys.map((key: string) => {
              const ingredientImg = ingredients.find(
                (ingredient: any) =>
                  ingredient.strIngredient.toLowerCase() ===
                  cocktailData[key].toLowerCase()
              )?.strIngredient;
              return (
                <li
                  key={cocktailData[key]}
                  className="flex justify-between items-center"
                >
                  {ingredientImg && (
                    <Image
                      src={`https://www.thecocktaildb.com/images/ingredients/${ingredientImg}-Small.png`}
                      alt={cocktailData[key]}
                      height={100}
                      width={100}
                    />
                  )}
                  <span>{cocktailData[key]}</span>
                  {" -> "}
                  <span>{cocktailData[`strMeasure${key.slice(13)}`]}</span>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="w-full">
        <h2 className="text-xl font-bold">Instructions</h2>
        <p>{cocktailData.strInstructions}</p>
      </div>
    </main>
  );
}
