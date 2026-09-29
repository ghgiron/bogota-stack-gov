"use client";

import type { ChatMessage as ChatMessageType } from "@/lib/ai/gemini";
import { Check, Copy, Sparkles, User } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useMemo, useState } from "react";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

type ParsedParagraph =
  | { type: "h3"; id: string; text: string }
  | { type: "h4"; id: string; text: string }
  | { type: "list"; id: string; items: { id: string; text: string }[] }
  | { type: "quote"; id: string; text: string }
  | { type: "p"; id: string; text: string };

type ParsedBlock =
  | { type: "code"; id: string; lang: string; codeContent: string }
  | { type: "prose"; id: string; paragraphs: ParsedParagraph[] };

/**
 * Renderizador simple y seguro de Markdown para burbujas de chat
 * Soporta encabezados, negrita, listas, citas y bloques de código
 */
const RenderMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const parsedBlocks: ParsedBlock[] = useMemo(() => {
    const rawParts = content.split(/(```[\s\S]*?```)/g);
    return rawParts.map((part, pIndex) => {
      const blockId = `b-${pIndex}`;
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const firstLine = lines[0]?.trim() || "";
        const isLang = /^[a-z0-9_-]+$/i.test(firstLine);
        const lang = isLang ? firstLine : "code";
        const codeContent = isLang ? lines.slice(1).join("\n") : lines.join("\n");
        return {
          type: "code",
          id: blockId,
          lang,
          codeContent,
        };
      }

      const paragraphs: ParsedParagraph[] = part
        .split("\n\n")
        .filter(Boolean)
        .map((p, paraIdx) => {
          const trimmed = p.trim();
          const paraId = `${blockId}-p-${paraIdx}`;
          if (trimmed.startsWith("### ")) {
            return {
              type: "h3",
              id: paraId,
              text: trimmed.replace(/^### /, ""),
            };
          }
          if (trimmed.startsWith("#### ")) {
            return {
              type: "h4",
              id: paraId,
              text: trimmed.replace(/^#### /, ""),
            };
          }
          if (trimmed.includes("\n- ") || trimmed.startsWith("- ")) {
            const listItems = trimmed
              .split("\n")
              .filter((l) => l.trim().startsWith("- "))
              .map((item, itemIdx) => ({
                id: `${paraId}-li-${itemIdx}`,
                text: item.replace(/^- /, ""),
              }));
            return {
              type: "list",
              id: paraId,
              items: listItems,
            };
          }
          if (trimmed.startsWith("> ")) {
            return {
              type: "quote",
              id: paraId,
              text: trimmed.replace(/^> /, ""),
            };
          }
          return {
            type: "p",
            id: paraId,
            text: trimmed,
          };
        });

      return {
        type: "prose",
        id: blockId,
        paragraphs,
      };
    });
  }, [content]);

  return (
    <div className="space-y-3 font-body text-sm leading-relaxed">
      {parsedBlocks.map((block) => {
        if (block.type === "code") {
          return (
            <div
              key={block.id}
              className="my-3 rounded-btn overflow-hidden border border-gray-700 bg-[#1A1C20] text-white shadow-xs"
            >
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#23262C] border-b border-gray-700 text-xs text-white/70">
                <span className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                  {block.lang}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(block.codeContent, block.id)}
                  className="inline-flex items-center gap-1 text-[11px] hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-secondary"
                  title="Copiar código"
                  aria-label="Copiar bloque de código al portapapeles"
                >
                  {copiedId === block.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 overflow-x-auto font-mono text-xs text-gray-200 leading-relaxed m-0">
                <code>{block.codeContent}</code>
              </pre>
            </div>
          );
        }

        return (
          <div key={block.id} className="space-y-2">
            {block.paragraphs.map((item) => {
              if (item.type === "h3") {
                return (
                  <h3
                    key={item.id}
                    className="font-heading font-extrabold text-base text-text-main mt-3 mb-1"
                  >
                    {item.text}
                  </h3>
                );
              }
              if (item.type === "h4") {
                return (
                  <h4
                    key={item.id}
                    className="font-heading font-bold text-sm text-text-main mt-2 mb-1"
                  >
                    {item.text}
                  </h4>
                );
              }
              if (item.type === "list") {
                return (
                  <ul key={item.id} className="list-disc pl-5 space-y-1 text-sm text-text-main">
                    {item.items.map((li) => (
                      <li key={li.id}>{li.text}</li>
                    ))}
                  </ul>
                );
              }
              if (item.type === "quote") {
                return (
                  <blockquote
                    key={item.id}
                    className="border-l-4 border-primary pl-3 py-1 my-2 italic text-xs text-text-muted bg-primary/5 rounded-r"
                  >
                    {item.text}
                  </blockquote>
                );
              }

              return (
                <p key={item.id} className="text-text-main leading-relaxed">
                  {item.text}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isStreaming = false }) => {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-card transition-colors ${
        isAssistant
          ? "bg-surface border border-gray-200 shadow-xs"
          : "bg-bg-main border border-gray-200/80 ml-6 sm:ml-12"
      }`}
    >
      {/* Avatar */}
      <div className="shrink-0">
        {isAssistant ? (
          <div className="w-9 h-9 rounded-btn bg-white border border-gray-200 p-1 flex items-center justify-center shadow-xs">
            <Image
              src="/images/logo_bogota_color.png"
              alt="Bogotá Stack AI"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-btn bg-primary text-white flex items-center justify-center font-bold shadow-xs">
            <User className="w-5 h-5" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Contenido del Mensaje */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-xs text-text-main">
            {isAssistant ? "Arquitecto Jefe — Bogotá Stack" : "Funcionario Distrital"}
          </span>
          {isAssistant && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-secondary/20 text-secondary-dark px-1.5 py-0.5 rounded border border-secondary/30">
              <Sparkles className="w-2.5 h-2.5" aria-hidden="true" />
              Gemini Pro
            </span>
          )}
        </div>

        {/* Texto renderizado */}
        <div className="text-sm">
          <RenderMarkdown content={message.content} />
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse align-middle" />
          )}
        </div>
      </div>
    </div>
  );
};
