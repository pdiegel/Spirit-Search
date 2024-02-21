import { NextRequest, NextResponse } from "next/server";
import { CocktailDbClient } from "@/helpers/cocktailClass";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const client = new CocktailDbClient();
  const ingredientName = req.nextUrl.searchParams.get("name");
  let data;

  if (ingredientName) {
    data = await client.fetchIngredientDataByName(ingredientName);
  } else {
    data = await client.fetchAllIngredients();
  }

  return NextResponse.json(data);
}
