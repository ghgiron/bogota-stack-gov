"use client";

import type React from "react";
import { useState } from "react";

type FrameworkTab = "html" | "react" | "lit" | "vue";

const SNIPPETS: Record<FrameworkTab, string> = {
  html: `<!-- Componente Acordeón Accesible Bogotá Stack -->
<bogota-accordion class="distrito-accordion">
  <!-- Ítem 1: Desplegado con ARIA completo -->
  <div class="accordion-item border-2 border-[#CC0E35] rounded-[8px]">
    <h3>
      <button 
        type="button"
        id="btn-req-once-only"
        aria-expanded="true"
        aria-controls="sec-req-once-only"
        class="accordion-trigger focus:ring-2 focus:ring-[#CC0E35]">
        <span>¿Qué requisitos se eliminan con el Principio Once-Only?</span>
        <span aria-hidden="true" class="material-symbols-outlined">expand_more</span>
      </button>
    </h3>

    <div 
      id="sec-req-once-only" 
      role="region" 
      aria-labelledby="btn-req-once-only"
      class="accordion-content">
      <p>No se solicitan documentos ya en custodia distrital.</p>
    </div>
  </div>
</bogota-accordion>`,
  react: `import React, { useState } from 'react';
import { Accordion, AccordionItem } from '@bogota/ui-kit';

export const TramiteFaq = () => {
  const [open, setOpen] = useState(true);

  return (
    <Accordion variant="distrital" focusRing="#CC0E35">
      <AccordionItem
        id="faq-once-only"
        title="¿Qué requisitos se eliminan con el Principio Once-Only?"
        isOpen={open}
        onToggle={() => setOpen(!open)}
        badge="Interoperabilidad Activa"
      >
        <p>No se solicitan documentos ya en custodia distrital.</p>
      </AccordionItem>
    </Accordion>
  );
};`,
  lit: `import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bogota-accordion-item')
export class BogotaAccordionItem extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: String }) label = '';

  render() {
    return html\`
      <div class="accordion-item \${this.expanded ? 'expanded' : ''}">
        <button
          aria-expanded="\${this.expanded}"
          @click="\${() => this.expanded = !this.expanded}"
        >
          <span>\${this.label}</span>
        </button>
        <div ?hidden="\${!this.expanded}" role="region">
          <slot></slot>
        </div>
      </div>
    \`;
  }
}`,
  vue: `<template>
  <div class="bogota-accordion">
    <div class="accordion-item" :class="{ 'border-[#CC0E35]': isOpen }">
      <button
        :aria-expanded="isOpen"
        :aria-controls="contentId"
        @click="isOpen = !isOpen"
        class="accordion-trigger focus:ring-[#CC0E35]"
      >
        <span>{{ title }}</span>
        <span class="material-symbols-outlined" :class="{ 'rotate-180': isOpen }">expand_more</span>
      </button>
      <div v-show="isOpen" :id="contentId" role="region">
        <slot />
      </div>
    </div>
  </div>
</template>`,
};

export const CodeSnippetViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FrameworkTab>("html");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section aria-labelledby="code-implementation-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3
          className="font-heading text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2"
          id="code-implementation-heading"
        >
          <span className="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">
            code_blocks
          </span>
          Implementación en Código
        </h3>
        <span className="text-xs text-on-surface-variant font-mono">
          WCAG 2.2 AA Mandatory Spec
        </span>
      </div>

      {/* Dark Code Editor Container */}
      <div className="rounded-[15px] bg-[#181920] border border-[#2B2C37] overflow-hidden shadow-xl text-[#F3F0F0]">
        {/* Code Tab Bar + Copy Button */}
        <div className="px-4 py-2.5 bg-[#121318] border-b border-[#2B2C37] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab("html")}
              className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold flex items-center gap-1.5 focus:outline-none transition-colors ${
                activeTab === "html" ? "bg-primary text-white" : "text-[#A6ACCD] hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">html</span>
              HTML Nativo / Web Component
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("react")}
              className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-colors focus:outline-none ${
                activeTab === "react" ? "bg-primary text-white" : "text-[#A6ACCD] hover:text-white"
              }`}
            >
              React (JSX / Tailwind)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("lit")}
              className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-colors focus:outline-none ${
                activeTab === "lit" ? "bg-primary text-white" : "text-[#A6ACCD] hover:text-white"
              }`}
            >
              Lit Element
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("vue")}
              className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-colors focus:outline-none ${
                activeTab === "vue" ? "bg-primary text-white" : "text-[#A6ACCD] hover:text-white"
              }`}
            >
              Vue 3
            </button>
          </div>

          {/* Action Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#2A2B38] hover:bg-primary text-white text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary min-h-[36px]"
            title="Copiar código al portapapeles"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? "done" : "content_copy"}
            </span>
            <span>{copied ? "¡Copiado!" : "Copiar Código"}</span>
          </button>
        </div>

        {/* Code block with syntax highlighting */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-[#181920]">
          <pre className="text-[#E0E2EE] whitespace-pre">
            <code>{SNIPPETS[activeTab]}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};
