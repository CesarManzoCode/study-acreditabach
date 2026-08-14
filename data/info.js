/* Contenido informativo oficial del ACREDITA-BACH, tomado de la guía del sustentante (Ceneval, junio 2026). */
const INFO_SECTIONS = [
  {
    id: "que-es",
    title: "¿Qué es el ACREDITA-BACH?",
    icon: "🎓",
    html: `
      <p>El <strong>Examen para la Acreditación del Bachillerato General (ACREDITA-BACH)</strong> es aplicado por el <strong>Ceneval</strong> (Centro Nacional de Evaluación para la Educación Superior), con base en el <strong>Acuerdo 286</strong> de la SEP y su modificatorio <strong>02/04/17</strong>.</p>
      <p><strong>Propósito:</strong> acreditar los aprendizajes equivalentes al bachillerato general, sin importar cómo se hayan adquirido (de forma autodidacta, por experiencia laboral, etc.), para obtener el <strong>certificado de bachillerato</strong>.</p>
      <p><strong>Objetivo del examen:</strong> evaluar, mediante un instrumento de <strong>opción múltiple</strong>, los conocimientos y habilidades del componente de formación fundamental del Marco Curricular Común de la Educación Media Superior (MCCEMS).</p>
      <h4>¿Quién puede presentarlo?</h4>
      <ul>
        <li>Personas mexicanas o extranjeras que radiquen legalmente en México.</li>
        <li>Que cuenten con <strong>certificado de secundaria</strong>.</li>
        <li>Que hayan adquirido conocimientos de forma autodidacta o por experiencia laboral.</li>
        <li><strong>No hay límite de edad</strong> y no se requiere ningún porcentaje de créditos cursados de forma escolarizada.</li>
      </ul>
    `
  },
  {
    id: "requisitos",
    title: "Requisitos y documentos para el registro",
    icon: "📄",
    html: `
      <p>Todos los documentos se entregan en <strong>formato digital</strong> (PDF, máximo 3 MB, orientación horizontal, el documento debe abarcar toda la imagen) al momento del registro en línea.</p>
      <h4>Sustentantes mayores de edad</h4>
      <ol>
        <li>CURP (Clave Única de Registro de Población), actualizada, expedida por RENAPO.</li>
        <li>Identificación oficial vigente con fotografía (credencial para votar o pasaporte).</li>
        <li>Certificado de secundaria.</li>
        <li>Carta de autenticidad del certificado de secundaria.</li>
      </ol>
      <p><em>Extranjeros:</em> como identificación, pasaporte vigente del país de origen o documento de legal estancia en México (este último se envía por correo electrónico según la convocatoria).</p>
      <h4>Sustentantes menores de edad</h4>
      <ol>
        <li>CURP del menor.</li>
        <li>Carta responsiva del padre, madre o tutor (llenada en computadora, con firma autógrafa).</li>
        <li>Identificación oficial vigente con fotografía del padre, madre o tutor.</li>
        <li>Certificado de secundaria.</li>
        <li>Carta de autenticidad del certificado de secundaria.</li>
        <li>Documento que acredite la representación legal: acta de nacimiento (si es el padre/madre) o copia certificada del acta de tutela / sentencia del juez (si es tutor).</li>
      </ol>
      <p><strong>Importante:</strong> si el interesado es menor de edad al registrarse pero cumple 18 años entre la apertura del registro y la aplicación, se le considerará mayor de edad y deberá presentar los documentos de mayores de edad.</p>
    `
  },
  {
    id: "modalidad",
    title: "Modalidad, duración y qué llevar el día del examen",
    icon: "📝",
    html: `
      <p>El ACREDITA-BACH se aplica <strong>únicamente en modalidad impresa</strong>, en una sede física.</p>
      <h4>Material que debes llevar</h4>
      <ul>
        <li>Lápiz del <strong>2 o 2½</strong></li>
        <li>Goma</li>
        <li>Sacapuntas</li>
        <li>Calculadora <strong>científica no programable</strong></li>
      </ul>
      <p>En esta app, los reactivos numéricos de matemáticas, física y química traen una calculadora científica integrada (botón <em>Abrir calculadora</em> o la tecla <strong>C</strong>), para que practiques con la misma herramienta que vas a usar ese día.</p>
      <h4>Documentos que debes llevar el día del examen (originales, no digitales)</h4>
      <p><strong>Mayores de edad:</strong> identificación oficial vigente con fotografía en ORIGINAL + Comprobante de Registro al Examen (CREX) impreso y firmado.</p>
      <p><strong>Menores de edad:</strong> CURP impresa, identificación del padre/madre/tutor en original, carta responsiva impresa en original, documento de representación legal impreso, y el CREX impreso y firmado.</p>
      <p>Debes presentarte <strong>60 minutos antes</strong> de la hora de inicio.</p>
    `
  },
  {
    id: "estructura",
    title: "Estructura del examen: áreas, sesiones y tiempos",
    icon: "🧩",
    html: `
      <p>El <strong>Examen Global</strong> (primera vez que presentas) tiene <strong>180 reactivos</strong> de opción múltiple que cuentan para tu calificación, más 25 reactivos piloto (no cuentan, son de prueba estadística). Se divide en dos sesiones, con un receso de 1.5 horas entre ellas.</p>
      <div class="table-wrap">
        <table class="info-table">
          <thead><tr><th>Sesión</th><th>Áreas</th><th>Reactivos (sin piloto)</th><th>Duración</th></tr></thead>
          <tbody>
            <tr><td rowspan="4"><strong>Sesión 1</strong></td><td>1. Pensamiento matemático</td><td>30</td><td rowspan="4">4 h 30 min</td></tr>
            <tr><td>2. Cultura digital</td><td>19</td></tr>
            <tr><td>3. Conciencia histórica</td><td>23</td></tr>
            <tr><td>4. Humanidades</td><td>20</td></tr>
            <tr><td colspan="4" style="text-align:center;font-style:italic">— receso de 1.5 horas —</td></tr>
            <tr><td rowspan="3"><strong>Sesión 2</strong></td><td>5. Ciencias naturales, experimentales y tecnología</td><td>32</td><td rowspan="3">4 h</td></tr>
            <tr><td>6. Lengua y comunicación (español e inglés)</td><td>31</td></tr>
            <tr><td>7. Ciencias sociales</td><td>25</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Total: 180 reactivos.</strong> Cada pregunta tiene <strong>3 opciones (A, B, C)</strong> con solo una respuesta correcta.</p>
      <h4>Si no acreditas 1 o 2 áreas: Examen de Área</h4>
      <p>Tienes <strong>2 oportunidades en el lapso de un año</strong> para presentar solo la(s) área(s) no acreditada(s). Cada Examen de Área dura <strong>2 horas</strong> y comienza a las <strong>9:00 h</strong>. Si tienes derecho a presentar 2 áreas, ambas se presentan el mismo día.</p>
      <p>Si te registras y pagas un Examen de Área y no te presentas, se cuenta como oportunidad usada (salvo que envíes justificante por causa de fuerza mayor al Departamento de Información y Atención al Usuario).</p>
    `
  },
  {
    id: "antes",
    title: "Antes del examen",
    icon: "📋",
    html: `
      <ul>
        <li>Regístrate en <strong>www.ceneval.edu.mx</strong> dentro del periodo del calendario de actividades.</li>
        <li>El registro es personal: los datos deben coincidir con tu acta de nacimiento e identificación oficial.</li>
        <li>Si tienes alguna discapacidad o condición que requiera acondicionar el espacio de aplicación, indícalo al registrarte y comunícate al <strong>55 30 00 87 00</strong> para conocer el procedimiento.</li>
        <li>Ubica tu sede de aplicación antes del día del examen.</li>
      </ul>
    `
  },
  {
    id: "durante",
    title: "Durante el examen",
    icon: "⏱️",
    html: `
      <ul>
        <li>Llega <strong>60 minutos antes</strong>. Revisa las listas de asistencia fuera de los salones para ubicar tu grupo.</li>
        <li>Registra tu asistencia y firma tu ingreso al salón.</li>
        <li>Anota tu nombre, folio y número de versión donde te indique el aplicador. No te adelantes a sus instrucciones.</li>
        <li><strong>Prohibido:</strong> celulares, laptops, tablets, plumas inteligentes o cualquier dispositivo electrónico, y también lentes inteligentes (si tus lentes graduados tienen esta tecnología, consigue un reemplazo para ese día).</li>
        <li>El aplicador <strong>no puede resolver dudas</strong> sobre el contenido del examen.</li>
        <li>No se puede sacar del salón ningún documento o material del examen — es causa de suspensión.</li>
      </ul>
      <h4>Estrategia de tiempo (recomendación oficial de la guía)</h4>
      <ul>
        <li>No te detengas demasiado en preguntas difíciles: pásalas y regresa después.</li>
        <li>Responde primero lo que te resulte fácil.</li>
        <li>Al terminar, verifica que no queden preguntas sin contestar y que el número de la hoja de respuestas corresponda al de la pregunta.</li>
        <li>El examen <strong>no tiene preguntas capciosas</strong> — no le busques trampa a las preguntas.</li>
        <li>Si te sobra tiempo, revisa tus respuestas.</li>
      </ul>
      <h4>Llenado de la hoja de respuestas</h4>
      <p>Usa exclusivamente lápiz del 2 o 2½. Rellena completamente el círculo de tu opción con presión suficiente para que sea visible. Para corregir, borra bien la marca original. No dobles ni arrugues la hoja (se lee con lector óptico) y no anotes nada más en ella — cualquier apunte va en el cuadernillo de preguntas.</p>
    `
  },
  {
    id: "despues",
    title: "Después del examen",
    icon: "✅",
    html: `
      <ul>
        <li>Consulta tu resultado en el portal del Ceneval en las fechas del calendario de actividades (necesitas el folio de tu CREX).</li>
        <li>Si acreditaste, tramita tu certificado ante la <strong>Dirección General del Bachillerato (DGB)</strong> de la SEP.</li>
        <li>Si no acreditaste, puedes prepararte de nuevo y presentar en un futuro periodo, o presentar el Examen de Área si te corresponde.</li>
      </ul>
    `
  },
  {
    id: "formato-reactivos",
    title: "Formato de las preguntas (reactivos)",
    icon: "❓",
    html: `
      <p>Todas las preguntas son de <strong>opción múltiple</strong>: un planteamiento (base) y <strong>3 opciones</strong> (una correcta, dos distractores). Existen 4 formatos:</p>
      <table class="info-table">
        <thead><tr><th>Tipo</th><th>Cómo se ve</th></tr></thead>
        <tbody>
          <tr><td><strong>Cuestionamiento directo</strong></td><td>Una pregunta directa, una afirmación o una frase que se completa al final.</td></tr>
          <tr><td><strong>Jerarquización u ordenamiento</strong></td><td>Se da una lista de elementos y hay que ordenarlos según un criterio; las opciones muestran distintos órdenes.</td></tr>
          <tr><td><strong>Completamiento</strong></td><td>Un texto, secuencia o imagen con espacios en blanco que hay que rellenar con las opciones.</td></tr>
          <tr><td><strong>Relación de elementos</strong></td><td>Dos columnas (por ejemplo, conceptos y definiciones) que hay que emparejar; las opciones combinan ambas columnas.</td></tr>
        </tbody>
      </table>
      <p>Esta web usa exactamente este mismo formato de 3 opciones en todas sus preguntas de práctica y simulacros, para que llegues acostumbrado.</p>
    `
  },
  {
    id: "resultados",
    title: "Resultados: cómo se califica y qué necesitas para aprobar",
    icon: "📊",
    html: `
      <p>Cada área se califica en el <strong>Índice Ceneval</strong>, una escala de <strong>700 a 1300 puntos</strong>. Para <strong>acreditar un área</strong> necesitas al menos <strong>1000 puntos</strong> en esa área.</p>
      <h4>Posibles dictámenes finales</h4>
      <ul>
        <li><strong>Aprobado:</strong> acreditaste las 7 áreas. Se calcula una calificación global (promedio de tus 7 puntajes) convertida a una escala de <strong>6 a 10</strong>, que es la que aparece en tu certificado.</li>
        <li><strong>No aprobado con derecho a Examen de Área:</strong> acreditaste 5 o 6 áreas. Tienes 2 oportunidades en un año para presentar la(s) área(s) faltante(s).</li>
        <li><strong>No aprobado:</strong> no acreditaste 3 o más áreas. Calificación global en escala de <strong>0 a 5.9</strong>.</li>
      </ul>
      <p><strong>Conclusión práctica:</strong> tu meta no es "aprobar en promedio", es <strong>acreditar cada una de las 7 áreas por separado</strong>. Esta web mide tu progreso área por área para que ninguna se quede atrás.</p>
      <p>Consulta tus resultados en: <strong>https://prenlinea.ceneval.edu.mx/form.html</strong></p>
    `
  },
  {
    id: "contacto",
    title: "Contacto y datos oficiales",
    icon: "☎️",
    html: `
      <ul>
        <li><strong>Departamento de Información y Atención al Usuario:</strong> 55 30 00 87 00</li>
        <li><strong>Correo:</strong> informacion@ceneval.edu.mx</li>
        <li><strong>Portal:</strong> www.ceneval.edu.mx</li>
        <li>Esta guía está vigente a partir de julio de 2025 y puede tener revisiones periódicas. La única fuente de este sitio es la <em>Guía para el sustentante ACREDITA-BACH</em> (Ceneval, junio de 2026).</li>
      </ul>
    `
  }
];

