import Link from "next/link";
import Image from "next/image";

export default function CocktailGrid({ cocktails }: { cocktails: any[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center my-8">
      {cocktails.map((cocktail: any) => {
        return (
          <div
            key={cocktail.idDrink}
            className="self-end rounded-md p-2 text-center border-2"
          >
            <h2 className="text-center mb-1 w-full text-balance">
              {cocktail.strDrink}
            </h2>
            <Link href={`/cocktails/${cocktail.idDrink}`} className="mx-auto">
              <Image
                src={cocktail.strDrinkThumb + "/preview"}
                alt={cocktail.strDrink}
                height={140}
                width={140}
                className="rounded-md shadow-md"
              ></Image>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
