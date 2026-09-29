import type React from "react";

export const BbStrategicTab: React.FC = () => {
  return (
    <div
      className="flex flex-col gap-8 w-full"
      id="tab-estrategica"
      role="tabpanel"
      aria-labelledby="btn-tab-estrategica"
    >
      {/* Retorno de Inversión y Eficiencia Institucional */}
      <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col gap-4 border border-surface-container-high">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
            Retorno de Inversión y Eficiencia Institucional
          </h2>
          <span className="px-3 py-1 rounded-[5px] bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold">
            Plan Distrital de Desarrollo 2024-2027
          </span>
        </div>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          La adopción obligatoria de B-Pay para entidades centralizadas y descentralizadas optimiza
          las tarifas de procesamiento agregando volumen ante la red ACH / PSE, eliminando contratos
          individuales por entidad y reduciendo el tiempo de dispersión a Tesorería Distrital a T+1.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-[15px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
            <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">
              trending_down
            </span>
            <span className="font-heading text-lg font-bold text-on-surface">
              -70% en Costos Operativos
            </span>
            <span className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Disminución radical en comisiones por transacción frente a contratos individuales
              privados.
            </span>
          </div>

          <div className="p-5 rounded-[15px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
            <span
              className="material-symbols-outlined text-tertiary text-[28px]"
              aria-hidden="true"
            >
              account_balance
            </span>
            <span className="font-heading text-lg font-bold text-on-surface">
              Conciliación Unificada
            </span>
            <span className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Cierre contable automático enlazado con el Sistema de Información Financiera BOGDATA
              (SAP).
            </span>
          </div>

          <div className="p-5 rounded-[15px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
            <span
              className="material-symbols-outlined text-secondary text-[28px]"
              aria-hidden="true"
            >
              verified_user
            </span>
            <span className="font-heading text-lg font-bold text-on-surface">
              Soberanía de Datos
            </span>
            <span className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Resguardo de la información tributaria y financiera ciudadana en la nube privada del
              Distrito.
            </span>
          </div>
        </div>
      </div>

      {/* Casos de Éxito Emblemáticos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col gap-3 border border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">
              apartment
            </span>
            <span className="font-heading text-sm sm:text-base font-semibold text-on-surface">
              Secretaría Distrital de Hacienda
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Recaudo de Predial y Vehículos con más de 800,000 liquidaciones procesadas en fines de
            semana de pronto pago sin caídas de servicio.
          </p>
        </div>

        <div className="p-6 rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col gap-3 border border-surface-container-high">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-tertiary text-[22px]"
              aria-hidden="true"
            >
              directions_car
            </span>
            <span className="font-heading text-sm sm:text-base font-semibold text-on-surface">
              Secretaría Distrital de Movilidad
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Pago inmediato de comparendos y parqueadero de patios con desembargo y levantamiento de
            medida cautelar en menos de 15 minutos.
          </p>
        </div>

        <div className="p-6 rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col gap-3 border border-surface-container-high">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-secondary text-[22px]"
              aria-hidden="true"
            >
              map
            </span>
            <span className="font-heading text-sm sm:text-base font-semibold text-on-surface">
              Unidad de Catastro Distrital
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Expedición de certificados catastrales y trámites en línea con cobro digital e
            integración directa al Sistema Catastro Multipropósito.
          </p>
        </div>
      </div>
    </div>
  );
};
