import { motion } from "framer-motion";

export default function IngredientPicker({
  availableIngredients,
  pickedIngredients,
  onSelection,
}: {
  availableIngredients: string[];
  pickedIngredients: string[];
  onSelection: (selection: string) => void;
}) {
  const pickedIngredientsDisplay = pickedIngredients.map(
    (ingredient, index) => (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out"
        key={index + "picked"}
        onClick={() => onSelection(ingredient)}
      >
        {ingredient}
      </motion.button>
    )
  );

  const availableIngredientsDisplay = availableIngredients
    .filter((i) => !pickedIngredients.includes(i))
    .map((ingredient, index) => (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        key={index + "available"}
        onClick={() => onSelection(ingredient)}
      >
        {ingredient}
      </motion.button>
    ));

  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <h3>Selected Ingredients:</h3>
        <div className="flex gap-2 flex-wrap overflow-y-auto">
          {pickedIngredients && pickedIngredientsDisplay}
        </div>
      </div>
      <div className="flex flex-col gap-2 h-min">
        <h3>Available Ingredients:</h3>
        <div className="flex gap-2 flex-wrap h-40 overflow-y-auto">
          {availableIngredients && availableIngredientsDisplay}
        </div>
      </div>
    </>
  );
}
