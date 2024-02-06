import { NextResponse } from "next/server";

export async function GET() {
  const request = await fetch(
    "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list",
    {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 36000 },
    }
  );
  const data = await request.json();
  console.log(data);

  return NextResponse.json(data);
}
