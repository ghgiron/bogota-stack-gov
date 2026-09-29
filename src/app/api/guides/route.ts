import { getGuides, saveGuide } from "@/lib/db/guides";
import type { CreateGuideDTO, GuideStatus } from "@/types/guide";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as GuideStatus | null;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    const guides = await getGuides({
      status: status || undefined,
      category,
      search,
    });

    return NextResponse.json({ success: true, count: guides.length, data: guides });
  } catch (error) {
    console.error("[API GET /api/guides] Error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al consultar guías distritales." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        {
          success: false,
          error: "Los campos 'title' y 'content' (Markdown) son s.",
        },
        { status: 400 },
      );
    }

    const newGuideDTO: CreateGuideDTO = {
      title: body.title,
      content: body.content,
      status: body.status === "Publicado" ? "Publicado" : "Borrador",
      category: body.category || "General",
      author: body.author || "Secretaría General",
      summary: body.summary || body.title,
      slug: body.slug,
    };

    const created = await saveGuide(newGuideDTO);

    return NextResponse.json(
      { success: true, message: "Guía distrital creada con éxito.", data: created },
      { status: 201 },
    );
  } catch (error) {
    console.error("[API POST /api/guides] Error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al guardar la guía." },
      { status: 500 },
    );
  }
}
