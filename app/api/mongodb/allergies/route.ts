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
    return NextResponse.json(userData?.allergies);
  } catch (error) {
    return NextResponse.json({ message: "Failed to find allergy data!" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sub = req.nextUrl.searchParams.get("sub");
  try {
    const client = await clientPromise;
    const db = client.db("SpiritSearch");
    const collection = db.collection("UserData");
    const allergies = {
      sub: sub,
      allergies: body,
    };
    await collection.updateOne(
      { sub: sub },
      { $set: allergies },
      { upsert: true }
    );
    return NextResponse.json({ message: "Successfully added allergy data!" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add allergy data!" });
  }
}
