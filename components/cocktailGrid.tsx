import Link from "next/link";
import Image from "next/image";

export default function CocktailGrid({
  cocktails,
  favoriteCocktails,
  onFavorite,
}: {
  cocktails: any[];
  favoriteCocktails: string[] | undefined;
  onFavorite?: Function | undefined;
}) {
  return (
    <div className="flex flex-wrap items-start gap-2 justify-center my-8 ">
      {cocktails.map((cocktail: any) => {
        return (
          <div
            className="border border-zinc-200 bg-zinc-50 hover:scale-105 transition-scale duration-200 relative self-end rounded-xl p-2"
            key={cocktail.idDrink}
          >
            <Image
              onClick={() => onFavorite!(cocktail.idDrink)}
              src={
                favoriteCocktails?.includes(cocktail.idDrink)
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/300px-Star%2A.svg.png?20070316213819"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png"
              }
              alt={cocktail.strDrink}
              height={15}
              width={15}
              className="absolute top-2 left-2 cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <Link
              href={`/cocktails/${cocktail.idDrink}`}
              className=" text-center"
            >
              <h2 className="text-center mb-1 w-full text-balance break-words max-w-[140px] font-medium">
                {cocktail.strDrink}
              </h2>
              <div className="mx-auto">
                <Image
                  src={cocktail.strDrinkThumb + "/preview"}
                  alt={cocktail.strDrink}
                  height={140}
                  width={140}
                  className="rounded-xl shadow-md"
                ></Image>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
