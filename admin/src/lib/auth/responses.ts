import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function errorResponse(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export function validationMessage(error: ZodError) {
  return error.issues[0]?.message || "Dữ liệu không hợp lệ.";
}

