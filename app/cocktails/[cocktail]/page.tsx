"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getNonNullIngredientKeys } from "@/helpers/cocktailFuncs";
import Loading from "@/components/loading";
import { Ingredient } from "@/interfaces/ingredient";
import { Cocktail } from "@/interfaces/cocktails";
import IngredientRow from "@/components/ingredientRow";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import InfoRow from "@/components/infoRow";

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold my-2">{cocktailData.strDrink} </h1>
        {cocktailData.strDrinkAlternate && (
          <p>`A/K/A ${cocktailData.strDrinkAlternate}`</p>
        )}

        <Image
          src={cocktailData.strDrinkThumb}
          alt={cocktailData.strDrink}
          height={250}
          width={250}
          className="rounded-md shadow-md"
          priority
        />
      </div>
      <div className="mb-6 w-full">
        <h2 className="text-xl font-bold mb-2">Information</h2>
        <InfoRow label="Type" value={cocktailData.strAlcoholic} />
        <InfoRow label="Category" value={cocktailData.strCategory} />
        <InfoRow label="Glass" value={cocktailData.strGlass} />
        <Tippy
          content="The International Bartenders Association (IBA) is an international cocktail organization."
          placement="left-start"
        >
          <InfoRow
            label="IBA Official"
            value={cocktailData.strIBA ? "Yes" : "No"}
          />
        </Tippy>
        <InfoRow
          label="Date added"
          value={new Date(
            cocktailData.dateModified as string
          ).toLocaleDateString("en-US")}
        />
      </div>
      <div className="mb-6 w-full">
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
