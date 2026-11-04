"use client";

import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Hash,
  KeyRound,
  Lock,
  Search,
  Shield,
  Smartphone,
  Tag,
} from "lucide-react";
import React, { useMemo, useState } from "react";

interface GlossaryTerm {
  term: string;
  category: "GovStack" | "Criptografía" | "Protocolo" | "Nacional";
  shortDef: string;
  fullDef: string;
  icon: React.ElementType;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Bounded Context (Contexto Delimitado)",
    category: "GovStack",
    shortDef: "Frontera arquitectónica que delimita responsabilidades exactas de un Building Block.",
    fullDef:
      "En GovStack y Domain-Driven Design (DDD), define los límites semánticos y técnicos de bb-identity-access. Este bloque es la autoridad de identidad y ciclo de vida de credenciales, pero delega estrictamente la autenticación de sesión corporativa a Keycloak y la ejecución criptográfica de emisión/verificación a Walt.id.",
    icon: Shield,
  },
  {
    term: "OID4VCI (OpenID for Verifiable Credential Issuance)",
    category: "Protocolo",
    shortDef: "Estándar internacional para que una billetera digital reciba credenciales firmadas.",
    fullDef:
      "Especificación basada en OAuth 2.0 que define el protocolo mediante el cual BWallet solicita y recibe credenciales verificables desde el Autenticador/VC (Walt.id Issuer). Emplea esquemas URI 'openid-credential-offer://' con tokens de un solo uso asociados a un IssuanceAuthorization vigente.",
    icon: Lock,
  },
  {
    term: "OID4VP (OpenID for Verifiable Presentations)",
    category: "Protocolo",
    shortDef: "Protocolo seguro para presentar credenciales verificables ante un verificador.",
    fullDef:
      "Estándar que permite a la ciudadanía presentar pruebas criptográficas desde BWallet hacia un trámite distrital en flujos Same-Device o Cross-Device (escaneando un código QR con la cámara del teléfono) sin enviar contraseñas ni revelar información no autorizada.",
    icon: Smartphone,
  },
  {
    term: "SD-JWT VC (Selective Disclosure JSON Web Token)",
    category: "Criptografía",
    shortDef: "Token criptográfico con divulgación selectiva de atributos personales.",
    fullDef:
      "Formato de credencial verificable estandarizado por el IETF y W3C que permite al titular de la credencial compartir únicamente los atributos requeridos (por ejemplo, 'mayor de 18 años' o 'grupo Sisbén B2') manteniendo ocultos el resto de datos sensibles como la fecha de nacimiento o número de cédula.",
    icon: KeyRound,
  },
  {
    term: "vp-oidc-bridge",
    category: "GovStack",
    shortDef: "Puente que transforma una presentación de billetera en una sesión de Keycloak.",
    fullDef:
      "Microservicio arquitectónico que actúa como intermediario entre el mundo descentralizado de BWallet (OID4VP) y el mundo federado tradicional de las entidades distritales (Keycloak IdP). Keycloak se federa hacia este puente para que los trámites reciban un JWT corporativo estándar.",
    icon: Cpu,
  },
  {
    term: "IssuanceAuthorization",
    category: "GovStack",
    shortDef: "Registro autoritativo de un solo uso que habilita la emisión de una credencial.",
    fullDef:
      "Contrato central emitido por bb-identity-access tras validar la identidad de la persona (KYC con ANI o sesión autenticada). Posee un TTL estricto (típicamente 5 minutos), un operationType ('issue' o 'renew') y una lista de claims autorizados que el emisor criptográfico no puede alterar.",
    icon: Lock,
  },
  {
    term: "identityHash",
    category: "Criptografía",
    shortDef: "Identificador seudonimizado irreversible por entidad distrital.",
    fullDef:
      "Hash criptográfico de sentido único (HMAC-SHA256 con sal secreta distrital particionada por organizationId) que vincula de manera segura los registros de una persona sin almacenar su cédula en texto plano, imposibilitando la correlación o rastreo cruzado entre distintas entidades.",
    icon: Hash,
  },
  {
    term: "NUIP (Número Único de Identificación Personal)",
    category: "Nacional",
    shortDef: "Número de identificación nacional oficial expedido por la Registraduría.",
    fullDef:
      "Identificador alfanumérico o numérico único de cada persona en Colombia. Se verifica en memoria contra la base de datos de la Registraduría Nacional del Estado Civil (RNEC/ANI) y se descarta inmediatamente tras generar el identityHash seudonimizado.",
    icon: Database,
  },
  {
    term: "ANI / RNEC (Archivo Nacional de Identificación)",
    category: "Nacional",
    shortDef: "Base de datos oficial de ~46 millones de colombianos de la Registraduría Nacional.",
    fullDef:
      "Fuente autoritativa estatal consultada mediante el servicio SOAP seguro consultarCedulas. bb-identity-access verifica en tiempo real que el estadoCedula sea rigurosamente 'VIGENTE', rechazando intentos con documentos cancelados por defunción, falsa identidad o pérdida de derechos políticos.",
    icon: Database,
  },
  {
    term: "WSCD (Hardware Seguro en Dispositivo Móvil)",
    category: "Criptografía",
    shortDef: "Entorno de hardware aislado en el teléfono para custodia de llaves privadas.",
    fullDef:
      "Wallet Secure Cryptographic Device. Se refiere al Secure Enclave (Apple iOS) o StrongBox Keymint (Android) donde BWallet genera y custodia las llaves privadas criptográficas protegidas por biometría local (Face ID / Touch ID). Las llaves nunca salen del hardware ni viajan por red.",
    icon: Smartphone,
  },
];

