import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  // Get User Allergies
  const sub = req.nextUrl.searchParams.get("sub");
  try {
    const client = await clientPromise;
    const db = client.db("SpiritSearch");
    const collection = db.collection("UserData");
    const userData = await collection.findOne({ sub: sub });
    console.log("Successfully found test data!", userData);
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Failed to find test data!", error);
    return NextResponse.json({ message: "Failed to find test data!" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sub = req.nextUrl.searchParams.get("sub");
  try {
    const client = await clientPromise;
    const db = client.db("SpiritSearch");
    const collection = db.collection("UserData");
    const userData = body;
    await collection.updateOne(
      { sub: sub },
      { $set: userData },
      { upsert: true }
    );
    console.log("Successfully added test data!");
    return NextResponse.json({ message: "Successfully added test data!" });
  } catch (error) {
    console.error("Failed to add test data!", error);
    return NextResponse.json({ message: "Failed to add test data!" });
  }
}
