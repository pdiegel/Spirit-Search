import Link from "next/link";
import Image from "next/image";

export default function CocktailGrid({ cocktails }: { cocktails: any[] }) {
  return cocktails.map((cocktail: any) => {
    return (
      <div key={cocktail.idDrink} className="w-1/4 self-end">
        <h2 className="text-center mb-1 w-full text-balance">
          {cocktail.strDrink}
        </h2>
        <Link href={`/cocktails/${cocktail.idDrink}`}>
          <Image
            src={cocktail.strDrinkThumb + "/preview"}
            alt={cocktail.strDrink}
            height={90}
            width={90}
            className="rounded-md shadow-md"
          ></Image>
        </Link>
      </div>
    );
  });
}
