// ============================================================
// BLOG DE SEGURIDAD & TECNOLOGÍA — DATOS EDITABLES
// ============================================================
// Para agregar/editar/eliminar artículos, simplemente modificá
// este array. Cada entrada se mostrará automáticamente en la web.
// ============================================================

export interface BlogPost {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: "cámaras" | "alarmas" | "accesos" | "tips" | "normativa" | "tendencias";
  content: string;
}

/*
export const blogPosts: BlogPost[] = [
  {
    id: "asegurar-pyme-argentina",
    date: "20 Abr 2025",
    title: "5 Claves para Asegurar tu PyME en Argentina",
    category: "tips",
    excerpt:
      "Analizamos los puntos vulnerables más comunes en pequeñas y medianas empresas y cómo cubrirlos con tecnología IP de última generación.",
    content: `Las PyMEs argentinas enfrentan desafíos únicos en materia de seguridad. Desde robos internos hasta intrusiones nocturnas, la falta de un sistema integral puede costar miles de dólares en pérdidas.

**1. Relevamiento profesional:** Antes de instalar cualquier dispositivo, un técnico debe evaluar puntos ciegos, accesos vulnerables y flujo de personas.

**2. Cámaras IP con analíticos:** Las cámaras modernas con detección de personas (IA) eliminan falsas alarmas y permiten monitoreo inteligente desde el celular.

**3. Control de acceso por zonas:** No todos los empleados necesitan acceder a todas las áreas. Un sistema de tarjetas RFID o biométrico reduce riesgos internos.

**4. Alarma con monitoreo 24/7:** Una alarma sin monitoreo es solo ruido. Conectá tu sistema a una central que actúe ante cada alerta.

**5. Mantenimiento preventivo:** Revisiones periódicas evitan fallas en momentos críticos. Un sistema de seguridad es tan fuerte como su mantenimiento.`,
  },
  {
    id: "camaras-ia-deteccion-humana",
    date: "15 Abr 2025",
    title: "Cámaras con IA: Detección Humana vs Falsas Alarmas",
    category: "cámaras",
    excerpt:
      "Evitá falsas alarmas innecesarias. Descubrí cómo la inteligencia artificial filtra mascotas, sombras y movimientos irrelevantes.",
    content: `La detección de movimiento tradicional genera un alto porcentaje de falsas alarmas: una mascota cruzando el jardín, una rama moviéndose con el viento o cambios de iluminación pueden activar notificaciones constantes.

**¿Cómo funciona la detección humana con IA?**
Los algoritmos de deep learning en cámaras como las Hikvision AcuSense o Dahua WizSense analizan la forma y comportamiento del objeto detectado, clasificándolo como "persona", "vehículo" u "otro".

**Beneficios concretos:**
- Reducción del 95% de falsas alarmas
- Notificaciones solo cuando importa
- Búsqueda inteligente en grabaciones: filtrar por "solo personas"
- Líneas de cruce y áreas de intrusión configurables

**¿Es necesario cambiar todo el sistema?**
No necesariamente. Muchas veces solo se requiere actualizar las cámaras manteniendo el DVR/NVR existente, o actualizar el firmware del grabador.`,
  },
  {
    id: "ley-videovigilancia-argentina",
    date: "10 Abr 2025",
    title: "Ley de Videovigilancia: Lo que Tenés que Saber",
    category: "normativa",
    excerpt:
      "Todo sobre la normativa vigente en Argentina respecto a la privacidad y el uso de cámaras de seguridad en espacios públicos y privados.",
    content: `La instalación de cámaras de seguridad en Argentina está regulada por diversas normativas que debés conocer para evitar problemas legales.

**Espacios privados:**
- Podés instalar cámaras en tu propiedad siempre que no apunten a espacios públicos o propiedades de terceros.
- Es obligatorio informar a empleados si se graban áreas de trabajo.
- No se permite grabar audio sin consentimiento.

**Espacios comunes en consorcios:**
- Se requiere aprobación en asamblea de copropietarios.
- Las cámaras deben ubicarse en áreas comunes (hall, cochera, pasillos).
- Debe existir un cartel visible indicando la presencia de cámaras.

**Retención de grabaciones:**
- Se recomienda mantener grabaciones por 30 días mínimo.
- Ante un hecho delictivo, las grabaciones pueden ser requeridas judicialmente.

**Recomendación:** Siempre trabajá con instaladores profesionales que conozcan la normativa vigente y configuren el sistema correctamente.`,
  },
  {
    id: "control-acceso-consorcios",
    date: "5 Abr 2025",
    title: "Guía de Control de Acceso para Consorcios",
    category: "accesos",
    excerpt:
      "Cómo implementar un sistema de control de acceso moderno en edificios residenciales y comerciales: tarjetas, biometría y más.",
    content: `Los consorcios y edificios de departamentos tienen necesidades de seguridad específicas. Un sistema de control de acceso bien implementado no solo mejora la seguridad sino también la gestión del edificio.

**Opciones de tecnología:**
- **Tarjetas RFID/Proximidad:** Económicas, fáciles de gestionar. Se pueden dar de baja al instante si se pierden.
- **Biometría (huella/facial):** Mayor seguridad, no se pueden clonar ni transferir. Ideal para accesos críticos.
- **App en celular:** Credenciales virtuales via Bluetooth o NFC. Moderno y práctico.

**Puntos de control recomendados:**
1. Puerta principal de ingreso peatonal
2. Portón de cochera vehicular
3. Sala de máquinas / terraza (acceso restringido)
4. Amenities (pileta, SUM, gimnasio)

**Integración con cámaras:**
Cada evento de acceso se puede vincular con la grabación de la cámara más cercana, facilitando auditorías y revisiones.

**Gestión remota:**
Los administradores pueden agregar/quitar usuarios desde una plataforma web sin necesidad de estar presentes.`,
  },
  {
    id: "alarmas-wifi-vs-cableadas",
    date: "28 Mar 2025",
    title: "Alarmas WiFi vs Cableadas: ¿Cuál Elegir?",
    category: "alarmas",
    excerpt:
      "Comparamos ventajas y desventajas de cada tecnología para que elijas el sistema de alarma ideal para tu hogar o negocio.",
    content: `Elegir entre un sistema de alarma inalámbrico (WiFi) o cableado depende de varios factores: tipo de propiedad, presupuesto, necesidades de seguridad y estética.

**Alarmas WiFi / Inalámbricas:**
✅ Instalación rápida y limpia (sin cables visibles)
✅ Fácil de expandir agregando más sensores
✅ Ideal para alquileres o propiedades donde no se puede cableado
❌ Dependen de baterías (requieren recambio periódico)
❌ Susceptibles a interferencias o inhibidores

**Alarmas Cableadas:**
✅ Mayor confiabilidad y estabilidad
✅ No dependen de baterías
✅ Inmunes a inhibidores de señal
❌ Instalación más compleja y costosa
❌ Menos flexibles para agregar zonas

**Nuestra recomendación:**
Para hogares y comercios pequeños, un sistema híbrido es la mejor opción: panel cableado con sensores inalámbricos. Esto combina la confiabilidad del cableado con la flexibilidad del wireless.

**Marcas que instalamos:**
- **Garnet:** Líder en Argentina, excelente relación precio-calidad.
- **DSC / Paradox:** Alternativas premium con más funciones avanzadas.`,
  },
  {
    id: "tendencias-seguridad-2025",
    date: "20 Mar 2025",
    title: "Tendencias en Seguridad Electrónica 2025",
    category: "tendencias",
    excerpt:
      "Desde la nube hasta la inteligencia artificial: las tecnologías que están transformando la industria de la seguridad.",
    content: `La industria de la seguridad electrónica evoluciona constantemente. Estas son las tendencias clave que están marcando el rumbo en 2025:

**1. Videovigilancia en la nube:**
Grabaciones almacenadas en servidores seguros, accesibles desde cualquier lugar. Eliminan el riesgo de robo del DVR/NVR físico.

**2. Analíticos con IA avanzada:**
- Reconocimiento facial para control de acceso
- Detección de comportamientos anómalos (merodeo, caídas)
- Conteo de personas y mapas de calor para retail

**3. Integración IoT:**
Cámaras, alarmas, cerraduras y sensores conectados en un solo ecosistema controlado desde una app.

**4. Ciberseguridad en CCTV:**
Los sistemas de videovigilancia son cada vez más blanco de hackers. Configuraciones seguras con VPN, contraseñas robustas y firmware actualizado son esenciales.

**5. Cámaras con resolución 4K y ColorVu:**
Imágenes nítidas incluso en oscuridad total gracias a sensores de gran tamaño y LED de luz cálida.

**6. Alarmas con verificación por video:**
Ante una alarma, la central puede verificar visualmente antes de despachar una patrulla, reduciendo falsas alarmas y tiempos de respuesta.`,
  },
];
*/


// Categorías para los badges del blog
export const categoryLabels: Record<BlogPost["category"], string> = {
  cámaras: "Cámaras",
  alarmas: "Alarmas",
  accesos: "Control de Acceso",
  tips: "Tips de Seguridad",
  normativa: "Normativa",
  tendencias: "Tendencias",
};

export const categoryColors: Record<BlogPost["category"], string> = {
  cámaras: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  alarmas: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  accesos: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  tips: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  normativa: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  tendencias: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};
