"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Cocktail } from "@/interfaces/cocktails";

export default function CocktailGrid({
  cocktails,
  favoriteCocktails,
  onFavorite,
}: {
  cocktails: Cocktail[];
  favoriteCocktails?: string[];
  onFavorite?: Function;
}) {
  const { user } = useUser();
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {cocktails.map((cocktail: Cocktail) => {
        return (
          <div
            className="hover:scale-105 transition-scale duration-200 relative"
            key={cocktail.cocktailId}
          >
            {user && (
              <Image
                onClick={() => onFavorite!(cocktail.cocktailId)}
                src={
                  favoriteCocktails?.includes(cocktail.cocktailId)
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/300px-Star%2A.svg.png?20070316213819"
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png"
                }
                alt={cocktail.name}
                height={30}
                width={30}
                className="absolute top-1/8 left-1/8 cursor-pointer hover:scale-150 transition-transform duration-200 bg-white/70 rounded-full p-1 z-10"
              />
            )}
            <Link
              href={`/cocktails/${cocktail.cocktailId}`}
              className="flex text-center"
            >
              <div className="relative w-full">
                <Image
                  src={cocktail.thumbnail + "/preview"}
                  alt={cocktail.name}
                  height={160}
                  width={160}
                  className="rounded-xl w-full"
                />
                <p className="absolute bottom-0 text-center p-1 w-full text-balance break-words font-medium bg-primaryDark/70 rounded-b-xl shadow-md z-10">
                  {cocktail.name}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
