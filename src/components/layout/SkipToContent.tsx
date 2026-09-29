import type React from "react";

/**
 * SkipToContent - Enlace de salto de accesibilidad (WCAG 2.2 AA)
 * Permite a usuarios de teclado y lectores de pantalla saltar la navegación repetitiva.
 */
export const SkipToContent: React.FC = () => {
  return (
    <a href="#main-content" className="skip-link">
      Saltar al contenido principal
    </a>
  );
};
