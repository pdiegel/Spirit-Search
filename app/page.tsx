"use client";
import DropDownSelector from "@/components/dropDownSelector";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function Home() {
  const [cocktails, setCocktails] = useState([] as any);
  const [apiData, setApiData] = useState({} as any);
  const { user, error, isLoading } = useUser();
  const [lowerCocktailIndex, setLowerCocktailIndex] = useState(0);

  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
      });

    fetch("/api/cocktails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCocktails(data.drinks);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-accent text-text w-full">
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {cocktails.length > 0 &&
          cocktails
            .slice(lowerCocktailIndex, lowerCocktailIndex + 10)
            .map((cocktail: any) => {
              return (
                <div key={cocktail.idDrink}>
                  <h2 className="text-xl font-bold text-center mb-1">
                    {cocktail.strDrink}
                  </h2>
                  <Image
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    height={150}
                    width={150}
                    className="rounded-md shadow-md"
                  ></Image>
                </div>
              );
            })}
      </div>
      <div className="flex justify-between w-full my-4">
        <button
          onClick={() => {
            setLowerCocktailIndex(lowerCocktailIndex - 10);
          }}
          disabled={lowerCocktailIndex < 10}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-secondary p-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setLowerCocktailIndex(lowerCocktailIndex + 10);
          }}
          disabled={lowerCocktailIndex > cocktails.length - 10}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-secondary  p-2 rounded-md"
        >
          Next
        </button>
      </div>
    </main>
  );
}
