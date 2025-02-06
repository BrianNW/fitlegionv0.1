import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching exercises from backend...");
    const response = await fetch("http://localhost:5000/exercises"); // Calls backend API

    if (!response.ok) {
      throw new Error(`Failed to fetch exercises, status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Fetched exercises:");

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching exercises:", error);
    return NextResponse.json({ message: "Failed to fetch exercises" }, { status: 500 });
  }
}
