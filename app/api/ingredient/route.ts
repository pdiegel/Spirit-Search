import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ingredientName = req.nextUrl.searchParams.get("name");
  if (!ingredientName) {
    return NextResponse.json({ message: "ingredientName is required" });
  }
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?i=${ingredientName}`,
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
