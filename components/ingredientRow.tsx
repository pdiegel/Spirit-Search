import { Ingredient } from "@/interfaces/ingredient";
import Image from "next/image";
import Link from "next/link";

export default function IngredientRow({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <div
      className={`grid grid-cols-3 gap-4 mx-auto ${
        ingredients.length > 3 ? "xl:grid-cols-4" : ""
      }  ${ingredients.length > 4 ? "2xl:grid-cols-5" : ""}`}
    >
      {ingredients.map((ingredient: Ingredient, index) => {
        return (
          <Link
            href={`/ingredients/${ingredient.name}`}
            key={`${ingredient.ingredientId}${ingredient.name}-${index}`}
            className="flex text-center mx-auto max-w-[125px] hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            {ingredient.name && (
              <div className="relative bg-primaryDark/30 rounded-lg p-6 pb-10">
                <Image
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Small.png`}
                  alt={ingredient.name || "ingredient"}
                  height={125}
                  width={125}
                  className="rounded-lg"
                />
              </div>
            )}
            <p className="absolute bottom-0 text-center p-1 w-full text-balance break-words font-medium bg-primaryDark/70 rounded-b-lg shadow-md">
              {ingredient.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
