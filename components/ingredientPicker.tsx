"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function IngredientPicker({
  availableIngredients,
  pickedIngredients,
  onSelection,
}: {
  availableIngredients: Set<string>;
  pickedIngredients: string[];
  onSelection: (selection: string) => void;
}) {
  const [ingredientFilter, setIngredientFilter] = useState("");

  const pickedIngredientsDisplay = pickedIngredients.map(
    (ingredient, index) => (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out"
        key={index + "picked"}
        onClick={() => onSelection(ingredient)}
      >
        {ingredient}
      </motion.button>
    )
  );

  const availableIngredientsDisplay = Array.from(availableIngredients)
    .sort()
    .filter((i) => i.toLowerCase().includes(ingredientFilter.toLowerCase()))
    .filter((i) => !pickedIngredients.includes(i))
    .map((ingredient, index) => (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        key={index + "available"}
        onClick={() => onSelection(ingredient)}
      >
        {ingredient}
      </motion.button>
    ));

  return (
    <>
      <AnimatePresence>
        {pickedIngredients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2 mb-4 p-4 bg-zinc-50 border border-zinc-200 rounded-xl"
          >
            <h3 className="font-bold">Selected Ingredients:</h3>
            <div className="flex gap-2 flex-wrap overflow-y-auto">
              {pickedIngredientsDisplay}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
        layout="preserve-aspect"
        className="flex flex-col gap-2 h-min p-4 bg-zinc-50 border border-zinc-200 rounded-xl"
      >
        <h3 className="font-bold">Available Ingredients:</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="max-w-40 px-2 py-1 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out"
            placeholder="Search ingredients"
            value={ingredientFilter}
            onChange={(e) => setIngredientFilter(e.target.value)}
          />
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out"
            onClick={() => setIngredientFilter("")}
          >
            Clear
          </button>
        </div>

        <div className="flex gap-2 flex-wrap max-h-40 overflow-y-auto">
          {availableIngredients && availableIngredientsDisplay}
        </div>
      </motion.div>
    </>
  );
}
