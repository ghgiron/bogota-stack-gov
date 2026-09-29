import { deleteGuide, getGuideById, saveGuide } from "@/lib/db/guides";
import type { UpdateGuideDTO } from "@/types/guide";
import { type NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const guide = await getGuideById(params.id);

    if (!guide) {
      return NextResponse.json(
        { success: false, error: `Guía con ID '${params.id}' no encontrada.` },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: guide });
  } catch (error) {
    console.error(`[API GET /api/guides/${params.id}] Error:`, error);
    return NextResponse.json(
      { success: false, error: "Error interno al consultar la guía." },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const existing = await getGuideById(params.id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Guía con ID '${params.id}' no encontrada.` },
        { status: 404 },
      );
    }

    const body = await request.json();
    const updateDTO: UpdateGuideDTO = {
      title: body.title,
      content: body.content,
      status: body.status,
      category: body.category,
      author: body.author,
      summary: body.summary,
      slug: body.slug,
    };

    const updated = await saveGuide({ id: params.id, ...updateDTO });

    return NextResponse.json({
      success: true,
      message: "Guía actualizada con éxito.",
      data: updated,
    });
  } catch (error) {
    console.error(`[API PUT /api/guides/${params.id}] Error:`, error);
    return NextResponse.json(
      { success: false, error: "Error interno al actualizar la guía." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const deleted = await deleteGuide(params.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `No se pudo eliminar la guía con ID '${params.id}'.` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Guía eliminada correctamente.",
    });
  } catch (error) {
    console.error(`[API DELETE /api/guides/${params.id}] Error:`, error);
    return NextResponse.json(
      { success: false, error: "Error interno al eliminar la guía." },
      { status: 500 },
    );
  }
}
