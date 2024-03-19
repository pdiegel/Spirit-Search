"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { Ingredient } from "@/interfaces/ingredient";
import { Cocktail } from "@/interfaces/cocktails";
import IngredientRow from "@/components/ingredientRow";
import InfoRow from "@/components/infoRow";

export default function Page({ params }: { params: { cocktail: string } }) {
  const [cocktailData, setCocktailData] = useState({} as Cocktail);
  const [ingredients, setIngredients] = useState([] as Ingredient[]);

  const loading = Object.keys(cocktailData).length === 0;

  useEffect(() => {
    fetch(`/api/cocktails?id=${params.cocktail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCocktailData(data);
      });
  }, [params]);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (cocktailData.ingredients) {
        const requests = cocktailData.ingredients.map((key: string) =>
          fetch(`/api/ingredients?name=${key}`).then((res) => res.json())
        );

        const results = await Promise.all(requests);
        setIngredients(results);
      }
    };

    fetchIngredients();
  }, [cocktailData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col p-4 bg-accent text-text w-full wrapper">
      <div className="mb-6">
        <h1 className="text-3xl font-bold my-2">{cocktailData.name} </h1>
        {cocktailData.alternateName && (
          <p>`A/K/A ${cocktailData.alternateName}`</p>
        )}

        <Image
          src={cocktailData.thumbnail}
          alt={cocktailData.name}
          height={250}
          width={250}
          className="rounded-lg shadow-md"
          priority
        />
      </div>
      <div className="mb-6 w-full">
        <h2 className="text-xl font-bold mb-2">Information</h2>
        <InfoRow label="Type" value={cocktailData.isAlcoholic} />
        <InfoRow label="Category" value={cocktailData.category} />
        <InfoRow label="Glass" value={cocktailData.glassType} />
        {cocktailData.iba && (
          <InfoRow label="IBA Category" value={cocktailData.iba} />
        )}
        <InfoRow
          label="Date added"
          value={new Date(
            cocktailData.dateModified as string
          ).toLocaleDateString("en-US")}
        />
      </div>
      <div className="mb-6 w-full">
        <h2 className="text-xl font-bold mb-2">Ingredients</h2>
        <IngredientRow ingredients={ingredients} />
      </div>
      <div className="w-full">
        <h2 className="text-xl font-bold">Instructions</h2>
        <p>{cocktailData.instructions}</p>
      </div>
    </main>
  );
}
