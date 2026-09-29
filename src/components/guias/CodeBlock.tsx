"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = "bash", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying code:", err);
    }
  };

  return (
    <div className="w-full rounded-[10px] bg-[#1E1E1E] border border-neutral-800 shadow-md overflow-hidden flex flex-col font-mono text-xs">
      {/* Header del bloque */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181818] border-b border-neutral-800 text-neutral-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
          <span className="text-[11px] font-semibold text-neutral-300">
            {title || language.toUpperCase()}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Código copiado" : "Copiar código"}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[11px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-tertiary ${
            copied
              ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
              : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Contenido de código */}
      <pre className="p-4 overflow-x-auto text-[#D4D4D4] leading-relaxed text-xs sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
