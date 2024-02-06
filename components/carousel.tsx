"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Carousel({ items }: { items: any[] }) {
  const [lowIndex, setLowIndex] = useState(0);
  const numItems = 3;

  const getNextIndex = (index: number) => {
    return (index + 1) % items.length;
  };

  const getPreviousIndex = (index: number) => {
    return (index - 1 + items.length) % items.length;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLowIndex(getNextIndex(lowIndex));
    }, 5000);
    return () => clearInterval(interval);
  }, [lowIndex]);

  const getItems = () => {
    const newItems = [];
    for (let i = 0; i < numItems; i++) {
      // Calculate the current index in a circular manner (go back to the start if we reach the end of the array)
      const index = (lowIndex + i) % items.length;
      newItems.push(items[index]);
    }
    return newItems;
  };

  return (
    <div className="flex items-center font-mono text-sm lg:flex gap-4 relative">
      <button onClick={() => setLowIndex(getPreviousIndex(lowIndex))}>
        {"<"}
      </button>
      {getItems().map((item) => (
        <motion.div
          key={item.idDrink}
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between"
        >
          <Link href={`/cocktails/${item.idDrink}`}>
            <Image
              src={item.strDrinkThumb + "/preview"}
              alt={item.strDrink}
              height={250}
              width={250}
            />
            <h3 className="text-center">{item.strDrink}</h3>
          </Link>
        </motion.div>
      ))}
      <button onClick={() => setLowIndex(getNextIndex(lowIndex))}>{">"}</button>
    </div>
  );
}
