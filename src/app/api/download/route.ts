import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const { apk_name, version } = await req.json();

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
  } catch (error: unknown) {
    let message = "Unknown error";
    if (error && typeof error === "object" && "message" in error) {
      message = String((error as { message?: string }).message);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await sql`SELECT apk_name, version, count FROM downloads;`;
    return NextResponse.json(rows);
  } catch (error: unknown) {
    let message = "Unknown error";
    if (error && typeof error === "object" && "message" in error) {
      message = String((error as { message?: string }).message);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}