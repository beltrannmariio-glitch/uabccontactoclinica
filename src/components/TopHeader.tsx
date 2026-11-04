import React from 'react';
import { CalendarCheck, GraduationCap, Phone } from 'lucide-react';
import { UabcCampusMexicaliLogo, SonrieUabcSymbol } from './BrandLogos';

interface TopHeaderProps {
  onOpenFacultyModal: () => void;
  onOpenAppointmentModal: () => void;
  activeView: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenFacultyModal,
  onOpenAppointmentModal,
  activeView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a2540] text-white border-b border-teal-900/40 shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Identidad Oficial UABC Campus Mexicali */}
        <div className="flex items-center gap-2.5">
          <UabcCampusMexicaliLogo inverted variant="compact" />
          <div className="hidden sm:block h-7 w-[1px] bg-white/20 mx-1" />
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-tight text-white">
                Sonríe UABC
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            </div>
            <span className="text-[10px] text-teal-200 font-medium">
              Información y servicios odontológicos
            </span>
          </div>
        </div>

        {/* Acciones directas del encabezado */}
        <div className="flex items-center gap-2">
          {/* Botón de Citas */}
          <button
            onClick={onOpenAppointmentModal}
            className="py-1.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.97]"
            title="Solicitar Cita Odontológica"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Agendar Cita</span>
            <span className="xs:hidden">Cita</span>
          </button>

          {/* Botón Conoce nuestra Facultad */}
          <button
            onClick={onOpenFacultyModal}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center border border-white/10"
            title="Conoce nuestra Facultad"
            aria-label="Conoce nuestra Facultad"
          >
            <GraduationCap className="w-4 h-4 text-teal-300" />
          </button>
        </div>
      </div>

      {/* Sub-barra informativa de Sonríe UABC para móviles */}
      <div className="sm:hidden bg-[#071c31] px-4 py-1 flex items-center justify-between text-[10px] border-t border-white/10">
        <div className="flex items-center gap-1.5 text-teal-300 font-semibold">
          <SonrieUabcSymbol size="sm" className="w-4 h-4 p-0.5 rounded-md" />
          <span>Sonríe UABC · Información y servicios odontológicos</span>
        </div>
        <a href="tel:6865573268" className="text-white/80 hover:text-white font-mono flex items-center gap-1">
          <Phone className="w-3 h-3 text-teal-400" />
          <span>686 557 3268</span>
        </a>
      </div>
    </header>
  );
};
