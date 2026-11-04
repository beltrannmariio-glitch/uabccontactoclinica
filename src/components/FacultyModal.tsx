import React from 'react';
import { X, GraduationCap, Building2, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { UabcCampusMexicaliLogo } from './BrandLogos';
import { IMAGES } from '../assets/images';

interface FacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLocation: () => void;
}

export const FacultyModal: React.FC<FacultyModalProps> = ({
  isOpen,
  onClose,
  onOpenLocation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header con Escudo Institucional UABC Campus Mexicali */}
        <div className="bg-gradient-to-r from-[#0a2540] via-[#0f345a] to-[#0d9488] px-5 py-4 text-white relative shrink-0">
          <div className="flex items-center justify-between">
            <UabcCampusMexicaliLogo inverted variant="compact" />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-lg font-black text-white mt-3">
            Conoce nuestra Facultad
          </h3>
          <span className="text-xs text-teal-200">
            Facultad de Odontología · UABC Campus Mexicali
          </span>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-5">
          {/* Fotografía Institucional Real del Muro */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
            <img
              src={IMAGES.muroUabc}
              alt="Muro oficial de la Facultad de Odontología UABC Mexicali con el escudo institucional"
              className="w-full h-48 sm:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
              <span className="text-xs font-semibold text-white/95 drop-shadow-sm">
                Universidad Autónoma de Baja California · Facultad de Odontología
              </span>
            </div>
          </div>

          {/* Texto Oficial Obligatorio sin añadidos no comprobados */}
          <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-teal-800 mb-2">
              <GraduationCap className="w-5 h-5 shrink-0" />
              <span className="text-xs font-extrabold uppercase tracking-wider">
                Presentación Institucional
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed italic">
              "La Facultad de Odontología de la UABC, campus Mexicali, es un espacio dedicado a la formación académica y clínica de futuros profesionales de la salud bucal. Sus actividades contribuyen al aprendizaje odontológico y a la atención de las necesidades de salud oral de la comunidad."
            </p>
          </div>

          {/* Segunda Fotografía de Enseñanza y Clínica Calafia */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
            <img
              src={IMAGES.fachadaCalafia}
              alt="Instalaciones de Clínica Calafia de la Facultad de Odontología Mexicali"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 bg-slate-50 border-t border-slate-200">
              <h5 className="font-bold text-xs text-slate-900">
                Clínica Calafia: Espacio de Formación y Servicio Comunitario
              </h5>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Donde estudiantes de licenciatura y posgrado brindan atención odontológica supervisada por especialistas y docentes.
              </p>
            </div>
          </div>

          {/* Datos Verificados del Campus */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Institución:</span>
              <span className="font-bold text-slate-900 text-right">Universidad Autónoma de Baja California</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Unidad Académica:</span>
              <span className="font-bold text-teal-800 text-right">Facultad de Odontología</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Campus:</span>
              <span className="font-bold text-slate-900 text-right">Mexicali</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Ubicación de Clínicas:</span>
              <span className="font-bold text-slate-800 text-right">Fracc. Calafia, Mexicali, B.C.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <a
            href="https://odontologia.mxl.uabc.mx/odo3/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5"
          >
            <span>Sitio Oficial UABC</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLocation();
            }}
            className="py-2.5 px-4 rounded-xl bg-[#0a2540] hover:bg-[#0f345a] text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-teal-300" />
            <span>Ver Ubicación y Horarios</span>
          </button>
        </div>
      </div>
    </div>
  );
};