export const IdentityGlossary: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [openTerm, setOpenTerm] = useState<string | null>("Bounded Context (Contexto Delimitado)");

  const categories = ["Todos", "GovStack", "Protocolo", "Criptografía", "Nacional"];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDef.toLowerCase().includes(search.toLowerCase()) ||
        item.fullDef.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCategory === "Todos" || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  return (
    <div className="rounded-[15px] p-6 sm:p-8 bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-[#FAB62D]/20 text-[#594000] font-heading font-bold text-[11px] uppercase tracking-wider">
              Glosario Técnico GovStack
            </span>
            <span className="text-xs text-text-muted">• Terminología en Español Oficial</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-text-main flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#FAB62D]" />
            Diccionario de Términos de Identidad y Acceso
          </h3>
        </div>
      </div>

      {/* Buscador y Filtros */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Barra de búsqueda */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar término, protocolo o concepto técnico..."
            className="w-full h-10 pl-9 pr-4 text-xs sm:text-sm rounded-[8px] border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
          />
        </div>

        {/* Filtros por Categoría */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-heading font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#CC0E35] text-white shadow-2xs"
                  : "bg-surface-container-low text-text-muted hover:text-text-main hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Acordeón de Términos */}
      <div className="space-y-2">
        {filteredTerms.length === 0 ? (
          <div className="text-center py-8 text-xs text-text-muted">
            No se encontraron términos que coincidan con &ldquo;{search}&rdquo;.
          </div>
        ) : (
          filteredTerms.map((item) => {
            const isOpen = openTerm === item.term;
            const Icon = item.icon;

            return (
              <div
                key={item.term}
                className="rounded-[10px] border border-gray-200 bg-white overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenTerm(isOpen ? null : item.term)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-8 h-8 rounded-[6px] bg-gray-100 text-[#0049AE] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs sm:text-sm text-text-main">
                          {item.term}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-low text-text-muted font-mono">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{item.shortDef}</p>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 border-t border-gray-100 bg-surface-container-low/40 text-xs text-text-main leading-relaxed font-body">
                    <p>{item.fullDef}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default IdentityGlossary;
