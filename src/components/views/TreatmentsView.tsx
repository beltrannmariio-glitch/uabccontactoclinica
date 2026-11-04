import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';
import { DENTAL_TREATMENTS, DentalTreatment } from '../../data/treatments';

interface TreatmentsViewProps {
  onSelectTreatment: (treatmentId: string) => void;
  onBookAppointment: (specialtyId: string) => void;
}

export const TreatmentsView: React.FC<TreatmentsViewProps> = ({
  onSelectTreatment,
  onBookAppointment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'preventiva' | 'restauradora' | 'quirurgica' | 'infantil'>('todos');

  const filteredTreatments = DENTAL_TREATMENTS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'preventiva') {
      return ['prevencion-diagnostico', 'salud-encias', 'diagnostico-imagenes'].includes(t.id);
    }
    if (selectedFilter === 'restauradora') {
      return ['restauracion-dental', 'tratamiento-pulpar', 'rehabilitacion-oral', 'alineacion-dental'].includes(t.id);
    }
    if (selectedFilter === 'quirurgica') {
      return ['procedimientos-quirurgicos', 'tratamiento-pulpar'].includes(t.id);
    }
    if (selectedFilter === 'infantil') {
      return ['atencion-infantil'].includes(t.id);
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Encabezado de la Sección */}
      <div className="bg-gradient-to-r from-[#0a2540] to-[#0d9488] rounded-3xl p-6 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Directorio Clínico Universitario</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Directorio de Atención Odontológica
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
          Conoce en detalle las 9 áreas clínicas de la Facultad de Odontología UABC Mexicali. Tratamientos realizados por estudiantes y especialistas con altos estándares de calidad.
        </p>

        {/* Buscador interactivo */}
        <div className="pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar servicio (ej. caries, limpieza, muelas del juicio, niños, brackets...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-400 shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Filtros Rápidos de Especialidad */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { key: 'todos', label: 'Todas las 9 Áreas' },
          { key: 'preventiva', label: 'Prevención y Encías' },
          { key: 'restauradora', label: 'Restauración y Prótesis' },
          { key: 'quirurgica', label: 'Cirugía y Muelas' },
          { key: 'infantil', label: 'Atención Infantil' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setSelectedFilter(f.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === f.key
                ? 'bg-[#0a2540] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista de Tarjetas de las 9 Áreas */}
      <div className="space-y-4">
        {filteredTreatments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-6">
            <p className="text-sm font-bold text-slate-700">
              No se encontraron tratamientos con "{searchQuery}"
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Prueba buscando por "limpieza", "caries", "cirugía", "niños" o "endodoncia".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('todos');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
            >
              Restablecer búsqueda
            </button>
          </div>
        ) : (
          filteredTreatments.map((treatment, index) => (
            <div
              key={treatment.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group"
            >
              {/* Fotografía de buena resolución correspondiente al servicio */}
              <div className="relative md:w-5/12 h-52 md:h-auto overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={treatment.imageUrl}
                  alt={treatment.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 md:from-slate-950/40 via-transparent to-transparent" />
                
                {/* Badges sobre la foto */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-[#0a2540] text-white text-xs font-black flex items-center justify-center shadow-sm">
                    {index + 1}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-teal-500/90 backdrop-blur-md text-white px-2 py-0.5 rounded-full shadow-sm">
                    {treatment.specialty}
                  </span>
                </div>

                {/* Nivel de Urgencia en mobile */}
                <div className="absolute bottom-3 left-3 md:hidden">
                  <span className="text-[10px] font-bold bg-white/90 text-slate-900 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {treatment.urgencyLevel}
                  </span>
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                      {treatment.specialty}
                    </span>
                    <span className="hidden md:inline-block text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {treatment.urgencyLevel}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                    {treatment.name}
                  </h3>

                  {/* Breve descripción */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {treatment.shortDescription}
                  </p>

                  {/* Lista de tratamientos o procedimientos */}
                  <div className="pt-1 space-y-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Procedimientos frecuentes:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {treatment.services.slice(0, 4).map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botones: "Más información" (Obligatorio) y "Solicitar Cita" */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectTreatment(treatment.id)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a2540] font-black text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Más información</span>
                    <ChevronRight className="w-4 h-4 text-teal-600" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookAppointment(treatment.id)}
                    className="py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-200" />
                    <span>Agendar Cita</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
