/* =========================================================
   AACE · Cruz del Sur — Datos de la página piloto
   ---------------------------------------------------------
   Todo el contenido dinámico vive acá para poder editarlo
   en un solo lugar. En la versión con Django, cada bloque
   se corresponde con un modelo (Ruta, Nivel, Curso,
   Oportunidad, Evento) persistido en MySQL.

   IMPORTANTE: cursos, organizaciones, oportunidades, eventos
   y datos de contacto son EJEMPLOS ILUSTRATIVOS.
   ========================================================= */

window.AACE_DATA = {

  contacto: {
    email: 'contacto@aace-cruzdelsur.example',
    ubicacion: 'Córdoba, Argentina',
    horario: 'Lunes a viernes · 10 a 18 h',
    instagram: '@aace.cruzdelsur'
  },

  stats: { alumnos: 180, docentes: 5 },

  /* ---------- Rutas de aprendizaje (carrera de interés) ---------- */
  rutas: {
    computacion: {
      id: 'computacion',
      nombre: 'Ciencias de la Computación',
      corto: 'Computación',
      icon: 'code',
      lema: 'Del software de vuelo a los datos del universo.',
      desc: 'Para estudiantes de software, sistemas, telecomunicaciones y carreras afines. Aprendé a programar lo que vuela, a comunicar la Tierra con el espacio y a convertir datos satelitales en conocimiento.',
      especialidades: ['Software', 'Sistemas', 'Telecomunicaciones', 'Ciencia de datos'],
      destinos: ['Software de vuelo y segmento terreno', 'Procesamiento de datos satelitales', 'Operación de estaciones terrenas', 'Ciencia de datos astronómicos']
    },
    vida: {
      id: 'vida',
      nombre: 'Ciencias Médicas y Biológicas',
      corto: 'Ciencias de la vida',
      icon: 'dna',
      lema: 'La vida, más allá de la Tierra.',
      desc: 'Para estudiantes de química, biotecnología, biomedicina, medicina y carreras afines. Descubrí cómo se comporta la vida fuera del planeta y cómo cuidar a quienes viajan al espacio.',
      especialidades: ['Química', 'Biotecnología', 'Biomedicina', 'Medicina'],
      destinos: ['Astrobiología e investigación', 'Medicina aeroespacial', 'Experimentos en microgravedad', 'Sistemas de soporte vital']
    },
    ingenieria: {
      id: 'ingenieria',
      nombre: 'Ingenierías',
      corto: 'Ingenierías',
      icon: 'rocket',
      lema: 'Del armado de cohetes a la órbita.',
      desc: 'Para estudiantes de ingeniería mecánica, aeroespacial, electrónica, civil y afines. Diseñá, construí y ensayá los vehículos y satélites que hacen posible cada misión.',
      especialidades: ['Mecánica', 'Aeroespacial', 'Electrónica', 'Civil'],
      destinos: ['Diseño de lanzadores', 'Integración y ensayos de satélites', 'Aviónica y control', 'Estructuras y materiales']
    },
    comun: {
      id: 'comun',
      nombre: 'Base común',
      corto: 'Base común',
      icon: 'orbit',
      lema: 'La formación que comparten todas las rutas.',
      desc: 'Cursos transversales que todo alumno de la Academia necesita, sin importar su carrera.',
      especialidades: [],
      destinos: []
    }
  },

  /* ---------- Niveles de la ruta ---------- */
  niveles: {
    1: { nombre: 'Despegue', etiqueta: 'Inicial', desc: 'Primeros pasos en tu ruta: fundamentos, herramientas y una mirada práctica del sector.' },
    2: { nombre: 'Órbita', etiqueta: 'Intermedio', desc: 'Consolidás las bases técnicas de tu especialidad y empezás a trabajar con problemas reales.' },
    3: { nombre: 'Transferencia', etiqueta: 'Avanzado', desc: 'Profundizás en sistemas complejos y te preparás para oportunidades concretas del sector.' },
    4: { nombre: 'Espacio profundo', etiqueta: 'Proyecto integrador', desc: 'Un proyecto en equipo, evaluado por jurado, que integra todo lo aprendido en la ruta.' }
  },

  /* ---------- Catálogo de cursos ---------- */
  cursos: [
    /* Base común */
    {
      id: 'c01', ruta: 'comun', nivel: 1, minimo: true, icon: 'globe',
      titulo: 'Inglés técnico aeroespacial',
      resumen: 'Leé papers, manuales de misión y documentación de agencias internacionales con confianza. El idioma del sector, desde el primer día.',
      semanas: 10, horas: 40, modalidad: 'Zoom', cupo: 40, inscriptos: 31, inicio: '2026-10-19', destacado: true,
      contenidos: ['Vocabulario técnico de misiones y operaciones', 'Lectura de papers y documentación de agencias espaciales', 'Redacción de informes y CV técnico en inglés', 'Comunicación oral: presentaciones y entrevistas'],
      recomendados: [], extra: ['Inglés nivel básico (A2)']
    },
    {
      id: 'c02', ruta: 'comun', nivel: 1, minimo: true, icon: 'orbit',
      titulo: 'Introducción a las ciencias del espacio',
      resumen: 'Un mapa completo del sector: agencias, empresas, misiones actuales y las carreras que hacen posible llegar al espacio.',
      semanas: 8, horas: 32, modalidad: 'Híbrido', cupo: 45, inscriptos: 38, inicio: '2026-10-13', destacado: true,
      contenidos: ['Historia de la exploración espacial', 'El ecosistema actual: agencias públicas y actores privados', 'El programa Artemis y la nueva carrera espacial', 'El sector espacial argentino y su industria', 'Mapa de carreras y roles dentro de una misión'],
      recomendados: [], extra: []
    },
    {
      id: 'c03', ruta: 'comun', nivel: 1, icon: 'telescope',
      titulo: 'Astronomía general: el cielo austral',
      resumen: 'Aprendé a leer el cielo del hemisferio sur con prácticas en el observatorio de la Academia, empezando por la constelación que nos da nombre.',
      semanas: 8, horas: 32, modalidad: 'Presencial', cupo: 25, inscriptos: 25, inicio: '2026-10-20', destacado: true,
      contenidos: ['Esfera celeste y sistemas de coordenadas', 'Constelaciones del hemisferio sur', 'Uso de telescopios y cartas celestes', 'Astrofotografía básica', 'Noches de observación guiada'],
      recomendados: [], extra: []
    },
    {
      id: 'c04', ruta: 'comun', nivel: 2, icon: 'orbit',
      titulo: 'Mecánica orbital esencial',
      resumen: 'Las leyes que gobiernan cada satélite y cada misión: órbitas, maniobras y ventanas de lanzamiento, sin perderse en las ecuaciones.',
      semanas: 10, horas: 40, modalidad: 'Zoom', cupo: 35, inscriptos: 22, inicio: '2027-03-08',
      contenidos: ['Leyes de Kepler y gravitación', 'Tipos de órbita: LEO, MEO, GEO y heliosincrónica', 'Maniobras de Hohmann y presupuesto de delta-v', 'Ventanas de lanzamiento', 'Simulación de trayectorias'],
      recomendados: ['c03'], extra: []
    },

    /* Ciencias de la Computación */
    {
      id: 'c05', ruta: 'computacion', nivel: 1, icon: 'code',
      titulo: 'Programación científica con Python',
      resumen: 'La herramienta base de la ciencia espacial moderna: análisis de datos, visualización y automatización con Python.',
      semanas: 10, horas: 40, modalidad: 'Zoom', cupo: 40, inscriptos: 36, inicio: '2026-10-14', destacado: true,
      contenidos: ['Fundamentos de Python orientados a la ciencia', 'NumPy, pandas y Matplotlib', 'Consumo de datos abiertos de agencias espaciales', 'Buenas prácticas y control de versiones con Git'],
      recomendados: [], extra: []
    },
    {
      id: 'c06', ruta: 'computacion', nivel: 2, icon: 'chip',
      titulo: 'Software de vuelo y sistemas embebidos',
      resumen: 'Cómo se programa el cerebro de un satélite: sistemas de tiempo real, microcontroladores y software tolerante a fallos.',
      semanas: 12, horas: 48, modalidad: 'Híbrido', cupo: 30, inscriptos: 19, inicio: '2027-03-09',
      contenidos: ['Arquitectura de computadoras de a bordo', 'Programación en C para microcontroladores', 'Sistemas operativos de tiempo real (RTOS)', 'Telemetría y telecomandos', 'Tolerancia a fallos y redundancia'],
      recomendados: ['c05'], extra: []
    },
    {
      id: 'c07', ruta: 'computacion', nivel: 2, icon: 'satellite',
      titulo: 'Procesamiento de imágenes satelitales',
      resumen: 'Transformá imágenes de satélites de observación terrestre en información útil para el agro, el clima y las emergencias.',
      semanas: 10, horas: 40, modalidad: 'Zoom', cupo: 35, inscriptos: 35, inicio: '2026-11-02', destacado: true,
      contenidos: ['Sensores ópticos y radar de apertura sintética (SAR)', 'Bandas espectrales e índices de vegetación', 'Herramientas GIS y Python aplicadas', 'Casos de uso: agro, incendios e inundaciones'],
      recomendados: ['c05'], extra: []
    },
    {
      id: 'c08', ruta: 'computacion', nivel: 3, icon: 'signal',
      titulo: 'Telecomunicaciones satelitales',
      resumen: 'Del enlace de radio a la estación terrena: cómo viaja la información entre la Tierra y el espacio.',
      semanas: 12, horas: 48, modalidad: 'Zoom', cupo: 30, inscriptos: 14, inicio: '2027-04-05',
      contenidos: ['Fundamentos de radiofrecuencia y antenas', 'Presupuesto de enlace', 'Modulación y codificación', 'Estaciones terrenas y segmento de control', 'Constelaciones de comunicaciones en órbita baja'],
      recomendados: ['c04', 'c06'], extra: []
    },
    {
      id: 'c09', ruta: 'computacion', nivel: 3, icon: 'chart',
      titulo: 'Ciencia de datos y machine learning para el espacio',
      resumen: 'Modelos que detectan exoplanetas, clasifican galaxias y anticipan fenómenos climáticos a partir de datos satelitales.',
      semanas: 12, horas: 48, modalidad: 'Zoom', cupo: 35, inscriptos: 27, inicio: '2027-04-06',
      contenidos: ['Series temporales astronómicas', 'Clasificación y detección de anomalías', 'Redes neuronales aplicadas a imágenes', 'Pipelines de datos a gran escala'],
      recomendados: ['c05', 'c07'], extra: []
    },
    {
      id: 'c10', ruta: 'computacion', nivel: 4, icon: 'rocket',
      titulo: 'Proyecto integrador: software de una misión CubeSat',
      resumen: 'Trabajá en equipo sobre una misión simulada de CubeSat: desde el software de a bordo hasta el centro de control.',
      semanas: 16, horas: 64, modalidad: 'Híbrido', cupo: 20, inscriptos: 9, inicio: '2027-08-09',
      contenidos: ['Definición de requisitos de misión', 'Desarrollo del software de a bordo', 'Centro de control y visualización de telemetría', 'Pruebas, integración y presentación final ante jurado'],
      recomendados: ['c06', 'c08'], extra: []
    },

    /* Ciencias Médicas y Biológicas */
    {
      id: 'c11', ruta: 'vida', nivel: 1, icon: 'dna',
      titulo: 'Astrobiología: la vida en el universo',
      resumen: '¿Dónde y cómo buscar vida fuera de la Tierra? Química, biología y astronomía se cruzan en una de las preguntas más grandes de la ciencia.',
      semanas: 8, horas: 32, modalidad: 'Zoom', cupo: 40, inscriptos: 33, inicio: '2026-10-15', destacado: true,
      contenidos: ['Origen de la vida y condiciones de habitabilidad', 'Extremófilos: la vida en los límites', 'Marte, Europa y Encélado', 'Biofirmas y exoplanetas habitables'],
      recomendados: [], extra: []
    },
    {
      id: 'c12', ruta: 'vida', nivel: 2, icon: 'heart',
      titulo: 'Fisiología humana en microgravedad',
      resumen: 'Qué le pasa al cuerpo humano fuera de la Tierra: huesos, músculos, sistema cardiovascular y adaptación.',
      semanas: 10, horas: 40, modalidad: 'Zoom', cupo: 30, inscriptos: 21, inicio: '2027-03-10',
      contenidos: ['Efectos de la microgravedad en el organismo', 'Pérdida ósea y muscular', 'Sistemas cardiovascular y vestibular', 'Contramedidas y entrenamiento de astronautas'],
      recomendados: ['c11'], extra: []
    },
    {
      id: 'c13', ruta: 'vida', nivel: 2, icon: 'flask',
      titulo: 'Química y biotecnología aplicada al espacio',
      resumen: 'Experimentos en órbita, materiales biológicos y producción de alimentos y fármacos para misiones de larga duración.',
      semanas: 10, horas: 40, modalidad: 'Presencial', cupo: 20, inscriptos: 12, inicio: '2027-03-11',
      contenidos: ['Química de ambientes extremos', 'Cultivos celulares en microgravedad', 'Producción de alimentos en misiones largas', 'Diseño de experimentos biológicos'],
      recomendados: ['c11'], extra: []
    },
    {
      id: 'c14', ruta: 'vida', nivel: 3, icon: 'shield',
      titulo: 'Medicina aeroespacial y radiación',
      resumen: 'Salud de tripulaciones, protección radiológica y telemedicina para misiones a la Luna y más allá.',
      semanas: 12, horas: 48, modalidad: 'Híbrido', cupo: 25, inscriptos: 25, inicio: '2027-04-07', destacado: true,
      contenidos: ['Radiación cósmica y blindaje', 'Selección y seguimiento médico de tripulaciones', 'Telemedicina en misiones espaciales', 'Salud mental en aislamiento y confinamiento'],
      recomendados: ['c12'], extra: []
    },
    {
      id: 'c15', ruta: 'vida', nivel: 3, icon: 'leaf',
      titulo: 'Sistemas de soporte vital',
      resumen: 'Aire, agua y alimento en un circuito cerrado: la ingeniería biológica que mantiene viva a una tripulación.',
      semanas: 12, horas: 48, modalidad: 'Zoom', cupo: 30, inscriptos: 16, inicio: '2027-04-08',
      contenidos: ['Regeneración de aire y agua', 'Sistemas biorregenerativos', 'Control ambiental de hábitats', 'Casos de estudio: estaciones orbitales y futuras bases lunares'],
      recomendados: ['c13'], extra: []
    },
    {
      id: 'c16', ruta: 'vida', nivel: 4, icon: 'rocket',
      titulo: 'Proyecto integrador: experimento biológico en órbita',
      resumen: 'Diseñá, de punta a punta, un experimento biológico listo para volar en una plataforma orbital.',
      semanas: 16, horas: 64, modalidad: 'Híbrido', cupo: 18, inscriptos: 7, inicio: '2027-08-10',
      contenidos: ['Pregunta científica e hipótesis', 'Diseño experimental bajo restricciones de vuelo', 'Protocolos de seguridad y bioética', 'Presentación de la propuesta ante jurado'],
      recomendados: ['c14', 'c15'], extra: []
    },

    /* Ingenierías */
    {
      id: 'c17', ruta: 'ingenieria', nivel: 1, icon: 'rocket',
      titulo: 'Cohetería experimental: del modelismo a la propulsión',
      resumen: 'Diseñá, construí y lanzá tu primer cohete. El curso más práctico de la Academia para entender cómo vuela un vehículo espacial.',
      semanas: 8, horas: 32, modalidad: 'Presencial', cupo: 25, inscriptos: 23, inicio: '2026-10-17', destacado: true,
      contenidos: ['Principios de vuelo y estabilidad', 'Diseño y simulación de cohetes modelo', 'Construcción y motores de propulsión sólida', 'Sistemas de recuperación y análisis de vuelo', 'Jornada de lanzamiento'],
      recomendados: [], extra: []
    },
    {
      id: 'c18', ruta: 'ingenieria', nivel: 2, icon: 'flame',
      titulo: 'Propulsión y motores cohete',
      resumen: 'Termodinámica y química detrás del empuje: motores sólidos, líquidos e híbridos, y los desafíos de la reutilización.',
      semanas: 12, horas: 48, modalidad: 'Híbrido', cupo: 30, inscriptos: 26, inicio: '2027-03-12',
      contenidos: ['La ecuación del cohete y el rendimiento', 'Motores sólidos, líquidos e híbridos', 'Toberas y cámaras de combustión', 'Reutilización de lanzadores'],
      recomendados: ['c17', 'c04'], extra: []
    },
    {
      id: 'c19', ruta: 'ingenieria', nivel: 2, icon: 'layers',
      titulo: 'Estructuras y materiales aeroespaciales',
      resumen: 'Livianos, resistentes y preparados para temperaturas extremas: los materiales y estructuras que soportan un lanzamiento.',
      semanas: 10, horas: 40, modalidad: 'Zoom', cupo: 35, inscriptos: 18, inicio: '2027-03-15',
      contenidos: ['Cargas en el lanzamiento y en órbita', 'Materiales compuestos y aleaciones', 'Protección térmica', 'Introducción al análisis por elementos finitos'],
      recomendados: ['c17'], extra: []
    },
    {
      id: 'c20', ruta: 'ingenieria', nivel: 3, icon: 'chip',
      titulo: 'Aviónica y electrónica de vuelo',
      resumen: 'Sensores, computadoras de vuelo y sistemas de control que guían a un vehículo desde la plataforma hasta la órbita.',
      semanas: 12, horas: 48, modalidad: 'Presencial', cupo: 20, inscriptos: 20, inicio: '2027-04-09',
      contenidos: ['Sensores inerciales y GNSS', 'Guiado, navegación y control', 'Diseño de placas y cableado de vuelo', 'Ensayos ambientales'],
      recomendados: ['c18'], extra: []
    },
    {
      id: 'c21', ruta: 'ingenieria', nivel: 3, icon: 'satellite',
      titulo: 'Diseño de satélites y CubeSats',
      resumen: 'Subsistemas, presupuestos de masa y energía, y todo lo necesario para pasar de una idea a un satélite pequeño.',
      semanas: 12, horas: 48, modalidad: 'Híbrido', cupo: 25, inscriptos: 15, inicio: '2027-04-12', destacado: true,
      contenidos: ['Arquitectura de subsistemas', 'Energía, control térmico y comunicaciones', 'Presupuestos de masa, potencia y datos', 'El estándar CubeSat y su integración'],
      recomendados: ['c04', 'c19'], extra: []
    },
    {
      id: 'c22', ruta: 'ingenieria', nivel: 4, icon: 'rocket',
      titulo: 'Proyecto integrador: lanzamiento de cohete experimental',
      resumen: 'El gran final de la ruta: un equipo, un cohete, una misión. Diseño, ensayos, lanzamiento y análisis de resultados.',
      semanas: 16, horas: 64, modalidad: 'Presencial', cupo: 20, inscriptos: 11, inicio: '2027-08-11',
      contenidos: ['Definición de misión y requisitos', 'Diseño, fabricación y ensayos', 'Revisiones de diseño con mentores', 'Lanzamiento y análisis de los datos de vuelo'],
      recomendados: ['c20', 'c21'], extra: []
    }
  ],

  /* ---------- Bolsa de oportunidades (organizaciones ficticias) ---------- */
  oportunidades: [
    {
      id: 'o1', tipo: 'Beca', org: 'Fundación Horizonte Austral', siglas: 'HA',
      titulo: 'Beca de formación en observación de la Tierra',
      desc: 'Cubre un programa intensivo de procesamiento de imágenes satelitales y seis meses de mentoría con profesionales del sector.',
      rutas: ['computacion', 'ingenieria'], nivel: 2, modalidad: 'Remoto', lugar: 'Argentina', cupos: 5,
      cierre: '2026-10-30',
      requisitos: ['Nivel 2 alcanzado en tu ruta', 'Procesamiento de imágenes satelitales (recomendado)', 'Perfil de alumno completo']
    },
    {
      id: 'o7', tipo: 'Hackatón', org: 'Red de Observatorios del Cono Sur', siglas: 'RO',
      titulo: 'Hackatón de datos astronómicos del hemisferio sur',
      desc: '48 horas para crear herramientas abiertas a partir de datos de observatorios de la región. Equipos multidisciplinarios de hasta cinco personas.',
      rutas: ['computacion', 'vida', 'ingenieria'], nivel: 1, modalidad: 'Híbrido', lugar: 'Sedes regionales + online', cupos: 60,
      cierre: '2026-10-12',
      requisitos: ['Abierto a todos los niveles', 'Equipo de 3 a 5 integrantes', 'Inglés técnico (deseable)']
    },
    {
      id: 'o4', tipo: 'Beca', org: 'Instituto Austral de Ciencias de la Vida', siglas: 'IA',
      titulo: 'Beca de iniciación en astrobiología',
      desc: 'Participá de una línea de investigación sobre microorganismos extremófilos y su potencial en misiones de larga duración.',
      rutas: ['vida'], nivel: 1, modalidad: 'Remoto', lugar: 'Argentina', cupos: 3,
      cierre: '2026-11-06',
      requisitos: ['Astrobiología: la vida en el universo (aprobado)', 'Estudiante universitario de química, biología o afines']
    },
    {
      id: 'o2', tipo: 'Pasantía', org: 'Patagonia Satelital', siglas: 'PS',
      titulo: 'Pasantía en integración y ensayos de CubeSats',
      desc: 'Seis meses dentro de un laboratorio de integración: ensamblado, ensayos de vibración y térmicos, y documentación de vuelo.',
      rutas: ['ingenieria'], nivel: 3, modalidad: 'Presencial', lugar: 'San Carlos de Bariloche', cupos: 2,
      cierre: '2026-11-20',
      requisitos: ['Nivel 3 alcanzado en la ruta de Ingenierías', 'Diseño de satélites y CubeSats (recomendado)', 'Disponibilidad de 20 h semanales']
    },
    {
      id: 'o3', tipo: 'Proceso de selección', org: 'Andes Aerospace Labs', siglas: 'AA',
      titulo: 'Programa Jóvenes Profesionales: software de misión',
      desc: 'Búsqueda de perfiles junior para el equipo de software de segmento terreno. Incluye capacitación interna y posibilidad de contratación.',
      rutas: ['computacion'], nivel: 3, modalidad: 'Híbrido', lugar: 'Córdoba', cupos: 4,
      cierre: '2026-12-04',
      requisitos: ['Nivel 3 alcanzado en la ruta de Computación', 'Experiencia con Python y Git', 'Inglés técnico']
    },
    {
      id: 'o5', tipo: 'Pasantía', org: 'Orbital Sur Labs', siglas: 'OS',
      titulo: 'Pasantía de verano en propulsión híbrida',
      desc: 'Sumate al banco de ensayos de un motor cohete híbrido durante el verano: instrumentación, ensayos estáticos y análisis de datos.',
      rutas: ['ingenieria'], nivel: 2, modalidad: 'Presencial', lugar: 'Buenos Aires', cupos: 3,
      cierre: '2026-12-15',
      requisitos: ['Propulsión y motores cohete (recomendado)', 'Estudiante de ingeniería mecánica, aeroespacial o afines']
    },
    {
      id: 'o6', tipo: 'Convocatoria', org: 'Consorcio Internacional de Medicina Espacial', siglas: 'CM',
      titulo: 'Escuela de verano en medicina espacial',
      desc: 'Programa internacional con clases online y una semana presencial de simulaciones de misión. Dictado íntegramente en inglés.',
      rutas: ['vida'], nivel: 3, modalidad: 'Internacional', lugar: 'Online + semana presencial', cupos: 30,
      cierre: '2027-01-31',
      requisitos: ['Medicina aeroespacial y radiación (recomendado)', 'Inglés avanzado (B2 o superior)', 'Carta de motivación']
    },
    {
      id: 'o9', tipo: 'Beca', org: 'Academia Cruz del Sur', siglas: 'CS',
      titulo: 'Beca Cruz del Sur a la excelencia',
      desc: 'Beca propia de la Academia para alumnos destacados de cada ruta. Cubre la cursada completa del nivel siguiente.',
      rutas: ['computacion', 'vida', 'ingenieria'], nivel: 2, modalidad: 'Remoto', lugar: 'Argentina', cupos: 6,
      apertura: '2027-02-01', cierre: '2027-03-01',
      requisitos: ['Nivel 2 alcanzado con cursos aprobados', 'Recomendación del cuerpo docente']
    },
    {
      id: 'o8', tipo: 'Proceso de selección', org: 'Estación Terrena Mediterránea', siglas: 'ET',
      titulo: 'Operador/a junior de estación terrena',
      desc: 'Seguimiento de pases satelitales, monitoreo de telemetría y mantenimiento de primer nivel en una estación terrena.',
      rutas: ['computacion', 'ingenieria'], nivel: 3, modalidad: 'Presencial', lugar: 'Córdoba', cupos: 1,
      cierre: '2026-09-15',
      requisitos: ['Telecomunicaciones satelitales (aprobado)', 'Disponibilidad para turnos rotativos']
    }
  ],

  /* ---------- Agenda de eventos (ejemplos) ---------- */
  eventos: [
    {
      id: 'e0', tipo: 'Taller', fecha: '2026-08-29T15:00', duracion: 180, modalidad: 'Presencial', lugar: 'Sede de la Academia',
      titulo: 'Introducción a la astrofotografía',
      desc: 'Primeros pasos para fotografiar el cielo nocturno con cámaras réflex y teléfonos.'
    },
    {
      id: 'e00', tipo: 'Charla', fecha: '2026-09-12T19:00', duracion: 90, modalidad: 'Zoom', lugar: 'Online',
      titulo: 'Cómo leer un paper científico sin perderte en el intento',
      desc: 'Estrategias para leer publicaciones científicas del sector espacial de forma eficiente.'
    },
    {
      id: 'e1', tipo: 'Charla', fecha: '2026-10-08T19:00', duracion: 90, modalidad: 'Zoom', lugar: 'Online', ponente: 'Cuerpo docente AACE',
      titulo: 'Artemis y la vuelta a la Luna: qué cambia para Latinoamérica',
      desc: 'Un repaso por el programa Artemis, los nuevos actores del sector y las oportunidades que se abren para profesionales de la región.',
      rutas: ['computacion', 'vida', 'ingenieria']
    },
    {
      id: 'e2', tipo: 'Observación', fecha: '2026-10-17T21:00', duracion: 150, modalidad: 'Presencial', lugar: 'Observatorio de la Academia',
      titulo: 'Noche de observación: la Cruz del Sur y el cielo de primavera',
      desc: 'Una noche guiada con telescopios para reconocer la constelación que nos da nombre, cúmulos estelares y planetas visibles.',
      rutas: ['computacion', 'vida', 'ingenieria']
    },
    {
      id: 'e3', tipo: 'Taller', fecha: '2026-10-24T10:00', duracion: 240, modalidad: 'Presencial', lugar: 'Campo de lanzamiento',
      titulo: 'Taller de cohetería: construí y lanzá tu cohete de agua',
      desc: 'De la teoría a la práctica en una mañana: diseño, construcción y lanzamiento de cohetes de agua con medición de apogeo.',
      rutas: ['ingenieria']
    },
    {
      id: 'e4', tipo: 'Charla', fecha: '2026-11-04T19:00', duracion: 90, modalidad: 'Zoom', lugar: 'Online', ponente: 'Coordinación Académica',
      titulo: 'Carreras en el sector espacial: ¿por dónde empiezo?',
      desc: 'Cómo elegir tu ruta de aprendizaje según tu carrera universitaria y qué perfiles busca hoy la industria.',
      rutas: ['computacion', 'vida', 'ingenieria']
    },
    {
      id: 'e5', tipo: 'Convención', fecha: '2026-11-14T09:30', duracion: 480, modalidad: 'Híbrido', lugar: 'Sede de la Academia + streaming',
      titulo: 'Encuentro Cruz del Sur 2026',
      desc: 'Alumnos, docentes y organizaciones del sector en una jornada completa de charlas, stands, presentaciones de proyectos y networking.',
      rutas: ['computacion', 'vida', 'ingenieria']
    },
    {
      id: 'e6', tipo: 'Hackatón', fecha: '2026-11-28T09:00', fin: '2026-11-29T18:00', modalidad: 'Híbrido', lugar: 'Sede de la Academia + online',
      titulo: 'Hackatón Cruz del Sur: datos satelitales para el agro',
      desc: '36 horas para resolver desafíos reales del agro argentino con imágenes satelitales. Mentorías, jurado y premios para los mejores equipos.',
      rutas: ['computacion', 'ingenieria']
    },
    {
      id: 'e7', tipo: 'Feria', fecha: '2026-12-05T17:00', duracion: 240, modalidad: 'Presencial', lugar: 'Sede de la Academia',
      titulo: 'Feria de oportunidades aeroespaciales',
      desc: 'Organizaciones del sector presentan becas, pasantías y búsquedas abiertas. Traé tu CV técnico y conocé a quienes ya trabajan en el área.',
      rutas: ['computacion', 'vida', 'ingenieria']
    },
    {
      id: 'e8', tipo: 'Charla', fecha: '2026-12-10T19:00', duracion: 90, modalidad: 'Zoom', lugar: 'Online',
      titulo: 'Medicina en microgravedad: el cuerpo fuera de la Tierra',
      desc: 'Qué aprendimos de décadas de vuelos tripulados y cuáles son los desafíos médicos de las misiones a la Luna y Marte.',
      rutas: ['vida']
    },
    {
      id: 'e9', tipo: 'Observación', fecha: '2027-02-20T21:30', duracion: 180, modalidad: 'Presencial', lugar: 'Observatorio de la Academia',
      titulo: 'Maratón de observación de verano',
      desc: 'Una noche larga bajo el cielo de verano: nebulosas, galaxias cercanas y las Nubes de Magallanes.',
      rutas: ['computacion', 'vida', 'ingenieria']
    }
  ]
};
