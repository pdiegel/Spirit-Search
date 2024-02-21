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
    <div className="flex flex-wrap items-start gap-2 justify-center mb-6">
      {cocktails.map((cocktail: Cocktail) => {
        return (
          <div
            className="border border-zinc-200 bg-zinc-50 hover:scale-105 transition-scale duration-200 relative self-end rounded-xl p-2"
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
                className="absolute bottom-[115px] left-3 cursor-pointer hover:scale-150 transition-transform duration-200 bg-cyan-100/50 rounded-full p-1 "
              />
            )}
            <Link
              href={`/cocktails/${cocktail.cocktailId}`}
              className="text-center"
            >
              <h2 className="text-center mb-1 w-full text-balance break-words max-w-[140px] font-medium">
                {cocktail.name}
              </h2>
              <div className="mx-auto">
                <Image
                  src={cocktail.thumbnail + "/preview"}
                  alt={cocktail.name}
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
