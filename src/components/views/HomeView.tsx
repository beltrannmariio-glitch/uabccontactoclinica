import React from 'react';
import {
  Sparkles,
  Stethoscope,
  CalendarCheck,
  MapPin,
  PhoneCall,
  GraduationCap,
  ChevronRight,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Camera
} from 'lucide-react';
import { UabcCampusMexicaliLogo, SonrieUabcSymbol } from '../BrandLogos';
import { DENTAL_TREATMENTS } from '../../data/treatments';

interface HomeViewProps {
  onNavigate: (view: 'portada' | 'tratamientos' | 'citas' | 'galeria' | 'ubicacion' | 'contacto') => void;
  onOpenFacultyModal: () => void;
  onOpenAppointmentModal: (specialtyId?: string) => void;
  onSelectTreatment: (treatmentId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenFacultyModal,
  onOpenAppointmentModal,
  onSelectTreatment,
}) => {
  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* 1. SECCIÓN HERO / PANEL DE ACCESO RÁPIDO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#0d3b66] to-[#044343] text-white shadow-xl border border-teal-900/40">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-5 sm:p-7 space-y-5">
          {/* Barra Superior de la Portada: Identidad UABC Campus Mexicali y Sonríe UABC */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/15">
            {/* Logotipo Oficial UABC Campus Mexicali */}
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15">
              <UabcCampusMexicaliLogo inverted variant="compact" />
            </div>

            {/* Símbolo Gráfico Sonríe UABC */}
            <div className="flex items-center gap-2.5">
              <SonrieUabcSymbol size="sm" />
              <div className="text-right">
                <span className="text-xs font-black tracking-tight text-white block">
                  Sonríe UABC
                </span>
                <span className="text-[10px] text-teal-300 font-medium">
                  Atención Odontológica
                </span>
              </div>
            </div>
          </div>

          {/* Fotografía Real de Consulta Odontológica (Hero) */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/20 group">
            <img
              src="/public/assets/aistudio/images_5bba33e3.jpg"
              alt="Consulta odontológica y recepción de pacientes en la Facultad de Odontología UABC Mexicali"
              className="w-full h-52 sm:h-64 object-cover object-center group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-teal-200 tracking-wide uppercase">
                  Clínica Calafia · UABC Mexicali
                </span>
              </div>
              <p className="text-xs font-medium text-white/90">
                Atención odontológica integral y accesible para toda la comunidad.
              </p>
            </div>
          </div>

          {/* Mensaje Principal Obligatorio */}
          <div className="space-y-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold border border-teal-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Salud Bucal Mexicali</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              "Cuidar tu sonrisa es el primer paso para una buena salud"
            </h2>
            {/* Texto Introductorio Obligatorio */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Conoce las alternativas de atención odontológica de la Facultad de Odontología de la UABC, campus Mexicali. Consulta los servicios, descubre los tratamientos y encuentra nuestros medios de contacto.
            </p>
          </div>

          {/* Botón Destacado de Servicio de Citas */}
          <div className="pt-1">
            <button
              onClick={() => onOpenAppointmentModal()}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-teal-400 via-teal-500 to-sky-400 hover:opacity-95 text-slate-950 font-black text-sm flex items-center justify-between shadow-lg shadow-teal-500/25 transition-all active:scale-[0.99] group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950/10 flex items-center justify-center text-slate-950">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-black tracking-tight leading-none">
                    Solicitar Cita Odontológica
                  </span>
                  <span className="text-[11px] text-slate-800 font-medium">
                    Lunes a viernes de 8:00 a. m. a 4:00 p. m.
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Accesos Visuales Obligatorios */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {/* 1. Explorar tratamientos */}
            <button
              onClick={() => onNavigate('tratamientos')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-all active:scale-[0.98] group flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-2 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-black text-white">
                  Explorar tratamientos
                </span>
                <span className="text-[10px] text-slate-300">
                  Las 9 áreas odontológicas
                </span>
              </div>
            </button>

            {/* 2. Directorio de servicios */}
            <button
              onClick={() => onNavigate('tratamientos')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-all active:scale-[0.98] group flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center mb-2 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-black text-white">
                  Directorio de servicios
                </span>
                <span className="text-[10px] text-slate-300">
                  Limpiezas, caries, prótesis
                </span>
              </div>
            </button>

            {/* 3. Encuéntranos */}
            <button
              onClick={() => onNavigate('ubicacion')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-all active:scale-[0.98] group flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-black text-white">
                  Encuéntranos
                </span>
                <span className="text-[10px] text-slate-300">
                  Clínica Calafia y mapa
                </span>
              </div>
            </button>

            {/* 4. Información de contacto */}
            <button
              onClick={() => onNavigate('contacto')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-all active:scale-[0.98] group flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-2 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-black text-white">
                  Información de contacto
                </span>
                <span className="text-[10px] text-slate-300">
                  Teléfono, correo y Facebook
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. ACCESO DIRECTO INSTITUCIONAL "CONOCE NUESTRA FACULTAD" */}
      <section className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-teal-700 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 block">
              Formación y Comunidad UABC
            </span>
            <h3 className="text-base font-black text-slate-900 leading-tight">
              Conoce nuestra Facultad
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-sm">
              Espacio dedicado a la formación académica y clínica de futuros profesionales de la salud bucal en Mexicali.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenFacultyModal}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#0f345a] text-white text-xs font-bold transition-colors shrink-0"
        >
          Leer presentación
        </button>
      </section>

      {/* 3. VISTA PREVIA RÁPIDA DE ÁREAS CLÍNICAS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Áreas de Atención Odontológica
            </h3>
            <p className="text-xs text-slate-500">
              9 especialidades al servicio de tu bienestar bucal
            </p>
          </div>
          <button
            onClick={() => onNavigate('tratamientos')}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carrusel / Grid de 3 áreas destacadas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DENTAL_TREATMENTS.slice(0, 3).map((treatment) => (
            <div
              key={treatment.id}
              onClick={() => onSelectTreatment(treatment.id)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-28 overflow-hidden bg-slate-900">
                <img
                  src={treatment.imageUrl}
                  alt={treatment.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-bold bg-[#0a2540]/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {treatment.specialty}
                  </span>
                </div>
              </div>
              <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition-colors">
                    {treatment.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                    {treatment.shortDescription}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-teal-700">
                  <span>Más información</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INSTALACIONES OFICIALES Y GALERÍA EN FACEBOOK */}
      <section className="bg-gradient-to-r from-teal-50 to-sky-50 rounded-3xl p-5 border border-teal-200/80 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700">
              Instalaciones Reales
            </span>
            <h3 className="text-base font-black text-slate-900">
              Clínica Calafia en Mexicali
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipada para atención preventiva, quirúrgica e infantil en Zotoluca s/n, Calafia.
            </p>
          </div>
          <button
            onClick={() => onNavigate('galeria')}
            className="p-2.5 rounded-2xl bg-white border border-teal-200 text-teal-800 hover:bg-teal-100 transition-colors text-xs font-bold flex items-center gap-1.5 shrink-0"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Ver Galería</span>
          </button>
        </div>

        {/* Mosaico de 2 fotos oficiales reales */}
        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onNavigate('galeria')}
            className="relative h-28 sm:h-36 rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-slate-200"
          >
            <img
              src="/public/assets/aistudio/images__1__8726f80d.jpg"
              alt="Fachada Clínica Calafia UABC Mexicali"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-end p-2.5">
              <span className="text-[11px] font-bold text-white drop-shadow-sm">
                Fachada Clínica Calafia
              </span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('galeria')}
            className="relative h-28 sm:h-36 rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-slate-200"
          >
            <img
              src="/public/assets/aistudio/images__2__d33f04c8.jpg"
              alt="Atención infantil Pequeño Gran Cimarrón UABC"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-end p-2.5">
              <span className="text-[11px] font-bold text-white drop-shadow-sm">
                Odontopediatría Infantil
              </span>
            </div>
          </div>
        </div>

        {/* Enlace oficial a la galería en Facebook */}
        <div className="pt-1">
          <a
            href="https://www.facebook.com/facultadde.odontologiamexicali/photos/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>Ver Galería Oficial de Fotos en Facebook</span>
          </a>
        </div>
      </section>

      {/* 5. DATOS RÁPIDOS DE HORARIO Y UBICACIÓN */}
      <section className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-teal-800">
          <Clock className="w-4 h-4" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider">
            Horario de Consulta Clínica
          </h4>
        </div>
        <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-2xl">
          <span className="font-semibold text-slate-700">Lunes a Viernes</span>
          <span className="font-black text-[#0a2540]">8:00 a. m. – 4:00 p. m.</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Sábados y domingos permanece cerrado. Para urgencias o citas, comunícate al <a href="tel:6865573268" className="font-bold text-teal-700 underline">686 557 3268</a>.
        </p>
      </section>
    </div>
  );
};
