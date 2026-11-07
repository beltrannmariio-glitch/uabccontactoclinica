import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Facebook,
  MapPin,
  CalendarCheck,
  Send,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Copy,
  Clock,
  Camera
} from 'lucide-react';

interface ContactViewProps {
  onNavigateToLocation: () => void;
  onBookAppointment: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigateToLocation,
  onBookAppointment,
}) => {
  const [patientSubject, setPatientSubject] = useState('');
  const [patientMessage, setPatientMessage] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const phonePrimary = '686 557 3268';
  const phonePrimaryClean = '6865573268';
  const phoneSwitchboard = '686 557 0334';
  const emailClinic = 'hugo.lopez15@uabc.edu.mx';
  const facebookUrl = 'https://www.facebook.com/facultadde.odontologiamexicali/?locale=es_LA';
  const facebookPhotosUrl = 'https://www.facebook.com/facultadde.odontologiamexicali/photos/';
  const portalUrl = 'https://odontologia.mxl.uabc.mx/odo3/';

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSendDraftEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      patientSubject
        ? `[Consulta Odontología UABC] ${patientSubject}`
        : `[Consulta Odontología UABC] Información de Atención Clínica - ${patientName || 'Paciente'}`
    );
    const body = encodeURIComponent(
      `Estimada Dirección de Clínica / Hugo López (Facultad de Odontología UABC Mexicali):

Mi nombre es: ${patientName || '[Nombre]'}
Teléfono de contacto: ${patientPhone || '[Teléfono]'}

Motivo de mi consulta o duda:
${patientMessage || 'Deseo solicitar información sobre costos, requisitos y disponibilidad de consulta.'}

Agradezco de antemano su amable orientación.
Atentamente,
${patientName || 'Paciente'}`
    );
    window.location.href = `mailto:${emailClinic}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-[#0a2540] via-[#0f345a] to-[#0d9488] rounded-3xl p-6 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold border border-white/15">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Atención Directa al Paciente</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Estamos para informarte
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
          Ponte en contacto con la Facultad de Odontología de la UABC Campus Mexicali. Resolveremos tus dudas sobre citas, costos y tratamientos.
        </p>
      </div>

      {/* Los 4 Botones Funcionales Obligatorios con Enlaces Correctos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 1. Contactar por teléfono */}
        <a
          href={`tel:${phonePrimaryClean}`}
          className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 transition-all flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <Phone className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 block">
              Llamada Telefónica
            </span>
            <h3 className="font-black text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
              Contactar por teléfono
            </h3>
            <p className="text-xs font-bold text-[#0a2540]">
              {phonePrimary}
            </p>
            <span className="text-[10px] text-slate-500 block pt-0.5">
              Lunes a viernes 8:00 a. m. a 4:00 p. m.
            </span>
          </div>
        </a>

        {/* 2. Enviar un correo */}
        <a
          href={`mailto:${emailClinic}`}
          className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 transition-all flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0 group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 block">
              Correo Electrónico de Clínica
            </span>
            <h3 className="font-black text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
              Enviar un correo
            </h3>
            <p className="text-xs font-bold text-slate-800 break-all">
              {emailClinic}
            </p>
            <span className="text-[10px] text-slate-500 block pt-0.5">
              Atención directa con Hugo López
            </span>
          </div>
        </a>

        {/* 3. Consultar Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Facebook className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 block">
              Comunidad Oficial
            </span>
            <h3 className="font-black text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
              Consultar Facebook
            </h3>
            <p className="text-xs font-semibold text-slate-700">
              Facultad de Odontología Mexicali
            </p>
            <span className="text-[10px] text-slate-500 block pt-0.5">
              Avisos, campañas preventivas y eventos
            </span>
          </div>
        </a>

        {/* 4. Ver ubicación */}
        <button
          onClick={onNavigateToLocation}
          className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex items-start gap-4 text-left group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
              Mapa y Llegada
            </span>
            <h3 className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              Ver ubicación
            </h3>
            <p className="text-xs font-bold text-slate-800">
              Clínica Calafia, Mexicali
            </p>
            <span className="text-[10px] text-slate-500 block pt-0.5">
              Zotoluca s/n, Calafia, CP 21040
            </span>
          </div>
        </button>
      </div>

      {/* Enlaces Relevantes de la Facultad */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
          Canales Oficiales y Galería
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href={facebookPhotosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-600" />
              <span>Galería de fotos oficial en Facebook</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Portal web oficial odontologia.mxl.uabc.mx</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Asistente Rápido para Enviar Correo a Clínica */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Enviar Consulta por Correo
            </h3>
            <p className="text-xs text-slate-500">
              Escribe tus dudas y se abrirá tu cliente de correo con los datos dirigidos a hugo.lopez15@uabc.edu.mx.
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(emailClinic, 'email')}
            className="text-[11px] font-bold text-teal-700 hover:underline flex items-center gap-1"
          >
            {copiedEmail ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? 'Copiado' : 'Copiar email'}</span>
          </button>
        </div>

        <form onSubmit={handleSendDraftEmail} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Tu nombre completo:
              </label>
              <input
                type="text"
                placeholder="Ej. Roberto Gómez"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Tu teléfono celular:
              </label>
              <input
                type="tel"
                placeholder="686 000 0000"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Asunto o área de interés:
            </label>
            <input
              type="text"
              placeholder="Ej. Costo de limpieza dental y horarios"
              value={patientSubject}
              onChange={(e) => setPatientSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Mensaje o pregunta:
            </label>
            <textarea
              rows={3}
              placeholder="Escribe aquí tu duda respecto a los servicios o citas de la facultad..."
              value={patientMessage}
              onChange={(e) => setPatientMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:border-teal-500 outline-none resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              type="submit"
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Redactar y Enviar Correo a Clínica</span>
            </button>
            <button
              type="button"
              onClick={onBookAppointment}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#0a2540] hover:bg-[#0f345a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <CalendarCheck className="w-4 h-4 text-teal-300" />
              <span>Agendar Cita en Línea</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
