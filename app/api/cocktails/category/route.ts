import { CocktailDbClient } from "@/helpers/cocktailClass";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const client = new CocktailDbClient();
  const category = req.nextUrl.searchParams.get("category");

  if (!category) {
    return new NextResponse(null, { status: 400 });
  }

  let data;

  if (category === "Popular") {
    data = await client.fetchPopularCocktails();
  } else if (category === "New") {
    data = await client.fetchNewCocktails();
  } else if (category === "Random") {
    data = await client.fetchRandomCocktails();
  }

  return NextResponse.json(data);
}
