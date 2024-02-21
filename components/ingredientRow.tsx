import { Cocktail } from "@/interfaces/cocktails";
import { Ingredient } from "@/interfaces/ingredient";
import Image from "next/image";
import Link from "next/link";

export default function IngredientRow({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {ingredients.map((ingredient: Ingredient) => {
        return (
          <Link
            href={`/ingredients/${ingredient.strIngredient}`}
            key={ingredient.idIngredient}
            className="h-min gap-2 text-center rounded-xl p-2 border border-zinc-200 bg-zinc-50 hover:scale-95 transition-scale duration-200"
          >
            {ingredient.strIngredient && (
              <Image
                src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
                alt={ingredient.strIngredient || "ingredient"}
                height={120}
                width={120}
                className="max-w-[120px] mx-auto"
              />
            )}
            <p className="font-bold w-full">{ingredient.strIngredient}</p>
          </Link>
        );
      })}
    </div>
  );
}
