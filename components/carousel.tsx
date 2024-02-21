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

  const getNextIndex = (index: number) => {
    return (index + 1) % cocktails.length;
  };

  const getPreviousIndex = (index: number) => {
    return (index - 1 + cocktails.length) % cocktails.length;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLowIndex(getNextIndex(lowIndex));
    }, scrollInterval);
    return () => clearInterval(interval);
  }, [lowIndex]);

  const getItems = () => {
    const newItems = [];
    for (let i = 0; i < numItems; i++) {
      // Calculate the current index in a circular manner (go back to the start if we reach the end of the array)
      const index = (lowIndex + i) % cocktails.length;
      newItems.push(cocktails[index]);
    }
    return newItems;
  };

  return (
    <div className="flex items-center lg:flex gap-4">
      <button
        onClick={() => setLowIndex(getPreviousIndex(lowIndex))}
        className="p-2 font-bold bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300 ease-in-out border border-gray-400"
      >
        {"<"}
      </button>
      {getItems().map((item) => (
        <motion.div
          key={item.cocktailId}
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between self-start -mb-4"
        >
          <Link href={`/cocktails/${item.cocktailId}`}>
            <Image
              src={item.thumbnail + "/preview"}
              alt={item.name}
              height={250}
              width={250}
              className="rounded-md hover:scale-105 transition-transform duration-200 ease-in-out"
            />
            <h3 className="text-center font-medium mt-2 h-20">{item.name}</h3>
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
