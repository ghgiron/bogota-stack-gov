import type React from "react";

export const A11yMatrixTable: React.FC = () => {
  return (
    <section aria-labelledby="a11y-heading" className="flex flex-col gap-4">
      <div>
        <h3
          className="font-heading text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2"
          id="a11y-heading"
        >
          <span className="material-symbols-outlined text-[#0049AE] text-[24px]" aria-hidden="true">
            verified
          </span>
          Matriz de Cumplimiento de Accesibilidad (WAI-ARIA 1.2 / WCAG 2.2 AA)
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Comportamientos s certificados para software y portales de la administración distrital de
          Bogotá.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-[15px] border border-surface-container-high overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high font-heading text-on-surface font-bold">
                <th className="py-3 px-4 sm:px-6" scope="col">
                  Criterio / Evento
                </th>
                <th className="py-3 px-4 sm:px-6" scope="col">
                  Implementación Técnica
                </th>
                <th className="py-3 px-4 sm:px-6" scope="col">
                  Resultado Esperado en Lectores de Pantalla
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high text-on-surface">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold font-mono text-primary text-xs sm:text-sm">
                  Tecla Enter / Espacio
                </td>
                <td className="py-3.5 px-4 sm:px-6">
                  Dispara el handler{" "}
                  <code className="font-mono bg-surface-container px-1 py-0.5 rounded">click</code>{" "}
                  nativo del elemento &lt;button&gt;
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-on-surface-variant">
                  Anuncia &quot;Contraído&quot; o &quot;Expandido&quot; tras el cambio inmediato de
                  estado.
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold font-mono text-primary text-xs sm:text-sm">
                  Flechas Abajo / Arriba
                </td>
                <td className="py-3.5 px-4 sm:px-6">
                  Focus manager traslada el foco al siguiente o anterior trigger
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-on-surface-variant">
                  Lectura fluida y secuencial sin necesidad de tabular por los contenidos.
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold font-mono text-primary text-xs sm:text-sm">
                  Teclas Home / End
                </td>
                <td className="py-3.5 px-4 sm:px-6">
                  Enfoca el primer (
                  <code className="font-mono bg-surface-container px-1 py-0.5 rounded">Home</code>)
                  o último (
                  <code className="font-mono bg-surface-container px-1 py-0.5 rounded">End</code>)
                  botón de la lista
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-on-surface-variant">
                  Atajo directo para navegación eficiente en listas largas de trámites.
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold font-mono text-primary text-xs sm:text-sm">
                  Ratio de Contraste
                </td>
                <td className="py-3.5 px-4 sm:px-6">
                  Texto #1B1C1C sobre fondo #FBF9F8 (7.8:1) y foco #CC0E35 (4.5:1)
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-on-surface-variant">
                  Legibilidad total para personas con baja visión o daltónicos.
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold font-mono text-primary text-xs sm:text-sm">
                  Área de Toque (Target Size)
                </td>
                <td className="py-3.5 px-4 sm:px-6">
                  Altura táctil mínima de 48px en cada cabecera interactiva
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-on-surface-variant">
                  Cumple WCAG 2.5.8 (Target Size Minimum - Nivel AA).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
