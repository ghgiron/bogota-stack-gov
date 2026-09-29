import { GoogleGenerativeAI } from "@google/generative-ai";
import { BOGOTA_STACK_SYSTEM_PROMPT } from "./prompts";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export const isGeminiConfigured = Boolean(apiKey && apiKey.trim().length > 0);

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Genera una respuesta en streaming simulada de alta fidelidad
 * cuando no se han inyectado las credenciales de Google Gemini en .env.local
 */
function createSimulatedStream(userQuery: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const q = userQuery.toLowerCase();

  let responseText = "";

  if (q.includes("once-only") || q.includes("una sola vez") || q.includes("datos")) {
    responseText = `### Aplicación del Principio Once-Only en el Trámite

Como **Arquitecto Jefe del Bogotá Stack**, la regla fundamental es **no solicitar al ciudadano datos que el Distrito o el Estado ya poseen**:

1. **Precarga Automática de Identidad y Residencia:**
   - Mediante la autenticación federada con **Keycloak / Carpeta Ciudadana**, se deben precargar automáticamente:
     * Nombres, Apellidos y Cédula de Ciudadanía.
     * Correo institucional o personal verificado.
     * Dirección de notificación registrada en Catastro Distrital.

2. **Interoperabilidad con Entidades Distritales:**
   - Si el trámite requiere validar el estrato socioeconómico o titularidad de un predio, se debe invocar el API del **Catastro Distrital** mediante microservicios internos en lugar de exigir adjuntar certificados PDF de tradición y libertad.

3. **Experiencia Ciudadana:**
   - Presenta los datos precargados en un panel de confirmación de solo lectura: *"Estos son tus datos registrados en la Alcaldía Mayor. ¿Deseas actualizarlos para este trámite?"*

4. **Beneficio:**
   - Reduce el tiempo promedio del trámite de 25 minutos a menos de **3 minutos**, eliminando hasta el 80% de los rechazos por errores de digitación.`;
  } else if (
    q.includes("stepper") ||
    q.includes("paso") ||
    q.includes("flujo") ||
    q.includes("divulgación")
  ) {
    responseText = `### Diseño de Trámite con Divulgación Progresiva (Steppers)

Para evitar la saturación cognitiva del ciudadano, estructuramos el trámite en **4 pasos secuenciales accesibles**:

\`\`\`
[1. Validación Identidad] ➔ [2. Datos Específicos] ➔ [3. Liquidación B-Pay] ➔ [4. Radicado Oficial]
\`\`\`

#### Paso 1: Identificación y Validación (Once-Only)
- Inicio de sesión con **Keycloak**.
- Autocompletado de Cédula y datos básicos.
- Verificación automática de requisitos habilitantes en segundo plano.

#### Paso 2: Datos Específicos del Trámite
- Solicitud de información novedosa que no repose en bases distritales.
- Formularios accesibles por teclado (WCAG 2.2 AA) con área táctil de al menos **44x44px** en botones y selectores.

#### Paso 3: Liquidación y Pago (Building Block B-Pay)
- Si el trámite tiene costo administrativo, se conecta directamente con la pasarela **B-Pay** para pago por PSE o billeteras digitales, sin redirecciones inseguras.

#### Paso 4: Confirmación y Notificación
- Generación de radicado oficial con código QR y estampado cronológico.
- Envío automático de confirmación a la **Carpeta Ciudadana** y vía SMS.`;
  } else if (q.includes("b-pay") || q.includes("pago") || q.includes("recaudo")) {
    responseText = `### Integración con el Building Block B-Pay (Pasarela Distrital)

**B-Pay** es el bloque de construcción oficial de la Secretaría General para recaudos distritales centralizados.

#### 1. Arquitectura de Integración
\`\`\`bash
# Endpoint oficial para iniciar una sesión de pago distrital
POST https://api.bogota.gov.co/v2/bpay/transacciones
Content-Type: application/json
Authorization: Bearer <token_distrital>

{
  "codigoTramite": "TRAM-CATASTRO-2026",
  "referenciaDistrital": "RAD-893214",
  "valor": 32500,
  "descripcion": "Expedición Certificado Especial Distrital",
  "urlRetorno": "https://tramites.bogota.gov.co/confirmacion"
}
\`\`\`

#### 2. Requerimientos de Seguridad
- Las llamadas deben realizarse estrictamente servidor a servidor con certificado mTLS.
- La confirmación de pago debe escucharse mediante **Webhooks con firma HMAC SHA-256**.

#### 3. UX en el Frontend (Kit UI Bogotá)
- Botón de acción con estilo \`ButtonBogota\` en color primario \`#CC0E35\` o secundario \`#FAB62D\`.
- Tamaño táctil mínimo de **44x44 píxeles** con anillo de foco visible (\`:focus-visible\`).`;
  } else {
    responseText = `### Recomendación de Arquitectura Bogotá Stack

Como **Arquitecto Jefe del Bogotá Stack**, te sugiero el siguiente enfoque estandarizado para la Secretaría General:

1. **Principio Once-Only:**
   - No solicites documentos ni datos que la Alcaldía Mayor de Bogotá ya posee. Conecta los servicios mediante la **Carpeta Ciudadana Distrital**.

2. **Divulgación Progresiva (Steppers):**
   - Estructura el trámite en pasos claros y secuenciales: Validación previa ➔ Datos específicos ➔ Pago/Adjuntos ➔ Radicado.

3. **Building Blocks Distritales Reutilizables:**
   - Utiliza **Keycloak** para autenticación única ciudadana.
   - Utiliza **B-Pay** para recaudos y pasarelas de pago PSE.
   - Conecta el servicio de **Notificaciones Electrónicas** para enviar radicados por SMS y correo.

4. **Accesibilidad WCAG 2.2 Nivel AA:**
   - Asegura controles táctiles mínimos de **44x44px**, botones con borde \`rounded-btn\` (5px) y tarjetas \`rounded-card\` (15px).
   - Usa los colores institucionales: Rojo Bogotá (\`#CC0E35\`), Amarillo (\`#FAB62D\`) y Azul (\`#3366CC\`).

*¿Deseas que profundicemos en la especificación técnica de algún paso o Building Block en particular?*`;
  }

  // Desglosar en palabras o frases para streaming suave
  const words = responseText.split(" ");
  let index = 0;

  return new ReadableStream({
    async start(controller) {
      const interval = setInterval(() => {
        if (index < words.length) {
          const chunk = (index === 0 ? "" : " ") + words[index];
          controller.enqueue(encoder.encode(chunk));
          index++;
        } else {
          clearInterval(interval);
          controller.close();
        }
      }, 25);
    },
  });
}

/**
 * Genera el flujo de streaming para la conversación utilizando Gemini Pro
 * o el fallback predictivo distrital si la API key no está disponible.
 */
export async function generateDistritalChatStream(
  messages: ChatMessage[],
): Promise<ReadableStream<Uint8Array>> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

  if (!isGeminiConfigured || !apiKey) {
    console.warn(
      "[Bogotá Stack AI] GEMINI_API_KEY no detectada. Activando motor predictivo simulado de streaming.",
    );
    return createSimulatedStream(lastUserMessage);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Se utiliza gemini-1.5-flash como modelo rápido y altamente capaz de Google
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: BOGOTA_STACK_SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    });

    // Formatear historial al formato de Gemini SDK
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history,
    });

    const result = await chat.sendMessageStream(lastUserMessage);
    const encoder = new TextEncoder();

    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (streamError) {
          console.error("[Bogotá Stack AI] Error durante el stream de Gemini:", streamError);
          controller.error(streamError);
        }
      },
    });
  } catch (error) {
    console.error("[Bogotá Stack AI] Error al inicializar chat con Gemini SDK:", error);
    // Fallback de contingencia
    return createSimulatedStream(lastUserMessage);
  }
}
