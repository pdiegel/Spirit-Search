import { Cocktail } from "@/interfaces/cocktails";

export async function getAllIngredients(): Promise<string[]> {
  const res = await fetch("/api/ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const data = await res.json();
    return data.drinks.map((i: Cocktail) => i.strIngredient1);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
