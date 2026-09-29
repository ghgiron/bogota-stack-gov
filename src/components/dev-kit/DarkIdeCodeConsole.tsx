"use client";

import type React from "react";
import { useState } from "react";

export type FrameworkTab = "react" | "webcomponents" | "lit" | "vue";

const CODE_EXAMPLES: Record<FrameworkTab, string> = {
  react: `// 1. Importación del kit de componentes certificados por la Alcaldía Mayor
import React, { useState } from 'react';
import { OnceOnlyForm, TextInput, TransactionButton } from '@bogota/ui-kit';
import { useBogotaInterop, CitizenIdentity } from '@bogota/bb-interop';

export const TramiteDistritalPage = () => {
  // Conexión automática al bus  y Keycloak distrital
  const { citizenData, isVerifiedByRegistraduria, isCatastroLinked } = useBogotaInterop();
  const [email, setEmail] = useState(citizenData?.email || 'sofia.restrepo@gobiernobogota.gov.co');

  const handleSafeContinue = async (payload: CitizenIdentity) => {
    // Sincronización en caliente con Kafka EventStore
    await payload.dispatchKafkaSnapshot({ eventType: 'TRAMITE_STEP_SAVED' });
  };

  return (
    <OnceOnlyForm
      isSSOAutofilled={true}
      wcagStrict="AA"
      onDraftSaved={() => console.log('Pausa programada registrada en EventStore')}
      className="max-w-2xl bg-surface-container-lowest"
    >
      <TextInput
        label="Documento de Identidad"
        value={citizenData?.cedula || '1.020.884.219'}
        readOnly={isVerifiedByRegistraduria}
        aria-describedby="registraduria-shield-badge"
      />
      <TextInput
        label="Nombre Completo"
        value={citizenData?.nombre || 'Sofía María Restrepo Gómez'}
        readOnly={true}
      />
      <TextInput
        label="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <TransactionButton
        variant="primary-bogota"
        onClick={handleSafeContinue}
      >
        Continuar Trámite Seguro
      </TransactionButton>
    </OnceOnlyForm>
  );
};`,

  webcomponents: `<!-- Web Component Nativo de Bogotá Stack (HTML5 Custom Elements) -->
<script type="module" src="https://cdn.bogota.gov.co/ui-kit/v2.4/bogota-once-only.js"></script>

<bogota-once-only-form
  cedula="1020884219"
  registraduria-valid="true"
  catastro-chip="AAA0123BDCF"
  wcag-level="AA"
  kafka-sync-interval="15"
>
  <span slot="helper-text">Datos protegidos certificados mediante el principio Once-Only.</span>
</bogota-once-only-form>

<script>
  const form = document.querySelector('bogota-once-only-form');
  form.addEventListener('bogota-draft-saved', (e) => {
    console.log('Snapshot emitido a EventStore:', e.detail.hash);
  });
</script>`,

  lit: `// Componente Lit v3 para Micro-frontends Distritales
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@bogota/ui-kit/lit/once-only-field';

@customElement('bogota-tramite-view')
export class BogotaTramiteView extends LitElement {
  @property({ type: String }) cedula = '1.020.884.219';
  @property({ type: Boolean }) onceOnlyActive = true;

  render() {
    return html\`
      <div class="bogota-card">
        <bogota-once-only-field
          .value=\${this.cedula}
          ?readonly=\${this.onceOnlyActive}
          label="Cédula de Ciudadanía"
        ></bogota-once-only-field>
        <button @click=\${this._dispatchKafka}>Guardar Borrador</button>
      </div>
    \`;
  }

  private _dispatchKafka() {
    this.dispatchEvent(new CustomEvent('draft-pause-requested'));
  }
}`,

  vue: `<!-- Vue 3 Composition API con @bogota/ui-kit -->
<template>
  <OnceOnlyContainer :is-sso-autofill="true" wcag-level="AA">
    <BogotaInput
      label="Documento de Identidad"
      :model-value="citizen.cedula"
      :readonly="isLocked"
    />
    <BogotaInput
      label="Correo Electrónico"
      v-model="citizen.email"
    />
    <button @click="saveSnapshot" class="btn-primary-bogota">
      Continuar Trámite Seguro
    </button>
  </OnceOnlyContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { OnceOnlyContainer, BogotaInput } from '@bogota/ui-kit-vue';
import { useKafkaSync } from '@bogota/bb-interop-vue';

const isLocked = ref(true);
const citizen = ref({
  cedula: '1.020.884.219',
  email: 'sofia.restrepo@gobiernobogota.gov.co'
});

const { emitSnapshot } = useKafkaSync();
const saveSnapshot = () => emitSnapshot(citizen.value);
</script>`,
};

