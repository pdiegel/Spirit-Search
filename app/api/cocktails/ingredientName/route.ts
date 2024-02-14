import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ingredient = req.nextUrl.searchParams.get("name");
  console.log(ingredient);
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredient}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 36000 },
    }
  );
  const data = await request.json();

  return NextResponse.json(data);
}
