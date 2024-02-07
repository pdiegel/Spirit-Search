import { motion, AnimatePresence } from "framer-motion";

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
        exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out"
        key={index}
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
        exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        key={index}
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
          <AnimatePresence>
            {pickedIngredients && pickedIngredientsDisplay}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-min">
        <h3>Available Ingredients:</h3>
        <div className="flex gap-2 flex-wrap h-40 overflow-y-auto">
          <AnimatePresence>
            {availableIngredients && availableIngredientsDisplay}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
