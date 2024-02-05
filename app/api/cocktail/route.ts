import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required" });
  }
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`,
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
