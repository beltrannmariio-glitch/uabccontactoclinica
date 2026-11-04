import React from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { DentalTreatment } from '../data/treatments';

interface TreatmentDetailModalProps {
  treatment: DentalTreatment | null;
  onClose: () => void;
  onBookAppointment: (specialtyId: string) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onBookAppointment,
}) => {
  if (!treatment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Imagen de Cabecera con Botón de Cerrar */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={treatment.imageUrl}
            alt={treatment.altText}
            className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Badges superiores */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider bg-teal-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-sm">
              {treatment.specialty}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              aria-label="Cerrar detalle"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Título en la imagen */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[11px] font-semibold text-teal-300 block mb-0.5">
              Facultad de Odontología UABC Mexicali
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {treatment.name}
            </h3>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-6">
          {/* Explicación en palabras sencillas */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-teal-700">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Explicación sencilla para el paciente
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {treatment.simpleExplanation}
            </p>
          </div>

          {/* Lista de Procedimientos que incluye */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Servicios y tratamientos incluidos</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {treatment.services.map((service, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="font-semibold">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ¿Cuándo debes acudir? */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>¿Cuándo debes acudir a consulta?</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {treatment.whenToVisit.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ¿Cómo es el procedimiento? */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284c7]" />
              <span>Paso a paso del procedimiento</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              {treatment.procedureSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-sky-50/60 border border-sky-100">
                  <span className="w-5 h-5 rounded-full bg-[#0284c7] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Beneficios */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Beneficios para tu salud dental</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {treatment.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-emerald-900 font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tarjeta de Información Adicional */}
          <div className="p-3 bg-slate-100 rounded-2xl flex items-center justify-between text-xs text-slate-600">
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase">
                Público recomendado
              </span>
              <span className="font-semibold text-slate-800">{treatment.targetAudience}</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">
                Nivel de atención
              </span>
              <span className="font-semibold text-teal-800">{treatment.urgencyLevel}</span>
            </div>
          </div>
        </div>

        {/* Footer Modal con Botón de Acción Principal */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookAppointment(treatment.id);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0a2540] via-[#0284c7] to-[#0d9488] hover:opacity-95 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 transition-all"
          >
            <Calendar className="w-4 h-4 text-teal-300" />
            <span>Solicitar Cita para este Tratamiento</span>
          </button>
        </div>
      </div>
    </div>
  );
};
