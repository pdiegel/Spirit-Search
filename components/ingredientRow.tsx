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
      className={`grid grid-cols-2 gap-4 mx-auto ${
        ingredients.length > 2 ? "xl:grid-cols-3" : ""
      }  ${ingredients.length > 3 ? "2xl:grid-cols-4" : ""}`}
    >
      {ingredients.map((ingredient: Ingredient, index) => {
        return (
          <Link
            href={`/ingredients/${ingredient.name}`}
            key={`${ingredient.ingredientId}${ingredient.name}-${index}`}
            className="flex text-center  mx-auto max-w-[200px]"
          >
            {ingredient.name && (
              <div className="relative bg-primaryDark/30 rounded-lg p-6 pb-10">
                <Image
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Small.png`}
                  alt={ingredient.name || "ingredient"}
                  height={200}
                  width={200}
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
