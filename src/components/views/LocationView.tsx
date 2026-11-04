import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Phone,
  Bus,
  Car,
  AlertCircle,
  Building,
  CalendarCheck
} from 'lucide-react';
import { IMAGES } from '../../assets/images';

interface LocationViewProps {
  onBookAppointment: () => void;
}

export const LocationView: React.FC<LocationViewProps> = ({ onBookAppointment }) => {
  const [copied, setCopied] = useState(false);

  const address = 'Zotoluca s/n, Calafia, CP 21040, Mexicali, Baja California, México';
  const googleMapsUrl = 'https://maps.google.com/?q=Facultad+de+Odontologia+UABC+Calafia+Mexicali';
  const officialPortalUrl = 'https://odontologia.mxl.uabc.mx/odo3/';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-[#0a2540] to-[#044343] rounded-3xl p-6 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold border border-white/15">
          <MapPin className="w-3.5 h-3.5" />
          <span>Información para Visitantes</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Planea tu visita
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
          Encuentra la Facultad de Odontología UABC en el Campus Mexicali, conoce los horarios oficiales de Clínica Calafia y consulta cómo llegar.
        </p>
      </div>

      {/* Fotografía Oficial de la Fachada de Clínica Calafia */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
          <img
            src={IMAGES.fachadaCalafia}
            alt="Fachada oficial de Clínica Calafia de la Facultad de Odontología UABC Mexicali"
            className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-teal-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                Clínica Calafia · UABC
              </span>
              <h3 className="text-white text-base sm:text-lg font-black mt-1">
                Edificio de Clínicas Odontológicas
              </h3>
            </div>
          </div>
        </div>

        {/* Ficha de Datos Obligatorios */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Institución
              </span>
              <p className="font-bold text-xs sm:text-sm text-slate-900">
                Facultad de Odontología de la Universidad Autónoma de Baja California
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Campus Universitario
              </span>
              <p className="font-bold text-xs sm:text-sm text-teal-800">
                Campus Mexicali
              </p>
            </div>
          </div>

          {/* Dirección Oficial con Botón de Copiar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Dirección Oficial
                </span>
                <p className="font-bold text-xs sm:text-sm text-slate-900">
                  {address}
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyAddress}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copiar Dirección</span>
                </>
              )}
            </button>
          </div>

          {/* Horario Proporcionado */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                Horario Proporcionado
              </span>
              <p className="font-black text-sm sm:text-base text-slate-900">
                De 8:00 a. m. a 4:00 p. m.
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Atención clínica de Lunes a Viernes. Sábados y domingos cerrado.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa Interactivo de Google Maps Embebido */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm space-y-4 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Mapa de Ubicación
            </h3>
            <p className="text-xs text-slate-500">
              Ubicación satelital y de calles de la Facultad de Odontología UABC Calafia.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
            >
              <span>Sitio Odontología</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Cómo llegar</span>
            </a>
          </div>
        </div>

        {/* Iframe interactivo seguro de Google Maps */}
        <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
          <iframe
            title="Mapa Facultad de Odontología UABC Mexicali"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Facultad+de+Odontologia+UABC+Calafia+Mexicali&t=&z=16&ie=UTF8&iwloc=&output=embed"
          />
        </div>

        {/* Botón directo grande para abrir la ubicación y consultar cómo llegar */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-2xl bg-[#0a2540] hover:bg-[#0f345a] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md text-center"
        >
          <Navigation className="w-4 h-4 text-teal-300" />
          <span>Abrir ubicación en Google Maps y consultar cómo llegar</span>
        </a>
      </div>

      {/* Consejos para el Día de tu Visita */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Car className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Acceso y Estacionamiento</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Acceso vehicular por calle Zotoluca en Fraccionamiento Calafia. Estacionamiento disponible en las inmediaciones de la facultad.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Transporte Público</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Rutas urbanas con parada frente a Calafia y Centro Cívico. Fácil conexión desde cualquier punto de Mexicali.
            </p>
          </div>
        </div>
      </div>

      {/* Banner de agendar cita */}
      <div className="bg-gradient-to-r from-teal-500 to-[#0284c7] p-5 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h4 className="font-black text-sm sm:text-base">¿Deseas apartar tu turno con anticipación?</h4>
          <p className="text-xs text-white/90 mt-0.5">
            Solicita tu cita en línea para agilizar tu recepción en ventanilla de Clínica Calafia.
          </p>
        </div>
        <button
          onClick={onBookAppointment}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-900 text-xs font-black transition-colors shrink-0 shadow-md flex items-center justify-center gap-2"
        >
          <CalendarCheck className="w-4 h-4 text-teal-300" />
          <span>Solicitar Cita</span>
        </button>
      </div>
    </div>
  );
};
