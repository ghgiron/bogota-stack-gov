import { type ChatMessage, generateDistritalChatStream } from "@/lib/ai/gemini";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = body.messages as ChatMessage[] | undefined;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          error: "El cuerpo de la solicitud debe incluir un arreglo de mensajes no vacío.",
        },
        { status: 400 },
      );
    }

    const stream = await generateDistritalChatStream(messages);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[API POST /api/chat] Error general:", error);
    return NextResponse.json(
      {
        error: "Error interno al procesar la solicitud con el Agente Predictivo Distrital.",
      },
      { status: 500 },
    );
  }
}
