import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  // Get User Allergies
  const sub = req.nextUrl.searchParams.get("sub");
  try {
    const client = await clientPromise;
    const db = client.db("SpiritSearch");
    const collection = db.collection("UserData");
    const testDocument = await collection.findOne({ sub: sub });
    console.log("Successfully found test data!", testDocument);
    return NextResponse.json({
      message: "Successfully found test data!",
      testDocument,
    });
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
    const testAllergies = {
      sub: sub,
      allergies: body?.allergies,
    };
    await collection.updateOne(
      { sub: sub },
      { $set: testAllergies },
      { upsert: true }
    );
    console.log("Successfully added test data!");
    return NextResponse.json({ message: "Successfully added test data!" });
  } catch (error) {
    console.error("Failed to add test data!", error);
    return NextResponse.json({ message: "Failed to add test data!" });
  }
}
