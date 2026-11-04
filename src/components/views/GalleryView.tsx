import React, { useState } from 'react';
import {
  Camera,
  ExternalLink,
  Sparkles,
  Maximize2,
  X,
  ChevronRight,
  Building2,
  Stethoscope,
  Info
} from 'lucide-react';
import { DENTAL_TREATMENTS, REAL_FACILITY_PHOTOS, RealFacilityPhoto } from '../../data/treatments';

interface GalleryViewProps {
  onSelectTreatment: (treatmentId: string) => void;
  onBookAppointment: (specialtyId: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  onSelectTreatment,
  onBookAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<'tratamientos' | 'instalaciones'>('tratamientos');
  const [selectedImage, setSelectedImage] = useState<{
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    treatmentId?: string;
    isRealFacility?: boolean;
  } | null>(null);

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-[#0a2540] via-[#0f345a] to-[#0d9488] rounded-3xl p-6 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold border border-white/15">
          <Camera className="w-3.5 h-3.5" />
          <span>Galería Visual Oficial</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Conoce nuestros tratamientos
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
          Fotografías profesionales y no invasivas de las nueve áreas odontológicas y de las instalaciones clínicas de la Facultad de Odontología UABC Mexicali.
        </p>

        {/* Enlace Oficial a la Galería de Fotos de Facebook */}
        <div className="pt-2">
          <a
            href="https://www.facebook.com/facultadde.odontologiamexicali/photos/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md transition-all active:scale-[0.98]"
          >
            <span>Ver Álbum Completo de Fotos en Facebook</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Selector de Pestañas de la Galería */}
      <div className="flex items-center gap-2 p-1 bg-slate-200/80 rounded-2xl">
        <button
          onClick={() => setActiveTab('tratamientos')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'tratamientos'
              ? 'bg-white text-[#0a2540] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
          <span>9 Áreas Odontológicas ({DENTAL_TREATMENTS.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('instalaciones')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'instalaciones'
              ? 'bg-white text-[#0a2540] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Instalaciones UABC Mexicali ({REAL_FACILITY_PHOTOS.length})</span>
        </button>
      </div>

      {/* PESTAÑA 1: LAS 9 FOTOS DIFERENTES Y PROFESIONALES DE LAS 9 ÁREAS */}
      {activeTab === 'tratamientos' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {DENTAL_TREATMENTS.map((treatment, idx) => (
            <div
              key={treatment.id}
              onClick={() =>
                setSelectedImage({
                  title: treatment.name,
                  subtitle: treatment.specialty,
                  description: treatment.shortDescription,
                  imageUrl: treatment.imageUrl,
                  treatmentId: treatment.id,
                })
              }
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Contenedor de Imagen Uniforme */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={treatment.imageUrl}
                  alt={treatment.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-bold text-white/90 drop-shadow-sm truncate">
                    {treatment.specialty}
                  </span>
                </div>
                {/* Botón de ampliar en hover */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-950/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-lg bg-[#0a2540] text-white text-[10px] font-black flex items-center justify-center">
                  {idx + 1}
                </div>
              </div>

              {/* Pie de foto */}
              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-xs sm:text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                    {treatment.shortDescription}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-teal-700">
                  <span>Ver detalle</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* PESTAÑA 2: FOTOGRAFÍAS REALES DE LAS INSTALACIONES UABC MEXICALI */
        <div className="space-y-4">
          <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl flex items-center gap-2.5 text-xs text-teal-900">
            <Info className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              Fotografías oficiales de la Clínica Calafia y del Campus Mexicali de la Facultad de Odontología UABC.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REAL_FACILITY_PHOTOS.map((facility) => (
              <div
                key={facility.id}
                onClick={() =>
                  setSelectedImage({
                    title: facility.title,
                    subtitle: facility.category,
                    description: facility.description,
                    imageUrl: facility.imageUrl,
                    isRealFacility: true,
                  })
                }
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                  <img
                    src={facility.imageUrl}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] font-bold text-teal-300">
                      {facility.highlight}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-950/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-wider block">
                      {facility.category}
                    </span>
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium pt-2 block border-t border-slate-100">
                    {facility.sourceNote}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal de Imagen en Alta Definición */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="relative h-64 sm:h-80 bg-slate-950 overflow-hidden">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                aria-label="Cerrar visor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 overflow-y-auto">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 block">
                  {selectedImage.subtitle}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Cerrar
                </button>

                {selectedImage.treatmentId && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const tId = selectedImage.treatmentId!;
                        setSelectedImage(null);
                        onSelectTreatment(tId);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      Más información
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const tId = selectedImage.treatmentId!;
                        setSelectedImage(null);
                        onBookAppointment(tId);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors shadow-sm"
                    >
                      Agendar Cita
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
