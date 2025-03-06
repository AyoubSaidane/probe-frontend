// app/api/chats/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "123", title: "Chat with Bot 🤖" },
    { id: "456", title: "Shopping Assistant 🛍️" },
  ]);
}
