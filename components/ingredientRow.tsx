import { Cocktail } from "@/interfaces/cocktails";
import { Ingredient } from "@/interfaces/ingredient";
import Image from "next/image";

export default function IngredientRow({
  validIngredientKeys,
  ingredients,
  cocktailData,
}: {
  validIngredientKeys: string[];
  ingredients: Ingredient[];
  cocktailData: Cocktail;
}) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {validIngredientKeys.length > 0 &&
        validIngredientKeys.map((key: string) => {
          const ingredientImg = ingredients.find(
            (ingredient: any) =>
              ingredient.strIngredient.toLowerCase() ===
              cocktailData[key as keyof Cocktail]?.toLowerCase()
          )?.strIngredient;
          return (
            <div
              key={cocktailData[key as keyof Cocktail]}
              className="h-min gap-2 text-center rounded-xl p-2 border border-zinc-200 bg-zinc-50 hover:scale-105 transition-scale duration-200"
            >
              {ingredientImg && (
                <Image
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingredientImg}-Small.png`}
                  alt={cocktailData[key as keyof Cocktail] || "ingredient"}
                  height={120}
                  width={120}
                  className="max-w-[120px] mx-auto"
                />
              )}
              <p className="font-bold w-full">
                {cocktailData[key as keyof Cocktail]}
              </p>
              <p>
                {cocktailData[`strMeasure${key.slice(13)}` as keyof Cocktail]}
              </p>
            </div>
          );
        })}
    </div>
  );
}
