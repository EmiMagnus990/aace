# AACE · Cruz del Sur — Página piloto

Sitio web estático (HTML, CSS y JavaScript sin frameworks) de la Academia de Astronomía y Ciencias del Espacio "Cruz del Sur". Es una **página piloto de demostración**: todavía no incluye registro ni inicio de sesión.

## Cómo abrirlo

Abrí `index.html` con doble clic en cualquier navegador moderno. No necesita servidor ni instalación (las tipografías se cargan desde Google Fonts, así que conviene tener conexión).

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Landing: hero, contexto, propuesta, rutas, cursos destacados, galería, oportunidades y eventos, pasos, FAQ |
| `cursos.html` | Catálogo con buscador, filtros por ruta, nivel y modalidad, orden y detalle de cada curso |
| `rutas.html` | Rutas por carrera con trayectoria por niveles, mapa completo y adelanto de "Mi ruta" |
| `oportunidades.html` | Bolsa de becas, pasantías y convocatorias con filtros y estado (abierta, cerrada, próximamente) |
| `eventos.html` | Cuenta regresiva, agenda por mes, exportación a calendario (.ics) y convenios |
| `academia.html` | Misión, Argentina en carrera, organigrama, diferencial, plataforma en desarrollo y contacto |

## Estructura

```
assets/
  css/styles.css      Sistema de diseño, componentes y animaciones
  js/data.js          TODO el contenido editable (cursos, rutas, oportunidades, eventos, contacto)
  js/main.js          Navegación, footer, cielo estrellado, transiciones, modales, carruseles
  js/<página>.js      Lógica propia de cada página
  img/                Logo (original y derivados), favicons e imágenes
```

Para cambiar cursos, fechas, oportunidades o datos de contacto, editá solo `assets/js/data.js`. Cada bloque equivale a un futuro modelo de Django (Ruta, Nivel, Curso, Oportunidad, Evento).

## A tener en cuenta

- Los cursos, organizaciones, oportunidades, eventos y datos de contacto son **ejemplos ilustrativos**.
- El estado de oportunidades y eventos (abierta, cerrada, próximo, finalizado) se calcula con la fecha actual; actualizá las fechas en `data.js` a medida que pasen.
- Los botones "Inscribirme", "Postularme" y "Reservar lugar" muestran un aviso de "próximamente" hasta que exista el sistema de registro.
- Respeta `prefers-reduced-motion`: si el sistema pide menos movimiento, las animaciones se desactivan.
