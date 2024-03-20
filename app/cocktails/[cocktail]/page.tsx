"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { Ingredient } from "@/interfaces/ingredient";
import { Cocktail } from "@/interfaces/cocktails";
import IngredientRow from "@/components/ingredientRow";
import InfoRow from "@/components/infoRow";
import ShelfImg from "@/public/heroImages/shelf.png";
import HeroSection from "@/components/heroSection";
import GenericSection from "@/components/genericSection";
import CocktailGrid from "@/components/cocktailGrid";

export default function Page({ params }: { params: { cocktail: string } }) {
  const [cocktailData, setCocktailData] = useState({} as Cocktail);
  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [similarCocktails, setSimilarCocktails] = useState([] as Cocktail[]);

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

  useEffect(() => {
    const fetchSimilarCocktails = async () => {
      if (cocktailData.ingredients) {
        let allCocktails: Set<Cocktail> = new Set();
        for (const ingredient of cocktailData.ingredients) {
          const response = await fetch(`/api/cocktails?name=${ingredient}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          data.forEach((cocktail: Cocktail) => allCocktails.add(cocktail));
        }
        // Convert the JSON strings back to objects and update state
        setSimilarCocktails(Array.from(allCocktails));
      }
    };

    fetchSimilarCocktails();
  }, [cocktailData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col min-h-screen items-center">
      <HeroSection
        heading={cocktailData.name}
        bgImage={ShelfImg}
        fgImage={cocktailData.thumbnail}
        fgImageAlt={cocktailData.name}
        textAlignment="center"
      />
      <GenericSection>
        <h2 className="text-2xl text-center">Quick Facts</h2>
        <div
          className={`flex flex-wrap gap-2 justify-center md:text-center md:flex-row  md:gap-4 md:mx-auto`}
        >
          <InfoRow label="Type" value={cocktailData.isAlcoholic} />
          <InfoRow label="Category" value={cocktailData.category} />
          <InfoRow label="Glass Type" value={cocktailData.glassType} />
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
      </GenericSection>
      <GenericSection darkBgColor>
        <h2 className="text-2xl text-center">Ingredients List</h2>
        <IngredientRow ingredients={ingredients} />
      </GenericSection>
      <GenericSection>
        <h2 className="text-2xl text-center">Preparation Instructions</h2>
        <p className="text-center max-w-[50ch] mx-auto">
          {cocktailData.instructions}
        </p>
      </GenericSection>
      <GenericSection darkBgColor>
        <h2 className="text-2xl text-center">Explore Similar Cocktails</h2>
        <div className="mx-auto">
          <CocktailGrid cocktails={similarCocktails} />
        </div>
      </GenericSection>
    </main>
  );
}
