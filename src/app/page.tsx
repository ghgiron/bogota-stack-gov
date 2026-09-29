"use client";

import { type FacetType, HeroSearch } from "@/components/home/HeroSearch";
import { JtbdGrid } from "@/components/home/JtbdGrid";
import { ModulesGrid } from "@/components/home/ModulesGrid";
import { PactoCalidad } from "@/components/home/PactoCalidad";
import React, { useState } from "react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFacet, setActiveFacet] = useState<FacetType>("Todo");

  const handleSearchSubmit = () => {
    // Desplazar suavemente a la sección de tareas catalogadas
    const el = document.getElementById("jtbd-heading");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* 1. Hero Section y Buscador Semántico Gigante */}
      <HeroSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFacet={activeFacet}
        onFacetChange={setActiveFacet}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* 3. Grid de 14 Tareas Clave (Jobs to be Done) con Filtrado en Tiempo Real */}
      <JtbdGrid searchQuery={searchQuery} activeFacet={activeFacet} />

      {/* 4. Arquitectura Modular (Los 4 Módulos Fundacionales) */}
      <ModulesGrid />

      {/* 5. Sección de Valor & Compromiso Institucional (Pacto de Calidad Pública) */}
      <PactoCalidad />
    </div>
  );
}
