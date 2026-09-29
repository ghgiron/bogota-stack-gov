import { type NextRequest, NextResponse } from "next/server";

export interface InitiatePaymentPayload {
  amount?: number;
  taxpayerDocument?: string;
  taxpayerName?: string;
  description?: string;
  referenceId?: string;
  redirectUrl?: string;
  departmentOrEntity?: string;
}

/**
 * Mock Endpoint para la Pasarela de Pagos Distrital (B-Pay / PSE)
 * Valida el payload de pago e introduce una latencia artificial de 500ms
 * para emular el procesamiento de pasarela financiera gubernamental.
 */
export async function POST(request: NextRequest) {
  try {
    let body: InitiatePaymentPayload;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          status: "ERROR",
          statusCode: 400,
          error: "MALFORMED_JSON",
          message: "El cuerpo de la solicitud no es un formato JSON válido.",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    const { amount, taxpayerDocument, description, referenceId, redirectUrl } = body;

    // Validación: Monto
    if (amount === undefined || typeof amount !== "number" || amount <= 0 || Number.isNaN(amount)) {
      return NextResponse.json(
        {
          status: "ERROR",
          statusCode: 400,
          error: "INVALID_AMOUNT",
          message: "El monto a liquidar debe ser un valor numérico superior a 0 COP.",
          field: "amount",
          received: amount,
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    // Validación: Documento del Contribuyente
    if (
      !taxpayerDocument ||
      typeof taxpayerDocument !== "string" ||
      taxpayerDocument.trim() === ""
    ) {
      return NextResponse.json(
        {
          status: "ERROR",
          statusCode: 400,
          error: "MISSING_TAXPAYER_DOCUMENT",
          message: "El documento del contribuyente es  para la conciliación fiscal distrital.",
          field: "taxpayerDocument",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    // Validación: Descripción
    if (!description || typeof description !== "string" || description.trim() === "") {
      return NextResponse.json(
        {
          status: "ERROR",
          statusCode: 400,
          error: "MISSING_DESCRIPTION",
          message: "La descripción del concepto de pago o trámite es obligatoria.",
          field: "description",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    // Latencia artificial de 500ms para simular red distrital y pasarela bancaria
    await new Promise((resolve) => setTimeout(resolve, 500));

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 horas
    const generatedPaymentId = `PAY-BOG-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalRefId = referenceId || `REF-${now.getTime()}`;

    // Respuesta 201 Created simulada
    return NextResponse.json(
      {
        status: "CREATED",
        statusCode: 201,
        message: "Sesión de recaudo distrital iniciada exitosamente.",
        data: {
          paymentId: generatedPaymentId,
          referenceId: finalRefId,
          amount: amount,
          currency: "COP",
          gateway: "B-PAY_DISTRICENTAL_PSE",
          checkoutUrl: `https://b-pay.bogota.gov.co/checkout/session/${generatedPaymentId}?token=mock_sec_${Math.random().toString(36).substring(2, 12)}`,
          taxpayer: {
            document: taxpayerDocument,
            name: body.taxpayerName || "Contribuyente Validado Once-Only",
          },
          concept: description,
          entity: body.departmentOrEntity || "Secretaría General de la Alcaldía Mayor de Bogotá",
          returnUrl: redirectUrl || "https://tramites.bogota.gov.co/confirmacion",
          issuedAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
        },
        metadata: {
          traceId: `trace_bog_${Math.random().toString(36).substring(2, 15)}`,
          environment: "sandbox-emulated",
          version: "v2.1.0",
          serverNode: "bpay-gateway-dc01-bogota",
        },
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "X-Bogota-Api-Version": "v2.1.0",
          "X-Response-Time-Simulated": "500ms",
        },
      },
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Error interno no controlado.";
    return NextResponse.json(
      {
        status: "INTERNAL_ERROR",
        statusCode: 500,
        error: "INTERNAL_GATEWAY_ERROR",
        message: errorMsg,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
