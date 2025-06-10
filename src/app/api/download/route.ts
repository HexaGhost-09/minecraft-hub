import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    console.log("Received POST to /api/download"); // Add logging
    const body = await req.json();
    console.log("Received body:", body); // Log request body

    const { apk_name, version } = body;
    if (!apk_name || !version) {
      return NextResponse.json({ error: "Missing apk_name or version" }, { status: 400 });
    }

    await sql`
      CREATE TABLE IF NOT EXISTS downloads (
        apk_name TEXT NOT NULL,
        version TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (apk_name, version)
      );
    `;

    await sql`
      INSERT INTO downloads (apk_name, version, count)
      VALUES (${apk_name}, ${version}, 1)
      ON CONFLICT (apk_name, version)
      DO UPDATE SET count = downloads.count + 1;
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in POST /api/download:", error); // Log errors
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await sql`SELECT apk_name, version, count FROM downloads;`;
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}