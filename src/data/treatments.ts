export interface DentalTreatment {
  id: string;
  name: string;
  specialty: string;
  shortDescription: string;
  simpleExplanation: string;
  services: string[];
  imageUrl: string;
  altText: string;
  whenToVisit: string[];
  procedureSteps: string[];
  benefits: string[];
  targetAudience: string;
  urgencyLevel: 'Baja (Preventiva)' | 'Media (Atención oportuna)' | 'Alta (Dolor o Urgencia)';
}

export const DENTAL_TREATMENTS: DentalTreatment[] = [
  {
    id: 'prevencion-diagnostico',
    name: 'Prevención y diagnóstico',
    specialty: 'Odontología preventiva',
    shortDescription: 'Cuidado proactivo para mantener tus dientes limpios, detectar problemas a tiempo y conservar una boca sana.',
    simpleExplanation: 'Es la revisión periódica que todos debemos realizarnos al menos cada seis meses. El odontólogo examina tus dientes y encías minuciosamente, retira el sarro acumulado y te enseña las mejores técnicas de cepillado e hilo dental.',
    services: [
      'Odontología preventiva',
      'Revisiones bucales completas',
      'Limpiezas dentales (profilaxis)',
      'Orientación de higiene oral y técnicas de cepillado',
      'Aplicación de flúor y selladores de fosetas y fisuras',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    altText: 'Revisión bucal preventiva y limpieza dental profesional en clínica',
    whenToVisit: [
      'Han pasado más de 6 meses desde tu última revisión bucal',
      'Sientes sarro áspero o manchas en la superficie de tus dientes',
      'Notas mal aliento persistente a pesar de cepillarte',
      'Quieres prevenir caries y mantener tus encías en óptimo estado',
    ],
    procedureSteps: [
      'Examen visual general de dientes, lengua y mucosas orales',
      'Eliminación de sarro bacteriano y placa con instrumental ultrasónico suave',
      'Pulido dental con pasta profiláctica para eliminar manchas superficiales',
      'Consejos personalizados de cepillado e higiene bucal en casa',
    ],
    benefits: [
      'Evita la aparición de caries profundas y dolorosas',
      'Mantiene un aliento fresco y dientes visiblemente limpios',
      'Ahorra tiempo y dinero en tratamientos más complejos en el futuro',
      'Detección oportuna de cualquier alteración bucal',
    ],
    targetAudience: 'Toda la familia (niños, adolescentes, jóvenes y adultos)',
    urgencyLevel: 'Baja (Preventiva)',
  },
  {
    id: 'restauracion-dental',
    name: 'Restauración dental',
    specialty: 'Cirugía dental y operatoria',
    shortDescription: 'Reparación de dientes con caries, fracturas o desgaste utilizando materiales estéticos del mismo color de tu diente.',
    simpleExplanation: 'Cuando una muela o diente tiene una caries o se fracturó al masticar algo duro, se limpia la zona dañada y se restaura con una resina estética duradera que devuelve la forma, función y color natural del diente.',
    services: [
      'Cirugía dental menor',
      'Eliminación de caries dental',
      'Restauraciones con resina estética de alta resistencia',
      'Reconstrucción dental de piezas fracturadas',
      'Reemplazo de restauraciones metálicas antiguas deterioradas',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    altText: 'Restauración con resina estética en diente dental',
    whenToVisit: [
      'Ves manchitas oscuras o pequeños orificios en tus muelas',
      'Sientes molestia o sensibilidad leve al consumir alimentos fríos o dulces',
      'Se rompió una esquina de un diente o se desprendió una resina anterior',
      'Se te atora la comida frecuentemente entre dos dientes específicos',
    ],
    procedureSteps: [
      'Aplicación de anestesia local indolora para que no sientas molestia',
      'Limpieza completa y remoción de todo el tejido con caries',
      'Acondicionamiento y colocación de resina estética capa por capa',
      'Fotocurado con luz especial, ajuste de la mordida y pulido brillante',
    ],
    benefits: [
      'Detiene el avance de la infección antes de que toque el nervio',
      'Restaura la capacidad de masticar sin dolor ni sensibilidad',
      'Acabado estético idéntico al esmalte dental natural',
    ],
    targetAudience: 'Pacientes con caries, sensibilidad o dientes despostillados',
    urgencyLevel: 'Media (Atención oportuna)',
  },
  {
    id: 'salud-encias',
    name: 'Salud de las encías',
    specialty: 'Periodoncia',
    shortDescription: 'Tratamiento especializado para encías rojas, inflamadas o sangrantes y protección del hueso que sostiene los dientes.',
    simpleExplanation: 'Las encías sanas son rosadas y no sangran. Si sangran al cepillarte o al comer, existe gingivitis o periodontitis. Los especialistas limpian debajo de la encía para desinflamarla y evitar que los dientes se aflojen.',
    services: [
      'Periodoncia clínica',
      'Atención y control de gingivitis',
      'Tratamiento periodontal integral',
      'Limpieza profunda (raspado y alisado radicular)',
      'Mantenimiento y monitoreo de la salud de los tejidos de soporte',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    altText: 'Evaluación y tratamiento periodontal de la salud de las encías',
    whenToVisit: [
      'Tus encías sangran al cepillarte los dientes o pasar el hilo dental',
      'Notas las encías enrojecidas, hinchadas o sensibles al tacto',
      'Sientes que los dientes se ven más largos o que la encía se ha retraído',
      'Presentas movilidad dental o sensación de flojedad en algún diente',
    ],
    procedureSteps: [
      'Sondaje suave para medir la profundidad de las bolsas periodontales',
      'Limpieza profunda bajo la línea de la encía con instrumentos precisos',
      'Alisado de la raíz dental para favorecer que la encía vuelva a adherirse',
      'Instrucciones específicas de cepillado suave y enjuagues antisépticos',
    ],
    benefits: [
      'Elimina el sangrado y la inflamación de encías',
      'Protege el hueso alveolar y previene la pérdida de dientes',
      'Mejora notablemente el aliento y la frescura bucal',
    ],
    targetAudience: 'Personas con sangrado al cepillarse, encías inflamadas o antecedentes periodontales',
    urgencyLevel: 'Media (Atención oportuna)',
  },
  {
    id: 'tratamiento-pulpar',
    name: 'Tratamiento pulpar',
    specialty: 'Endodoncia',
    shortDescription: 'Tratamiento de conductos para aliviar el dolor intenso de muelas y salvar dientes que de otro modo tendrían que extraerse.',
    simpleExplanation: 'Es el tratamiento que comúnmente se conoce como "matar el nervio". Cuando una caries llega al interior del diente y causa dolor punzante, el especialista retira el tejido infectado, desinfecta el conducto y lo sella herméticamente para conservar tu diente natural.',
    services: [
      'Endodoncia unirradicular y multirradicular',
      'Tratamientos de conductos radiculares',
      'Atención de problemas e infecciones de la pulpa dental',
      'Urgencias endodónticas por dolor agudo',
      'Retratamientos y desinfección interna de conductos',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    altText: 'Endodoncia y tratamiento pulpar para salvar el diente',
    whenToVisit: [
      'Dolor de muela constante, punzante o que no te deja dormir',
      'Sensibilidad extrema y prolongada ante alimentos calientes o fríos',
      'Aparición de un pequeño granito o fístula de pus en la encía',
      'El diente ha cambiado a un color grisáceo o amarronado tras un golpe',
    ],
    procedureSteps: [
      'Diagnóstico clínico y radiografía detallada de la raíz dental',
      'Anestesia local profunda para un procedimiento completamente indoloro',
      'Acceso al interior del diente y remoción minuciosa del nervio infectado',
      'Limpieza, desinfección tridimensional y sellado con material biocompatible',
    ],
    benefits: [
      'Alivia de inmediato el dolor punzante e insoportable',
      'Permite conservar tu propio diente natural en lugar de perderlo',
      'Elimina focos de infección que podrían extenderse al rostro o mandíbula',
    ],
    targetAudience: 'Personas con dolor dental agudo, caries profundas o traumatismos',
    urgencyLevel: 'Alta (Dolor o Urgencia)',
  },
  {
    id: 'procedimientos-quirurgicos',
    name: 'Procedimientos quirúrgicos',
    specialty: 'Cirugía bucal',
    shortDescription: 'Extracciones dentales seguras, cirugía de muelas del juicio y atención a patologías orales en quirófanos clínicos.',
    simpleExplanation: 'Incluye la extracción de piezas dentales que ya no se pueden reparar o muelas del juicio (terceros molares) que no tienen espacio para salir y causan dolor, hinchazón o daño a los dientes vecinos.',
    services: [
      'Cirugía bucal menor',
      'Extracciones dentales simples y complejas',
      'Extracción de terceros molares (muelas del juicio retenidas o impactadas)',
      'Otros procedimientos quirúrgicos bucales (frenectomías, biopsias, regularización de rebordes)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    altText: 'Cirugía bucal menor y extracción de muelas del juicio',
    whenToVisit: [
      'Molestia, inflamación o dolor en la parte posterior de la mandíbula por muelas del juicio',
      'Un diente con daño severo o fractura de raíz irreparable',
      'Dientes supernumerarios o piezas indicadas para extracción por ortodoncia',
      'Heridas o bultos en encías o paladar que requieren revisión quirúrgica',
    ],
    procedureSteps: [
      'Valoración con estudio radiográfico panorámico para planear la cirugía',
      'Anestesia local de acción prolongada para máximo confort',
      'Extracción cuidadosa del diente con técnicas mínimamente invasivas',
      'Sutura reabsorbible o convencional y entrega de indicaciones postoperatorias',
    ],
    benefits: [
      'Previene infecciones severas y apiñamiento de dientes por muelas del juicio',
      'Procedimiento realizado por docentes y residentes con estricta bioseguridad',
      'Recuperación rápida y seguimiento postoperatorio puntual',
    ],
    targetAudience: 'Jóvenes y adultos con muelas del juicio impactadas o dientes dañados',
    urgencyLevel: 'Media (Atención oportuna)',
  },
  {
    id: 'rehabilitacion-oral',
    name: 'Rehabilitación oral',
    specialty: 'Prótesis dental y rehabilitación',
    shortDescription: 'Recuperación de la función masticatoria y la sonrisa mediante coronas, puentes fijos y prótesis removibles o totales.',
    simpleExplanation: 'Si has perdido uno o varios dientes, o si están muy desgastados, este servicio te devuelve la capacidad de masticar cómodamente, hablar con claridad y sonreír con total confianza mediante piezas protésicas a la medida.',
    services: [
      'Prótesis dental fija y removible',
      'Prótesis parciales y totales (placas dentales)',
      'Coronas dentales estéticas (porcelana y zirconio)',
      'Rehabilitación de dientes perdidos, gastados o muy dañados',
      'Ajuste, reparación y rebasado de prótesis existentes',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80',
    altText: 'Rehabilitación oral con coronas dentales y prótesis',
    whenToVisit: [
      'Te hace falta uno o varios dientes y te cuesta masticar alimentos',
      'Una muela tiene una reconstrucción muy grande y necesita una corona para protegerla',
      'Tu prótesis actual se mueve, te lastima o tiene años de uso',
      'Deseas recuperar una sonrisa completa y la armonía facial',
    ],
    procedureSteps: [
      'Toma de impresiones y modelos anatómicos de tu boca',
      'Diseño personalizado de la prótesis o corona según el tono de tus dientes',
      'Pruebas clínicas de mordida, fonética, estética y ajuste perfecto',
      'Colocación definitiva y recomendaciones de cuidado e higiene',
    ],
    benefits: [
      'Vuelve a comer y masticar cualquier alimento con total comodidad',
      'Evita que los dientes restantes se muevan o se inclinen',
      'Rejuvenece el perfil del rostro y brinda gran seguridad al sonreír',
    ],
    targetAudience: 'Adultos y adultos mayores que han perdido piezas dentales',
    urgencyLevel: 'Media (Atención oportuna)',
  },
  {
    id: 'atencion-infantil',
    name: 'Atención infantil',
    specialty: 'Odontopediatría',
    shortDescription: 'Cuidado dental especializado y cariñoso para bebés, niñas y niños en un ambiente agradable, seguro y libre de miedo.',
    simpleExplanation: 'Los dientes de leche son fundamentales para masticar, hablar bien y guardar el espacio de los dientes definitivos. La odontopediatría atiende a los pequeños con técnicas psicológicas de adaptación para que su visita al dentista sea una experiencia divertida y positiva.',
    services: [
      'Odontopediatría integral',
      'Revisiones bucales infantiles y control de crecimiento',
      'Prevención de caries mediante flúor y selladores',
      'Limpiezas y restauraciones infantiles con resina',
      'Manejo de hábitos orales (chupón, succión de dedo) y traumatismos',
    ],
    imageUrl: '/public/assets/aistudio/images__2__d33f04c8.jpg',
    altText: 'Atención odontopediátrica infantil en UABC Festival Pequeño Gran Cimarrón',
    whenToVisit: [
      'Aparición del primer diente del bebé o al cumplir su primer año de edad',
      'Ves manchitas blanquecinas o cafés en los dientes de tu hijo',
      'Molestia al masticar o quejas de dolor bucal',
      'Caídas o golpes en los dientes jugando en la escuela o casa',
    ],
    procedureSteps: [
      'Adaptación amigable: explicar, mostrar y hacer juegos sencillos',
      'Revisión cariñosa del estado de dientes temporales y encías',
      'Limpieza suave con cepillos especiales y aplicación de barniz protector',
      'Recomendaciones claras a los papás sobre meriendas y técnicas de cepillado',
    ],
    benefits: [
      'Crea una relación positiva y sin miedo al dentista desde la infancia',
      'Conserva los dientes de leche hasta su recambio natural',
      'Previene malposiciones dentales y problemas de habla y masticación',
    ],
    targetAudience: 'Bebés, niños y niñas desde el primer año hasta los 12 años',
    urgencyLevel: 'Baja (Preventiva)',
  },
  {
    id: 'diagnostico-imagenes',
    name: 'Diagnóstico por imágenes',
    specialty: 'Radiología dental',
    shortDescription: 'Toma de radiografías digitales de alta precisión con mínima radiación para ver lo que está oculto debajo de las encías y el hueso.',
    simpleExplanation: 'Muchas enfermedades dentales no se ven a simple vista. Con las radiografías dentales, los odontólogos pueden observar el interior de las raíces, la presencia de muelas del juicio ocultas, quistes o pérdida de hueso para dar un diagnóstico 100% exacto.',
    services: [
      'Radiología dental digital',
      'Radiografías periapicales de piezas individuales',
      'Radiografías panorámicas (ortopantomografías), cuando estén disponibles',
      'Estudios de apoyo al diagnóstico clínico interdisciplinario',
      'Evaluación radiográfica prequirúrgica y preortodóntica',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    altText: 'Estudio de radiología dental diagnóstica digital',
    whenToVisit: [
      'Te van a colocar brackets o realizar una extracción de muelas del juicio',
      'Tienes dolor pero externamente no se aprecia ninguna caries visible',
      'Antes de iniciar un tratamiento de endodoncia o implantes',
      'Traumatismo o golpe fuerte en mandíbula o dientes',
    ],
    procedureSteps: [
      'Colocación de chaleco de plomo protector para máxima seguridad',
      'Posicionamiento del sensor digital en la boca o frente al equipo',
      'Captura instantánea de la imagen en segundos con baja dosis radiográfica',
      'Visualización digital inmediata en pantalla para el médico y paciente',
    ],
    benefits: [
      'Diagnósticos exactos y planes de tratamiento sin adivinanzas',
      'Mínima exposición radiológica gracias a tecnología digital moderna',
      'Imágenes disponibles al momento para tu expediente clínico',
    ],
    targetAudience: 'Pacientes en valoración inicial o tratamientos especializados',
    urgencyLevel: 'Baja (Preventiva)',
  },
  {
    id: 'alineacion-dental',
    name: 'Alineación dental',
    specialty: 'Ortodoncia',
    shortDescription: 'Corrección de dientes chuecos, apiñados o separados y mejora de la mordida para una sonrisa armónica y funcional.',
    simpleExplanation: 'La ortodoncia se encarga de mover gradualmente los dientes a su posición ideal mediante brackets o aparatología dental. Además de lucir una sonrisa hermosa, facilita el cepillado y evita el desgaste prematuro de tus piezas dentales.',
    services: [
      'Ortodoncia correctiva e interceptiva',
      'Valoración ortodóntica personalizada y toma de modelos',
      'Corrección de malposiciones dentales y apiñamiento',
      'Tratamientos con aparatología fija y removible',
      'Retenedores y fases de contención post-tratamiento',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    altText: 'Ortodoncia y valoración para corrección de mordida y dientes alineados',
    whenToVisit: [
      'Dientes montados, torcidos o con espacios muy anchos entre ellos',
      'Dificultad para morder bien o masticar con las muelas posteriores',
      'Mandíbula que truena, se traba o produce molestias al abrir la boca',
      'Deseo estético de tener una sonrisa completamente derecha y nivelada',
    ],
    procedureSteps: [
      'Estudio ortodóntico integral con fotografías, modelos y radiografías',
      'Diseño del plan de alineación y elección de la aparatología adecuada',
      'Instalación suave y cómoda de brackets o aparatos correctores',
      'Citas periódicas de ajuste y control hasta lograr la sonrisa soñada',
    ],
    benefits: [
      'Sonrisa perfectamente alineada y armoniosa',
      'Mordida equilibrada que evita dolores de cabeza y mandíbula',
      'Mucho más fácil de limpiar, disminuyendo drásticamente caries y sarro',
    ],
    targetAudience: 'Niños a partir de 7 años (ortopedia), adolescentes y adultos de cualquier edad',
    urgencyLevel: 'Media (Atención oportuna)',
  },
];

export interface RealFacilityPhoto {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  sourceNote: string;
  highlight: string;
}

export const REAL_FACILITY_PHOTOS: RealFacilityPhoto[] = [
  {
    id: 'facade-calafia',
    title: 'Clínica Calafia - Fachada Principal',
    category: 'Instalaciones UABC Mexicali',
    description: 'Edificio oficial de la Clínica Calafia de la Facultad de Odontología UABC en Mexicali, con accesos adaptados y áreas verdes.',
    imageUrl: '/public/assets/aistudio/images__1__8726f80d.jpg',
    sourceNote: 'Fotografía oficial Clínica Calafia UABC',
    highlight: 'Zotoluca y Chinampas s/n, Fracc. Calafia',
  },
  {
    id: 'muro-uabc',
    title: 'Muro de Acceso Institucional',
    category: 'Identidad UABC Mexicali',
    description: 'Muro institucional: Universidad Autónoma de Baja California - Facultad de Odontología, con el escudo oficial UABC.',
    imageUrl: '/public/assets/aistudio/images__3__61fe88a0.jpg',
    sourceNote: 'Acceso representativo Campus Mexicali',
    highlight: 'Facultad de Odontología UABC',
  },
  {
    id: 'clinica-recepcion',
    title: 'Sala de Espera y Triaje Clínico',
    category: 'Atención al Paciente',
    description: 'Recepción, ventanillas de servicio y módulo de valoración médica para los pacientes que asisten a consulta en la facultad.',
    imageUrl: '/public/assets/aistudio/images_5bba33e3.jpg',
    sourceNote: 'Atención directa a la comunidad mexicalense',
    highlight: 'Lunes a viernes de 8:00 a. m. a 4:00 p. m.',
  },
  {
    id: 'pediatria-cimarron',
    title: 'Atención Infantil "Pequeño Gran Cimarrón"',
    category: 'Odontopediatría Comunitaria',
    description: 'Actividades de divulgación, prevención bucal y atención cariñosa a niñas y niños en la Facultad de Odontología.',
    imageUrl: '/public/assets/aistudio/images__2__d33f04c8.jpg',
    sourceNote: 'Festival Pequeño Gran Cimarrón UABC',
    highlight: 'Cuidado dental infantil sin miedo',
  },
  {
    id: 'logo-fom',
    title: 'Emblema FOM Facultad de Odontología',
    category: 'Distintivo de Especialidad',
    description: 'Logotipo distintivo de la Facultad de Odontología Mexicali (FOM) con el caduceo odontológico y lema Ciencia en la Salud Oral.',
    imageUrl: '/public/assets/aistudio/descarga_2756a433.png',
    sourceNote: 'Emblema de especialidad odontológica',
    highlight: 'Ciencia en la Salud Oral',
  },
];
