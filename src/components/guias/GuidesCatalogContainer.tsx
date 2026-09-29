"use client";

import type { GuiaVinculacion } from "@/types/guide";
import { useMemo, useState } from "react";
import GuideCardList, { MASTER_GUIDES } from "./GuideCardList";
import GuidesFilterBar, { type RoleFilter } from "./GuidesFilterBar";

interface GuidesCatalogContainerProps {
  initialGuides?: GuiaVinculacion[];
}

export default function GuidesCatalogContainer({
  initialGuides,
}: GuidesCatalogContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<RoleFilter>("todas");

  const totalCount = initialGuides && initialGuides.length > 0 ? initialGuides.length : MASTER_GUIDES.length;

  // Cálculo del conteo filtrado
  const filteredCount = useMemo(() => {
    if (initialGuides && initialGuides.length > 0) {
      return initialGuides.filter((guide) => {
        const auds = guide.audiencias || guide.audiences || ["UX / UI"];
        const roles: string[] = [];
        for (const a of auds) {
          if (a.includes("Directivo") || a.includes("Estratégico")) roles.push("estrategico");
          else if (a.includes("UX") || a.includes("UI")) roles.push("ux-ui");
          else if (a.includes("Ingeniería") || a.includes("Dev")) roles.push("ingenieria");
        }
        if (roles.length === 0) roles.push("ux-ui");

        const matchesRole = selectedRole === "todas" || roles.includes(selectedRole);
        const query = searchQuery.trim().toLowerCase();
        if (!query) return matchesRole;

        const num = guide.numeroIdentificador || guide.number || "";
        const tit = guide.titulo || guide.title || "";
        const desc = guide.resumenEjecutivo || guide.summary || "";
        const tags = guide.badges || [guide.categoriaPrincipal || guide.category || ""];

        const matchesText =
          num.toLowerCase().includes(query) ||
          tit.toLowerCase().includes(query) ||
          desc.toLowerCase().includes(query) ||
          tags.some((tag) => tag.toLowerCase().includes(query));

        return matchesRole && matchesText;
      }).length;
    }

    return MASTER_GUIDES.filter((guide) => {
      const matchesRole = selectedRole === "todas" || guide.roles.includes(selectedRole);

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesRole;

      const matchesText =
        guide.number.toLowerCase().includes(query) ||
        guide.title.toLowerCase().includes(query) ||
        guide.fullName.toLowerCase().includes(query) ||
        guide.description.toLowerCase().includes(query) ||
        guide.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesRole && matchesText;
    }).length;
  }, [searchQuery, selectedRole, initialGuides]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRole("todas");
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Barra de Búsqueda y Filtros Tripartita */}
      <GuidesFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        totalGuides={totalCount}
        filteredCount={filteredCount}
      />

      {/* Grilla de Tarjetas */}
      <GuideCardList
        searchQuery={searchQuery}
        selectedRole={selectedRole}
        onResetFilters={handleResetFilters}
        guides={initialGuides}
      />
    </div>
  );
}
