import React, { useState, useEffect } from 'react';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar, AppView } from './components/BottomNavBar';
import { HomeView } from './components/views/HomeView';
import { TreatmentsView } from './components/views/TreatmentsView';
import { GalleryView } from './components/views/GalleryView';
import { LocationView } from './components/views/LocationView';
import { ContactView } from './components/views/ContactView';
import { AppointmentModal } from './components/AppointmentModal';
import { TreatmentDetailModal } from './components/TreatmentDetailModal';
import { FacultyModal } from './components/FacultyModal';
import { DENTAL_TREATMENTS, DentalTreatment } from './data/treatments';
import { getStoredAppointments } from './services/appointmentStorage';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('portada');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedSpecialtyForBooking, setSelectedSpecialtyForBooking] = useState<string | undefined>(undefined);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [selectedTreatmentDetail, setSelectedTreatmentDetail] = useState<DentalTreatment | null>(null);
  const [hasAppointments, setHasAppointments] = useState(false);

  // Check stored appointments
  useEffect(() => {
    const checkAppointments = () => {
      const list = getStoredAppointments();
      setHasAppointments(list.length > 0);
    };
    checkAppointments();
    window.addEventListener('storage', checkAppointments);
    return () => window.removeEventListener('storage', checkAppointments);
  }, [isAppointmentModalOpen]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleOpenAppointmentModal = (specialtyId?: string) => {
    setSelectedSpecialtyForBooking(specialtyId);
    setIsAppointmentModalOpen(true);
  };

  const handleSelectTreatmentDetail = (treatmentId: string) => {
    const match = DENTAL_TREATMENTS.find((t) => t.id === treatmentId);
    if (match) {
      setSelectedTreatmentDetail(match);
    }
  };

  const handleBookFromTreatment = (specialtyId: string) => {
    setSelectedTreatmentDetail(null);
    handleOpenAppointmentModal(specialtyId);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Barra superior con identidad UABC Campus Mexicali y Sonríe UABC */}
      <TopHeader
        activeView={currentView}
        onOpenFacultyModal={() => setIsFacultyModalOpen(true)}
        onOpenAppointmentModal={() => handleOpenAppointmentModal()}
      />

      {/* Contenedor Principal Adaptable y Centrado para Móvil y Escritorio */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        {currentView === 'portada' && (
          <HomeView
            onNavigate={(view) => {
              if (view === 'citas') {
                handleOpenAppointmentModal();
              } else {
                setCurrentView(view as AppView);
              }
            }}
            onOpenFacultyModal={() => setIsFacultyModalOpen(true)}
            onOpenAppointmentModal={handleOpenAppointmentModal}
            onSelectTreatment={handleSelectTreatmentDetail}
          />
        )}

        {currentView === 'tratamientos' && (
          <TreatmentsView
            onSelectTreatment={handleSelectTreatmentDetail}
            onBookAppointment={handleOpenAppointmentModal}
          />
        )}

        {currentView === 'galeria' && (
          <GalleryView
            onSelectTreatment={handleSelectTreatmentDetail}
            onBookAppointment={handleOpenAppointmentModal}
          />
        )}

        {currentView === 'ubicacion' && (
          <LocationView
            onBookAppointment={() => handleOpenAppointmentModal()}
          />
        )}

        {currentView === 'contacto' && (
          <ContactView
            onNavigateToLocation={() => setCurrentView('ubicacion')}
            onBookAppointment={() => handleOpenAppointmentModal()}
          />
        )}
      </main>

      {/* Menú Inferior Fijo de 5 Opciones */}
      <BottomNavBar
        activeView={currentView}
        onNavigate={setCurrentView}
        onOpenAppointmentModal={() => handleOpenAppointmentModal()}
        hasAppointments={hasAppointments}
      />

      {/* Modal del Servicio de Citas */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => {
          setIsAppointmentModalOpen(false);
          setSelectedSpecialtyForBooking(undefined);
        }}
        preselectedSpecialtyId={selectedSpecialtyForBooking}
      />

      {/* Modal de Detalle de Tratamiento (Las 9 Áreas) */}
      <TreatmentDetailModal
        treatment={selectedTreatmentDetail}
        onClose={() => setSelectedTreatmentDetail(null)}
        onBookAppointment={handleBookFromTreatment}
      />

      {/* Modal Institucional "Conoce nuestra Facultad" */}
      <FacultyModal
        isOpen={isFacultyModalOpen}
        onClose={() => setIsFacultyModalOpen(false)}
        onOpenLocation={() => setCurrentView('ubicacion')}
      />
    </div>
  );
}
