import Link from "next/link";
import Image from "next/image";

export default function CocktailGrid({ cocktails }: { cocktails: any[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center my-8">
      {cocktails.map((cocktail: any) => {
        return (
          <div
            key={cocktail.idDrink}
            className="self-end rounded-xl p-2 text-center border border-zinc-200 bg-zinc-50"
          >
            <h2 className="text-center mb-1 w-full text-balance break-words max-w-[140px]">
              {cocktail.strDrink}
            </h2>
            <Link href={`/cocktails/${cocktail.idDrink}`} className="mx-auto">
              <Image
                src={cocktail.strDrinkThumb + "/preview"}
                alt={cocktail.strDrink}
                height={140}
                width={140}
                className="rounded-xl shadow-md"
              ></Image>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