export const DarkIdeCodeConsole: React.FC = () => {
  const [activeFramework, setActiveFramework] = useState<FrameworkTab>("react");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(CODE_EXAMPLES[activeFramework]);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    } catch (err) {
      console.error("Error al copiar código:", err);
    }
  };

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText("npm install @bogota/ui-kit @bogota/bb-interop");
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2200);
    } catch (err) {
      console.error("Error al copiar comando:", err);
    }
  };

  return (
    <section className="w-full bg-[#181825] rounded-[15px] overflow-hidden shadow-xl border border-gray-800 mt-6">
      {/* Barra Superior de Herramientas del IDE */}
      <div className="bg-[#1E1E2E] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800">
        <div className="flex items-center gap-4">
          {/* Indicador de archivo con círculos macOS */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#CC0E35]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#FAB62D]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#1B7A2E]" aria-hidden="true" />
            <span className="font-mono text-xs sm:text-sm text-white/90 font-medium pl-2">
              OnceOnlyTransactionForm.tsx
            </span>
          </div>

          {/* Pestañas de Lenguaje y Frameworks */}
          <div
            className="hidden md:flex items-center gap-1 pl-4"
            role="tablist"
            aria-label="Frameworks del Developer KIT"
          >
            {(
              [
                { id: "react", label: "React (Tailwind / TS)" },
                { id: "webcomponents", label: "Web Components (Nativo)" },
                { id: "lit", label: "Lit Element" },
                { id: "vue", label: "Vue 3 (Composition)" },
              ] as const
            ).map((tab) => {
              const isActive = activeFramework === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFramework(tab.id)}
                  className={`px-3 py-1 rounded-[5px] text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none ${
                    isActive
                      ? "bg-[#CC0E35] text-white shadow-xs"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Acciones de portapapeles y playground */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none ${
              copiedCode ? "bg-[#1B7A2E] text-white" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {copiedCode ? "check" : "content_copy"}
            </span>
            <span>{copiedCode ? "¡Copiado!" : "Copiar Fragmento"}</span>
          </button>

          <a
            href="https://stackblitz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-tertiary-container hover:bg-tertiary text-white text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              bolt
            </span>
            <span>Abrir en StackBlitz</span>
          </a>
        </div>
      </div>

      {/* Tabs móviles si la pantalla es reducida */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto p-2 bg-[#1E1E2E] border-b border-gray-800">
        {(
          [
            { id: "react", label: "React" },
            { id: "webcomponents", label: "Web Components" },
            { id: "lit", label: "Lit" },
            { id: "vue", label: "Vue 3" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFramework(tab.id)}
            className={`px-3 py-1 rounded-[5px] text-xs font-semibold whitespace-nowrap ${
              activeFramework === tab.id ? "bg-[#CC0E35] text-white" : "text-white/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bloque de Código con Syntax Highlighting */}
      <pre className="p-4 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-[#CDD6F4] bg-[#181825]">
        <code>{CODE_EXAMPLES[activeFramework]}</code>
      </pre>

      {/* Barra inferior con comando npm rápido */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#11111B] border-t border-gray-800">
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-white/80">
          <span className="text-primary font-bold">$</span>
          <span>npm install @bogota/ui-kit @bogota/bb-interop</span>
        </div>
        <button
          type="button"
          onClick={handleCopyInstall}
          className="text-xs text-[#FAB62D] hover:underline flex items-center gap-1 font-semibold focus-visible:ring-1 focus-visible:ring-[#FAB62D] rounded"
        >
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            {copiedInstall ? "check" : "file_copy"}
          </span>
          <span>{copiedInstall ? "¡Comando Copiado!" : "Copiar línea de instalación"}</span>
        </button>
      </div>
    </section>
  );
};
