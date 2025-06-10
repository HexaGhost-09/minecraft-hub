import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  const { apk_name, version } = await req.json();
  await sql`
    INSERT INTO apk_downloads (apk_name, version, count)
    VALUES (${apk_name}, ${version}, 1)
    ON CONFLICT (apk_name, version)
    DO UPDATE SET count = apk_downloads.count + 1;
  `;
  return NextResponse.json({ success: true });
}

export async function GET() {
  const rows = await sql`SELECT * FROM apk_downloads`;
  return NextResponse.json(rows);
}