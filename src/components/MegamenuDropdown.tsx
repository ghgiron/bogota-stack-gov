"use client";

import type React from "react";
import { useEffect, useRef } from "react";

export interface MegamenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  labelledBy: string;
  children: React.ReactNode;
  widthClass?: string;
  alignClass?: string;
  paddingClass?: string;
  className?: string;
}

export const MegamenuDropdown: React.FC<MegamenuDropdownProps> = ({
  isOpen,
  onClose,
  id,
  labelledBy,
  children,
  widthClass = "w-[680px] lg:w-[860px]",
  alignClass = "left-0",
  paddingClass = "p-4 sm:p-5",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        const trigger = document.getElementById(labelledBy);
        trigger?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        const trigger = document.getElementById(labelledBy);
        if (trigger?.contains(e.target as Node)) {
          return;
        }
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, labelledBy]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      className={`absolute top-full mt-2 z-50 ${alignClass} ${widthClass} rounded-[15px] shadow-xl bg-surface-container-lowest border border-surface-container-high ${paddingClass} text-on-surface animate-in fade-in slide-in-from-top-2 duration-200 ${className}`}
    >
      {children}
    </div>
  );
};
