import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type React from "react";
import { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonBogotaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * ButtonBogota - Componente atómico de botón institucional
 *
 * Cumple con WCAG 2.2 AA:
 * - Área de toque mínima de 44x44px para accesibilidad móvil.
 * - Radio de borde distrital: 5px (`rounded-btn`).
 * - Contraste cromático superior a 4.5:1.
 * - Soporte para lectores de pantalla mediante aria-busy y aria-disabled.
 * - Estados de foco visible de alto contraste.
 */
export const ButtonBogota = forwardRef<HTMLButtonElement, ButtonBogotaProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-btn min-h-touch min-w-touch select-none " +
      "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-tertiary " +
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-dark shadow-sm border border-transparent",
      secondary:
        "bg-secondary text-text-main hover:bg-secondary-hover active:bg-secondary-dark shadow-sm border border-transparent font-semibold",
      tertiary:
        "bg-tertiary text-white hover:bg-tertiary-hover active:bg-tertiary-dark shadow-sm border border-transparent",
      outline:
        "bg-transparent text-primary border-2 border-primary hover:bg-primary-light active:bg-primary/10",
      ghost:
        "bg-transparent text-text-main hover:bg-black/5 active:bg-black/10 border border-transparent",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "text-sm px-3 py-2 gap-1.5",
      md: "text-base px-5 py-2.5 gap-2",
      lg: "text-lg px-6 py-3 gap-2.5",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            <span>{children}</span>
            {rightIcon && (
              <span className="inline-flex shrink-0" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  },
);

ButtonBogota.displayName = "ButtonBogota";
