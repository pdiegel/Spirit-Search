import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("test1");
    const collection = db.collection("test");
    const testDocument = {
      name: "Old Fashioned",
      ingredients: ["Bourbon", "Bitters", "Sugar", "Orange Twist"],
      category: "Cocktail",
    };
    await collection.insertOne(testDocument);
    console.log("Successfully added test data!");
    return NextResponse.json({ message: "Successfully added test data!" });
  } catch (error) {
    console.error("Failed to add test data!", error);
    return NextResponse.json({ message: "Failed to add test data!" });
  }
}
