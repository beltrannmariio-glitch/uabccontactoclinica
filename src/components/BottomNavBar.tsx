import React from 'react';
import {
  Home,
  Stethoscope,
  Camera,
  MapPin,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';

export type AppView = 'portada' | 'tratamientos' | 'galeria' | 'ubicacion' | 'contacto';

interface BottomNavBarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenAppointmentModal: () => void;
  hasAppointments?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeView,
  onNavigate,
  onOpenAppointmentModal,
  hasAppointments = false,
}) => {
  const navItems: {
    id: AppView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'portada', label: 'Portada', icon: Home },
    { id: 'tratamientos', label: 'Tratamientos', icon: Stethoscope },
    { id: 'galeria', label: 'Galería', icon: Camera },
    { id: 'ubicacion', label: 'Ubicación', icon: MapPin },
    { id: 'contacto', label: 'Contacto', icon: PhoneCall },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around relative">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative transition-all rounded-xl ${
                isActive
                  ? 'text-[#0a2540]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Indicador de activo */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-1 rounded-full bg-teal-500 shadow-sm shadow-teal-500/50" />
              )}

              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-500'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-all ${
                  isActive
                    ? 'font-black text-[#0a2540]'
                    : 'font-semibold text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Botón flotante accesible para el Servicio de Citas */}
        <button
          onClick={onOpenAppointmentModal}
          className="absolute -top-6 right-4 sm:right-6 w-12 h-12 rounded-full bg-gradient-to-tr from-[#0a2540] via-[#0284c7] to-teal-500 text-white shadow-xl shadow-teal-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-2 border-white ring-2 ring-teal-500/20"
          title="Agendar Cita Odontológica"
          aria-label="Agendar Cita Odontológica"
        >
          <CalendarCheck className="w-5 h-5" />
          {hasAppointments && (
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
          )}
        </button>
      </div>
    </div>
  );
};
