export interface Appointment {
  id: string;
  folio: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  affiliation: 'Público en general' | 'Estudiante UABC' | 'Docente / Personal UABC' | 'Adulto mayor (INAPAM)';
  specialtyId: string;
  specialtyName: string;
  specificTreatment: string;
  preferredDate: string;
  timeSlot: string;
  notes?: string;
  status: 'Registrada' | 'Por confirmar por clínica' | 'Cancelada';
  createdAt: string;
}

export interface AppointmentSlot {
  time: string;
  label: string;
  period: 'Matutino' | 'Vespertino';
}

export const OFFICIAL_SLOTS: AppointmentSlot[] = [
  { time: '08:30', label: '08:30 a. m.', period: 'Matutino' },
  { time: '09:30', label: '09:30 a. m.', period: 'Matutino' },
  { time: '10:30', label: '10:30 a. m.', period: 'Matutino' },
  { time: '11:30', label: '11:30 a. m.', period: 'Matutino' },
  { time: '12:30', label: '12:30 p. m.', period: 'Vespertino' },
  { time: '01:30', label: '01:30 p. m.', period: 'Vespertino' },
  { time: '02:30', label: '02:30 p. m.', period: 'Vespertino' },
  { time: '03:30', label: '03:30 p. m.', period: 'Vespertino' },
];