/* Bibliografía oficial recomendada por la guía, por área (para consulta, no obligatoria). */
const BIBLIOGRAFIA = {
  1: [
    "Baldor, A. (2019). Álgebra (4.ª ed.). Patria.",
    "Baldor, A. (2019). Aritmética (4.ª ed.). Patria.",
    "Baldor, A. (2019). Geometría y trigonometría (4.ª ed.). Patria.",
    "González, J. (2019). Estadística y probabilidad: Bachillerato. Trillas.",
    "Ibáñez, P. (2023). Pensamiento Matemático. Cengage Learning.",
    "Larson, R. y Edwards, B. (2019). Cálculo diferencial e integral (10.ª ed.). Cengage Learning.",
    "Stewart, J. (2016). Cálculo: Trascendentes tempranas. Una variable (7.ª ed.). Cengage Learning.",
    "Pierdant, A., Rodríguez, E. y Rodríguez, J. (2020). Matemáticas Financieras 1 (2.ª ed.). Patria."
  ],
  2: [
    "Hernández, R., Huerta, R. y Hernández, N. (2018). El glosario informático. Universidad de Guadalajara.",
    "Ibáñez, P. (2023). Cultura digital I. Cengage Learning.",
    "Ibáñez, P. y Salazar, N. (2023). Cultura digital II. Cengage Learning.",
    "Kaspersky (2024). Seguridad en internet: ¿qué es y cómo puedes protegerte en línea?",
    "López, E. (2023). Cultura Digital. Nueva Escuela Mexicana. COBAO.",
    "Reyes, E. (2019). Pensamiento algorítmico. Universidad Autónoma del Estado de Hidalgo."
  ],
  3: [
    "Berumen, S. y Berumen, R. (2018). Historia universal contemporánea. Trillas.",
    "Flores, J. (2019). Historia de México 1. Cengage Learning.",
    "Flores, J. (2020). Historia de México 2. Cengage Learning.",
    "Menchaca, F. (2024). Conciencia histórica 1. Patria.",
    "Menchaca, F. (2025). Conciencia histórica 2. Patria.",
    "Parcero, R. et al. (2017). Historia universal. Pearson.",
    "Vasconcelos, J. (2020). Breve historia de México. Trillas."
  ],
  4: [
    "Barrientos, J. (2020). Filosofía aplicada experiencial. Plaza y Valdés.",
    "García, T., y Weeke, Z. (2019). Ética. Umbral.",
    "Gómez, I. (2016). Ciencia, tecnología, sociedad y valores. Pearson.",
    "Islas, B. (2019). El lenguaje y sus funciones. Unidad de Apoyo para el Aprendizaje.",
    "Magadán, M. (2019). Ética 2. Espacios Creativos. Santillana.",
    "Messina, L. (2021). Análisis y didáctica del discurso político. Sincronía, 80, 467-491.",
    "Muñoz, J. (2019). El pensamiento crítico para la solución a un problema. Revista de Marina, 970, 49-52."
  ],
  5: [
    "Chang, R., y Goldsby, K. (2017). Química. McGraw-Hill.",
    "Cruz, J. y Valdés, S. (2024). La materia y sus interacciones. Patria.",
    "Elizondo, O. y Mariue, M. (2025). La energía en los procesos de la vida diaria. Patria.",
    "Gómez, H. (2024). Conservación de la energía y sus interacciones con la materia. Cengage Learning.",
    "García, B. y Guzmán, A. (2025). Organismos: Estructura y Procesos. Herencia y Evolución Biológica. Patria.",
    "Mader, S. y Windelspecht, M. (2022). Biología para bachillerato. McGraw-Hill.",
    "Tippens, P. (2020). Física: Conceptos y aplicaciones. McGraw-Hill.",
    "Torres, F. (2025). Reacciones químicas, conservación de la materia en la formación de nuevas sustancias. Patria.",
    "Vázquez, R. y Vázquez, R. (2024). Ecosistemas: interacciones, energía y dinámica. Patria."
  ],
  6: [
    "Bal, M. (2025). Narratología. Introducción a la teoría de la narrativa. Akal.",
    "Barajas, B. et al. (2022). Didáctica del ensayo para el bachillerato. CCH-UNAM.",
    "Aragón, C. et al. (2023). Lengua y comunicación 1, 2 y 3. Patria.",
    "Luna, M. (2019). Taller de lectura y redacción 1. Trillas.",
    "Luna, M. (2022). Taller de lectura y redacción 2. Trillas.",
    "Bolofindo, B. B. (2024). Basic English Grammar at a Glance. Justin Garry.",
    "Fernández, Ma. E. (2021). Communicative Handbook. Basic-Intermediate. Trillas.",
    "Ranjot Singh, C. (2023). Comprehensive English Grammar Guide. Rana Books.",
    "Murphy, R. English Grammar in Use."
  ],
  7: [
    "Arellano, C. (2019). Estructura socioeconómica de México. Patria.",
    "Arellano, C. (2024). Ciencias Sociales 3. Patria.",
    "Benedicto, J. (2016). La ciudadanía juvenil. Revista Latinoamericana de Ciencias Sociales, Niñez y Juventud, 4(2), 925-938.",
    "Castellanos, A. (2023). Hegemonía: una aproximación conceptual. Acta Sociológica, 91(91), 37-63.",
    "García, J. (2020). Immanuel Wallerstein y la teoría del sistema-mundo. Illes i Imperis, (22), 321-329.",
    "Martínez, H. (2023). Ciencias sociales I y II. Cengage Learning."
  ]
};
