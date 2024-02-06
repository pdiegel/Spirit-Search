import Link from "next/link";
import Image from "next/image";

export default function CocktailGrid({ cocktails }: { cocktails: any[] }) {
  return cocktails.map((cocktail: any) => {
    return (
      <div key={cocktail.idDrink}>
        <h2 className="text-xl font-bold text-center mb-1">
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
