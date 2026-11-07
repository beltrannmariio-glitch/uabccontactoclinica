import { Appointment } from '../types/appointment';

const STORAGE_KEY = 'sonrie_uabc_appointments_v1';

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading appointments from storage:', e);
    return [];
  }
}

export function saveAppointment(appointment: Appointment): void {
  try {
    const current = getStoredAppointments();
    const updated = [appointment, ...current.filter((a) => a.id !== appointment.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving appointment:', e);
  }
}

export function cancelStoredAppointment(id: string): void {
  try {
    const current = getStoredAppointments();
    const updated = current.map((a) => (a.id === id ? { ...a, status: 'Cancelada' as const } : a));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error cancelling appointment:', e);
  }
}

export function generateFolio(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `CITA-UABC-${num}`;
}

export function generateMailtoLink(appointment: Appointment): string {
  const clinicEmail = 'hugo.lopez15@uabc.edu.mx';
  const subject = encodeURIComponent(
    `[${appointment.folio}] Solicitud de Cita Odontológica - ${appointment.patientName}`
  );
  const body = encodeURIComponent(
    `Buen día, Dirección de Clínica Odontológica UABC Campus Mexicali (Atención Hugo López):

Deseo confirmar la siguiente solicitud de cita odontológica generada a través de Sonríe UABC:

--------------------------------------------------
DATOS DE LA SOLICITUD
--------------------------------------------------
• Folio: ${appointment.folio}
• Paciente: ${appointment.patientName}
• Teléfono de contacto: ${appointment.patientPhone}
• Correo electrónico: ${appointment.patientEmail}
• Tipo de paciente: ${appointment.affiliation}
• Especialidad requerida: ${appointment.specialtyName}
• Tratamiento específico: ${appointment.specificTreatment}
• Fecha solicitada: ${appointment.preferredDate}
• Horario solicitado: ${appointment.timeSlot}
• Motivo / Síntomas: ${appointment.notes || 'Revisión y valoración general'}

--------------------------------------------------
DATOS DE LA CLÍNICA
--------------------------------------------------
Facultad de Odontología UABC - Campus Mexicali
Clínica Calafia: Zotoluca s/n, Calafia, CP 21040, Mexicali, B.C.
Horario de atención: Lunes a viernes de 8:00 a. m. a 4:00 p. m.
Teléfono: 686 557 3268

Agradezco de antemano la confirmación y las indicaciones previas para mi consulta.
Saludos cordiales.`
  );

  return `mailto:${clinicEmail}?subject=${subject}&body=${body}`;
}

export function downloadCalendarEvent(appointment: Appointment): void {
  // Simple .ics file download
  const dateFormatted = appointment.preferredDate.replace(/-/g, '');
  const [hours, minutes] = appointment.timeSlot.includes(':')
    ? appointment.timeSlot.split(' ')[0].split(':')
    : ['09', '00'];

  const startTimeStr = `${dateFormatted}T${hours.padStart(2, '0')}${minutes.padStart(2, '0')}00`;
  const endHour = String(Number(hours) + 1).padStart(2, '0');
  const endTimeStr = `${dateFormatted}T${endHour}${minutes.padStart(2, '0')}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sonrie UABC//Cita Odontologia Mexicali//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:Cita Odontológica UABC (${appointment.specialtyName})`,
    `DESCRIPTION:Cita odontológica en Clínica Calafia UABC Campus Mexicali.\\nFolio: ${appointment.folio}\\nTratamiento: ${appointment.specificTreatment}\\nPaciente: ${appointment.patientName}\\nTeléfono de la clínica: 686 557 3268`,
    `LOCATION:Clínica Calafia, Facultad de Odontología UABC, Zotoluca s/n, Calafia, Mexicali, B.C.`,
    `DTSTART:${startTimeStr}`,
    `DTEND:${endTimeStr}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${appointment.folio}_Cita_UABC.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
