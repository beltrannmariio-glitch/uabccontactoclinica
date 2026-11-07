import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Share2,
  Download,
  Send,
  Building2,
  CalendarCheck,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { DENTAL_TREATMENTS } from '../data/treatments';
import { Appointment, OFFICIAL_SLOTS } from '../types/appointment';
import {
  getStoredAppointments,
  saveAppointment,
  cancelStoredAppointment,
  generateFolio,
  generateMailtoLink,
  downloadCalendarEvent,
} from '../services/appointmentStorage';
import { UabcCampusMexicaliLogo } from './BrandLogos';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSpecialtyId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedSpecialtyId,
}) => {
  const [activeTab, setActiveTab] = useState<'nueva' | 'mis-citas'>('nueva');
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>([]);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [copiedFolio, setCopiedFolio] = useState(false);

  // Form states
  const [specialtyId, setSpecialtyId] = useState(
    preselectedSpecialtyId || 'prevencion-diagnostico'
  );
  const [specificTreatment, setSpecificTreatment] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [affiliation, setAffiliation] = useState<Appointment['affiliation']>('Público en general');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:30 a. m.');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Default next business day date
  useEffect(() => {
    if (isOpen) {
      loadAppointments();
      const d = new Date();
      d.setDate(d.getDate() + 1);
      // Skip weekend for default date
      if (d.getDay() === 0) d.setDate(d.getDate() + 1); // If Sunday, set to Monday
      if (d.getDay() === 6) d.setDate(d.getDate() + 2); // If Saturday, set to Monday
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setPreferredDate(`${yyyy}-${mm}-${dd}`);

      if (preselectedSpecialtyId) {
        setSpecialtyId(preselectedSpecialtyId);
        const match = DENTAL_TREATMENTS.find((t) => t.id === preselectedSpecialtyId);
        if (match && match.services.length > 0) {
          setSpecificTreatment(match.services[0]);
        }
      }
    }
  }, [isOpen, preselectedSpecialtyId]);

  // Update specific treatment options when specialty changes
  useEffect(() => {
    const match = DENTAL_TREATMENTS.find((t) => t.id === specialtyId);
    if (match && match.services.length > 0) {
      setSpecificTreatment(match.services[0]);
    }
  }, [specialtyId]);

  const loadAppointments = () => {
    const list = getStoredAppointments();
    setAppointmentsList(list);
  };

  if (!isOpen) return null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const selected = new Date(val + 'T00:00:00');
    const day = selected.getDay();
    // 0 = Sunday, 6 = Saturday
    if (day === 0 || day === 6) {
      setFormError('La clínica opera únicamente de Lunes a Viernes. Por favor selecciona un día hábil.');
    } else {
      setFormError('');
    }
    setPreferredDate(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!patientName.trim()) {
      setFormError('Por favor ingresa el nombre completo del paciente.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.replace(/\D/g, '').length < 10) {
      setFormError('Por favor ingresa un número telefónico válido a 10 dígitos.');
      return;
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      setFormError('Por favor ingresa un correo electrónico válido para confirmar tu cita.');
      return;
    }
    if (!preferredDate) {
      setFormError('Por favor selecciona una fecha para tu consulta.');
      return;
    }

    const selectedDay = new Date(preferredDate + 'T00:00:00').getDay();
    if (selectedDay === 0 || selectedDay === 6) {
      setFormError('Los días sábados y domingos la clínica permanece cerrada. Elige de Lunes a Viernes.');
      return;
    }

    const currentSpecialty = DENTAL_TREATMENTS.find((t) => t.id === specialtyId);

    const newAppointment: Appointment = {
      id: `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      folio: generateFolio(),
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      affiliation,
      specialtyId,
      specialtyName: currentSpecialty ? currentSpecialty.name : 'Consulta Odontológica',
      specificTreatment: specificTreatment || 'Valoración y diagnóstico inicial',
      preferredDate,
      timeSlot,
      notes: notes.trim(),
      status: 'Registrada',
      createdAt: new Date().toISOString(),
    };

    saveAppointment(newAppointment);
    setCreatedAppointment(newAppointment);
    loadAppointments();
  };

  const handleCancelAppointment = (id: string) => {
    if (window.confirm('¿Deseas cancelar esta cita agendada en la clínica?')) {
      cancelStoredAppointment(id);
      loadAppointments();
    }
  };

  const copyFolio = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFolio(true);
    setTimeout(() => setCopiedFolio(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#0a2540] via-[#0f345a] to-[#0d9488] px-5 py-4 text-white relative shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-300 border border-white/20">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-teal-400 text-slate-950 px-2 py-0.5 rounded-full">
                    Servicio de Citas
                  </span>
                  <span className="text-xs text-teal-200">UABC Mexicali</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Solicitar Cita Odontológica
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selector de pestañas */}
          <div className="flex items-center gap-2 mt-4 p-1 bg-black/20 rounded-xl backdrop-blur-sm">
            <button
              type="button"
              onClick={() => {
                setActiveTab('nueva');
                setCreatedAppointment(null);
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'nueva'
                  ? 'bg-white text-[#0a2540] shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Agendar Nueva Cita
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mis-citas')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'mis-citas'
                  ? 'bg-white text-[#0a2540] shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>Mis Citas Solicitadas</span>
              {appointmentsList.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-teal-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {appointmentsList.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-6">
          {/* VISTA 1: COMPROBANTE DE CITA CREADA CON ÉXITO */}
          {createdAppointment ? (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-600/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-3 py-1 rounded-full">
                  Solicitud Registrada Exitosamente
                </span>
                <h4 className="text-xl font-black text-slate-900 mt-2">
                  ¡Cita Agendada en Clínica Calafia!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Tu turno ha sido apartado en el sistema. Conserva tu folio oficial y envía la confirmación a la coordinación clínica.
                </p>

                {/* Tarjeta de Folio */}
                <div className="mt-4 bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Folio Oficial de Cita UABC
                    </span>
                    <span className="text-2xl font-black text-[#0a2540] tracking-wide font-mono">
                      {createdAppointment.folio}
                    </span>
                  </div>
                  <button
                    onClick={() => copyFolio(createdAppointment.folio)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>{copiedFolio ? '¡Folio Copiado!' : 'Copiar Folio'}</span>
                  </button>
                </div>
              </div>

              {/* Resumen de la Cita */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Paciente:</span>
                  <span className="font-bold text-slate-900">{createdAppointment.patientName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Especialidad:</span>
                  <span className="font-bold text-teal-700">{createdAppointment.specialtyName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Tratamiento sugerido:</span>
                  <span className="font-semibold text-slate-800 text-right">{createdAppointment.specificTreatment}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Fecha y Horario:</span>
                  <span className="font-bold text-[#0a2540]">{createdAppointment.preferredDate} a las {createdAppointment.timeSlot}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Lugar de Atención:</span>
                  <span className="font-semibold text-slate-900 text-right">Clínica Calafia (Zotoluca s/n, Calafia)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Coordinación de Clínica:</span>
                  <span className="font-bold text-teal-800">hugo.lopez15@uabc.edu.mx</span>
                </div>
              </div>

              {/* Botones de Acción Inmediata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={generateMailtoLink(createdAppointment)}
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 transition-all text-center"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Enviar Confirmación a Clínica</span>
                </a>
                <button
                  type="button"
                  onClick={() => downloadCalendarEvent(createdAppointment)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0a2540] hover:bg-[#0f345a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#0a2540]/20 transition-all"
                >
                  <Download className="w-4 h-4 shrink-0 text-teal-300" />
                  <span>Añadir a mi Calendario (.ics)</span>
                </button>
              </div>

              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold">Indicaciones para tu visita:</span> Preséntate con 15 minutos de anticipación en el módulo de recepción y triaje de Clínica Calafia con tu identificación oficial y cubre bocas.
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCreatedAppointment(null);
                  setActiveTab('mis-citas');
                }}
                className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
              >
                Ver Todas Mis Citas
              </button>
            </div>
          ) : activeTab === 'nueva' ? (
            /* VISTA 2: FORMULARIO DE NUEVA CITA */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Info Banner */}
              <div className="bg-gradient-to-r from-teal-50 to-sky-50 border border-teal-200 rounded-2xl p-3.5 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-snug">
                  <strong className="text-slate-900 block font-bold">Atención Clínica Odontológica UABC Calafia</strong>
                  Horario de consulta: Lunes a viernes de 8:00 a. m. a 4:00 p. m. Costos accesibles para la comunidad y público general.
                </div>
              </div>

              {formError && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-rose-800 animate-in shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Paso 1: Especialidad y Tratamiento */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  1. Área de atención requerida
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DENTAL_TREATMENTS.map((treatment) => (
                    <button
                      type="button"
                      key={treatment.id}
                      onClick={() => setSpecialtyId(treatment.id)}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                        specialtyId === treatment.id
                          ? 'border-teal-500 bg-teal-50/70 shadow-sm ring-1 ring-teal-500 text-teal-950 font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-slate-900">{treatment.name}</div>
                      <div className="text-[11px] text-teal-700 mt-0.5">{treatment.specialty}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tratamiento específico */}
              {specialtyId && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Tratamiento sugerido o motivo principal:
                  </label>
                  <select
                    value={specificTreatment}
                    onChange={(e) => setSpecificTreatment(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  >
                    {DENTAL_TREATMENTS.find((t) => t.id === specialtyId)?.services.map(
                      (service, idx) => (
                        <option key={idx} value={service}>
                          {service}
                        </option>
                      )
                    )}
                    <option value="Valoración general y diagnóstico">
                      Valoración general y diagnóstico
                    </option>
                  </select>
                </div>
              )}

              {/* Paso 2: Fecha y Horario */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  2. Fecha y horario deseado (Lunes a Viernes)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-medium text-slate-600 block mb-1">
                      Fecha de la cita:
                    </span>
                    <div className="relative">
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={handleDateChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-600 block mb-1">
                      Horario de consulta:
                    </span>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                    >
                      {OFFICIAL_SLOTS.map((slot) => (
                        <option key={slot.time} value={slot.label}>
                          {slot.label} ({slot.period})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Paso 3: Datos del paciente */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  3. Datos del paciente
                </label>

                <div>
                  <span className="text-[11px] font-medium text-slate-600 block mb-1">
                    Tipo de paciente / Afiliación:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {(
                      [
                        'Público en general',
                        'Estudiante UABC',
                        'Docente / Personal UABC',
                        'Adulto mayor (INAPAM)',
                      ] as const
                    ).map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setAffiliation(type)}
                        className={`p-2 rounded-xl text-center text-[11px] font-bold border transition-all ${
                          affiliation === type
                            ? 'border-teal-500 bg-teal-50 text-teal-900'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Nombre completo del paciente *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Ej. María Elena Morales"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        Teléfono celular (10 dígitos) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          placeholder="686 123 4567"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        Correo electrónico *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          placeholder="tu.correo@ejemplo.com"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Notas breves, molestias o síntomas (Opcional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Siento molestia al tomar agua fría en una muela del lado derecho..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Botón de Enviar */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#0a2540] via-[#0284c7] to-[#0d9488] hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 transition-all active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 text-teal-300" />
                  <span>Confirmar y Generar Folio de Cita</span>
                </button>
                <p className="text-[10px] text-center text-slate-500 mt-2">
                  Al solicitar tu cita se generará tu folio oficial y podrás enviar los detalles directamente a la coordinación de clínica por correo o teléfono.
                </p>
              </div>
            </form>
          ) : (
            /* VISTA 3: MIS CITAS GUARDADAS */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  Citas registradas en este dispositivo ({appointmentsList.length})
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveTab('nueva')}
                  className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                >
                  + Agendar otra cita
                </button>
              </div>

              {appointmentsList.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-800">No tienes citas registradas aún</h5>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">
                    Agenda una consulta para revisión, limpieza, dolor dental o cualquier especialidad de la facultad.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('nueva')}
                    className="py-2.5 px-4 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Agendar mi primera cita</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointmentsList.map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-teal-300 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm text-[#0a2540]">
                              {apt.folio}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                apt.status === 'Cancelada'
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </div>
                          <h5 className="font-bold text-xs text-slate-900 mt-1">
                            {apt.specialtyName} - {apt.specificTreatment}
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-lg">
                          {apt.timeSlot}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Paciente:</span>
                          <span className="font-medium text-slate-800">{apt.patientName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Fecha:</span>
                          <span className="font-medium text-slate-800">{apt.preferredDate}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Teléfono:</span>
                          <span className="font-medium text-slate-800">{apt.patientPhone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Lugar:</span>
                          <span className="font-medium text-slate-800">Clínica Calafia</span>
                        </div>
                      </div>

                      {/* Botones rápidos */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <a
                            href={generateMailtoLink(apt)}
                            className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold text-[11px] flex items-center gap-1.5 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reenviar a Clínica</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => downloadCalendarEvent(apt)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] flex items-center gap-1.5 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 text-teal-600" />
                            <span>Calendario</span>
                          </button>
                        </div>

                        {apt.status !== 'Cancelada' && (
                          <button
                            type="button"
                            onClick={() => handleCancelAppointment(apt.id)}
                            className="text-[11px] text-rose-600 hover:text-rose-800 font-medium hover:underline"
                          >
                            Cancelar cita
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
