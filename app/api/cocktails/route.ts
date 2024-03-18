import { CocktailDbClient } from "@/helpers/cocktailClass";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const client = new CocktailDbClient();
  const cocktailId = req.nextUrl.searchParams.get("id");
  const ingredientName = req.nextUrl.searchParams.get("name");
  let data;

  if (cocktailId) {
    data = await client.fetchCocktailById(cocktailId);
  } else if (ingredientName) {
    data = await client.fetchCocktailsByIngredient(ingredientName);
  } else {
    data = await client.fetchAllCocktails();
  }

  return NextResponse.json(data);
}
