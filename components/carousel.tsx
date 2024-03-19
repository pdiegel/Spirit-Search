"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cocktail } from "@/interfaces/cocktails";

export default function Carousel({
  cocktails,
  numItems = 3,
  scrollInterval = 3000,
}: {
  cocktails: Cocktail[];
  numItems?: number;
  scrollInterval?: number;
}) {
  const [lowIndex, setLowIndex] = useState(0);

  const getNextIndex = (index: number): number => {
    return (index + 1) % cocktails.length;
  };

  const getPreviousIndex = (index: number): number => {
    return (index - 1 + cocktails.length) % cocktails.length;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLowIndex(getNextIndex(lowIndex));
    }, scrollInterval);
    return () => clearInterval(interval);
  }, [lowIndex]);

  const getVisibleCocktails = (): Cocktail[] => {
    const visibleCocktails = [] as Cocktail[];
    for (let i = 0; i < numItems; i++) {
      // Calculate the current index in a circular manner (go back to the start if we reach the end of the array)
      const index = (lowIndex + i) % cocktails.length;
      visibleCocktails.push(cocktails[index]);
    }
    return visibleCocktails;
  };

  return (
    <div className="flex items-center lg:flex gap-4">
      <button
        onClick={() => setLowIndex(getPreviousIndex(lowIndex))}
        className="p-2 font-bold bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300 ease-in-out border border-gray-400"
      >
        {"<"}
      </button>
      {getVisibleCocktails().map((cocktail) => (
        <motion.div
          key={cocktail.cocktailId}
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between self-start -mb-4"
        >
          <Link href={`/cocktails/${cocktail.cocktailId}`}>
            <Image
              src={cocktail.thumbnail + "/preview"}
              alt={cocktail.name}
              height={250}
              width={250}
              className="rounded-lg hover:scale-105 transition-transform duration-200 ease-in-out"
            />
            <h3 className="text-center font-medium mt-2 h-20">
              {cocktail.name}
            </h3>
          </Link>
        </motion.div>
      ))}
      <button
        onClick={() => setLowIndex(getNextIndex(lowIndex))}
        className="p-2 font-bold bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300 ease-in-out border border-gray-400"
      >
        {">"}
      </button>
    </div>
  );
}
