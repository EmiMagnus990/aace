/* =========================================================
   AACE · Cruz del Sur — Comportamiento compartido
   ---------------------------------------------------------
   - Helpers, íconos y formato de fechas
   - Navegación, menú móvil, footer (se inyectan en todas las páginas)
   - Cielo estrellado animado (canvas)
   - Transiciones entre páginas, animaciones de aparición
   - Carrusel, galería coverflow, acordeón, modal, toasts
   - Tarjetas y detalle de cursos (reutilizados en varias páginas)
   Las páginas cargan: data.js → main.js → <página>.js (defer)
   ========================================================= */
(() => {
  'use strict';

  const D = window.AACE_DATA;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Íconos (trazo 24×24) ---------- */
  const ICONS = {
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M6 12h12"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    rocket: '<path d="M12 2.5c3.5 2.2 5.5 6 5.5 10.2V16l-2 2.5h-7l-2-2.5v-3.3c0-4.2 2-8 5.5-10.2z"/><circle cx="12" cy="10" r="2"/><path d="M6.5 13.5 4 16v3l3-1M17.5 13.5 20 16v3l-3-1M10 21.5h4"/>',
    satellite: '<path d="M12 7.8 16.2 12 12 16.2 7.8 12z"/><path d="M9.9 9.9 8 8M14.1 14.1 16 16"/><path d="m3 7 4-4 3 3-4 4zM14 18l4-4 3 3-4 4z"/>',
    telescope: '<path d="M3.5 13.2 17.3 5.5l2.4 4.3L5.9 17.5z"/><path d="M12 14.1 9 21M12 14.1 15 21"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx=".5"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
    signal: '<circle cx="12" cy="9.5" r="1.6"/><path d="M8.6 13a5 5 0 0 1 0-7M15.4 6a5 5 0 0 1 0 7M5.8 15.8a9 9 0 0 1 0-12.6M18.2 3.2a9 9 0 0 1 0 12.6M12 11.5 9.5 21h5z"/>',
    chart: '<path d="M3.5 3.5v17h17"/><path d="m7.5 15 4-4 3 3 5.5-6.5"/>',
    dna: '<path d="M7 3c0 5 10 7 10 12 0 3-1.2 4.6-2 6M17 3c0 5-10 7-10 12 0 3 1.2 4.6 2 6"/><path d="M8.3 6h7.4M9.7 9h4.6M9.7 15h4.6M8.3 18h7.4"/>',
    heart: '<path d="M20.8 8.6c0 5.4-8.8 11.4-8.8 11.4S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.5a4.6 4.6 0 0 1 8.8 2.1z"/><path d="M6.5 12h3l1.5-2.5 2 5 1.5-2.5h3"/>',
    flask: '<path d="M9 3h6M10 3v6.5L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9.5V3"/><path d="M7.2 15h9.6"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="M12 8.5v7M8.5 12h7"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="m5 19 8.5-8.5"/>',
    flame: '<path d="M12 21.5c-4 0-6.5-2.6-6.5-6.2 0-3.8 3-5.8 3.5-9.8 2 1.3 3 3 3 5 1-1 1.7-2.5 1.7-4 2.6 2 4.8 5 4.8 8.8 0 3.6-2.5 6.2-6.5 6.2z"/><path d="M12 21.5c-1.7 0-2.8-1.1-2.8-2.7 0-1.8 1.6-2.7 2.8-4.3 1.2 1.6 2.8 2.5 2.8 4.3 0 1.6-1.1 2.7-2.8 2.7z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
    orbit: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)"/><circle cx="14.9" cy="6.4" r="1.1" fill="currentColor" stroke="none"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    'calendar-plus': '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    video: '<rect x="2.5" y="6" width="13" height="12" rx="2.5"/><path d="m15.5 10.5 6-3.5v10l-6-3.5"/>',
    building: '<path d="M4 21V6l8-3 8 3v15M2.5 21h19M9.5 21v-4h5v4M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01"/>',
    hybrid: '<path d="M3 7.5h13M12.5 3.5l4 4-4 4M21 16.5H8M11.5 12.5l-4 4 4 4"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2c2.1.7 3.5 2.8 3.5 5.8"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 13.8-1.5 7.7 5-2.5 5 2.5-1.5-7.7"/><path d="m9.6 9 1.6 1.6 3.2-3.2"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 12.5h18"/>',
    graduation: '<path d="m12 4 10 5-10 5L2 9z"/><path d="M6 11v5c2.5 2.5 9.5 2.5 12 0v-5M22 9v6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 14v4M8 21h8M9.5 18h5"/>',
    link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
    tools: '<path d="M14.7 6.3a4 4 0 0 1 5.4-1.7l-2.8 2.8.3 1.7 1.7.3 2.8-2.8a4 4 0 0 1-5.1 5.4l-7.6 7.6a2.1 2.1 0 0 1-3-3z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    sparkle: '<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/><path d="M19 15.5c.3 1.7 1 2.4 2.5 2.7-1.5.3-2.2 1-2.5 2.7-.3-1.7-1-2.4-2.5-2.7 1.5-.3 2.2-1 2.5-2.7z"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5v-3a4 4 0 0 1 8 0v3M12 15v2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor" stroke="none"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-6M11.5 13c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v3.5"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.2 5 2.8-5 2.8z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.01"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    filter: '<path d="M3 5h18M6.5 12h11M10 19h4"/>',
    database: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>'
  };
  const icon = (name, cls = '') =>
    `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ---------- Fechas ---------- */
  const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const MESES_L = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const parseDate = (s) => new Date(s.length === 10 ? s + 'T00:00:00' : s);
  const fmtDate = (s) => { const d = parseDate(s); return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`; };
  const fmtShort = (s) => { const d = parseDate(s); return `${d.getDate()} ${MESES[d.getMonth()]}`; };
  const fmtLong = (s) => { const d = parseDate(s); return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES_L[d.getMonth()]}`; };
  const fmtTime = (s) => { const d = parseDate(s); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} h`; };
  const daysUntil = (s) => Math.ceil((parseDate(s) - new Date()) / 864e5);

  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* ---------- Datos derivados ---------- */
  const cursoById = (id) => D.cursos.find((c) => c.id === id);
  const MINIMOS = D.cursos.filter((c) => c.minimo);
  const MOD_ICON = { Zoom: 'video', Presencial: 'building', 'Híbrido': 'hybrid', Remoto: 'globe', Internacional: 'globe' };
  const OPP_ICON = { Beca: 'award', 'Pasantía': 'briefcase', 'Proceso de selección': 'users', 'Hackatón': 'code', Convocatoria: 'globe' };
  const EVT_TYPE = {
    Charla: { icon: 'mic', cls: 't-charla' },
    Taller: { icon: 'tools', cls: 't-taller' },
    'Hackatón': { icon: 'code', cls: 't-hackaton' },
    'Observación': { icon: 'telescope', cls: 't-observacion' },
    'Convención': { icon: 'users', cls: 't-convencion' },
    Feria: { icon: 'briefcase', cls: 't-feria' }
  };

  const oppStatus = (o) => {
    const now = new Date();
    if (o.apertura && now < parseDate(o.apertura)) return { key: 'soon', label: 'Próximamente', cls: 'badge--soon' };
    const end = parseDate(o.cierre); end.setHours(23, 59, 59);
    if (now > end) return { key: 'closed', label: 'Cerrada', cls: 'badge--closed' };
    return { key: 'open', label: 'Abierta', cls: 'badge--open', days: Math.ceil((end - now) / 864e5) };
  };

  const eventEnd = (e) => e.fin ? parseDate(e.fin) : new Date(parseDate(e.fecha).getTime() + (e.duracion || 90) * 60000);
  const upcomingEvents = () => D.eventos.filter((e) => eventEnd(e) > new Date()).sort((a, b) => parseDate(a.fecha) - parseDate(b.fecha));

  /* ---------- Chrome compartido: nav, menú móvil, footer ---------- */
  const PAGES = [
    { id: 'inicio', href: 'index.html', label: 'Inicio' },
    { id: 'cursos', href: 'cursos.html', label: 'Cursos' },
    { id: 'rutas', href: 'rutas.html', label: 'Rutas' },
    { id: 'oportunidades', href: 'oportunidades.html', label: 'Oportunidades' },
    { id: 'eventos', href: 'eventos.html', label: 'Eventos' },
    { id: 'academia', href: 'academia.html', label: 'Academia' }
  ];

  function renderChrome() {
    const page = document.body.dataset.page;
    const current = (p) => (p.id === page ? ' class="is-active" aria-current="page"' : '');

    document.body.insertAdjacentHTML('afterbegin', `
      <a class="skip-link" href="#main">Saltar al contenido</a>
      <div class="ambient" aria-hidden="true"></div>
      <div class="scroll-progress" aria-hidden="true"></div>
      <header class="nav" id="nav">
        <div class="container nav__inner">
          <a class="brand" href="index.html" aria-label="AACE Cruz del Sur — Inicio">
            <img class="brand__logo" src="assets/img/logo-emblem.webp" alt="" width="42" height="42">
            <span class="brand__text"><strong>AACE</strong><small>Cruz del Sur</small></span>
          </a>
          <nav class="nav__links" aria-label="Navegación principal">
            <span class="nav__indicator" aria-hidden="true"></span>
            ${PAGES.map((p) => `<a href="${p.href}"${current(p)}>${p.label}</a>`).join('')}
          </nav>
          <a class="btn btn-primary btn-sm nav__cta" href="rutas.html">Encontrá tu ruta ${icon('arrow-right', 'ico-arrow')}</a>
          <button class="nav__toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
        </div>
      </header>
      <div class="mobile-menu" id="mobile-menu" inert>
        <nav aria-label="Navegación móvil">
          ${PAGES.map((p, i) => `<a href="${p.href}" style="--i:${i}"${current(p)}><small>0${i + 1}</small>${p.label}</a>`).join('')}
        </nav>
        <div class="mobile-menu__foot">
          <span>${D.contacto.email}</span>
          <span>${D.contacto.ubicacion}</span>
        </div>
      </div>`);

    document.body.insertAdjacentHTML('beforeend', `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <img src="assets/img/logo-light.webp" alt="AACE — Academia de Astronomía y Ciencias del Espacio Cruz del Sur" width="160" height="152" loading="lazy">
              <p>Academia de Astronomía y Ciencias del Espacio. Rutas de aprendizaje, cursos certificados y oportunidades para llegar al sector aeroespacial.</p>
            </div>
            <div>
              <h4>Explorar</h4>
              <ul>${PAGES.map((p) => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h4>Rutas</h4>
              <ul>
                <li><a href="rutas.html#computacion">Ciencias de la Computación</a></li>
                <li><a href="rutas.html#vida">Ciencias Médicas y Biológicas</a></li>
                <li><a href="rutas.html#ingenieria">Ingenierías</a></li>
                <li><a href="cursos.html?ruta=comun">Base común</a></li>
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul class="footer__contact">
                <li>${icon('mail')}<span>${D.contacto.email}</span></li>
                <li>${icon('pin')}<span>${D.contacto.ubicacion}</span></li>
                <li>${icon('clock')}<span>${D.contacto.horario}</span></li>
              </ul>
              <div class="socials" style="margin-top:18px">
                <button class="icon-btn" type="button" data-toast="Nuestras redes sociales estarán disponibles muy pronto." aria-label="Instagram">${icon('instagram')}</button>
                <button class="icon-btn" type="button" data-toast="Nuestras redes sociales estarán disponibles muy pronto." aria-label="LinkedIn">${icon('linkedin')}</button>
                <button class="icon-btn" type="button" data-toast="Nuestras redes sociales estarán disponibles muy pronto." aria-label="YouTube">${icon('youtube')}</button>
              </div>
            </div>
          </div>
          <div class="footer__wordmark" aria-hidden="true">CRUZ DEL SUR</div>
          <div class="footer__bottom">
            <span>© ${new Date().getFullYear()} AACE · Academia de Astronomía y Ciencias del Espacio “Cruz del Sur”. Contenidos con fines ilustrativos.</span>
            <span class="pilot-badge"><span class="dot-pulse"></span>Página piloto en desarrollo a modo de demostración</span>
          </div>
        </div>
      </footer>
      <button class="to-top" type="button" aria-label="Volver arriba">
        <svg class="ring" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="25"/></svg>
        ${icon('arrow-up')}
      </button>
      <div class="toast-wrap" aria-live="polite"></div>`);
  }

  /* ---------- Navegación: estado al hacer scroll, indicador, menú móvil ---------- */
  function initNav() {
    const nav = $('#nav');
    const links = $('.nav__links');
    const indicator = $('.nav__indicator');
    const toggle = $('.nav__toggle');
    const menu = $('#mobile-menu');

    const moveIndicator = (a) => {
      if (!a) { indicator.style.opacity = '0'; return; }
      indicator.style.opacity = '1';
      indicator.style.width = a.offsetWidth + 'px';
      indicator.style.transform = `translateX(${a.offsetLeft}px)`;
    };
    const active = $('a.is-active', links);
    requestAnimationFrame(() => moveIndicator(active));
    $$('a', links).forEach((a) => a.addEventListener('mouseenter', () => moveIndicator(a)));
    links.addEventListener('mouseleave', () => moveIndicator(active));
    window.addEventListener('resize', () => moveIndicator(active));
    document.fonts && document.fonts.ready.then(() => moveIndicator(active));

    const setMenu = (open) => {
      menu.classList.toggle('is-open', open);
      menu.inert = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.documentElement.style.overflow = open ? 'hidden' : '';
      nav.classList.remove('is-hidden');
    };
    toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });

    return { nav, menu };
  }

  /* ---------- Scroll: progreso, nav, volver arriba, parallax ---------- */
  function initScroll(nav, menu) {
    const bar = $('.scroll-progress');
    const toTop = $('.to-top');
    const ring = $('.to-top circle');
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, y / max) : 0;
      bar.style.setProperty('--p', p);
      nav.classList.toggle('is-scrolled', y > 30);
      const hide = y > 500 && y > lastY + 2 && !menu.classList.contains('is-open');
      if (hide) nav.classList.add('is-hidden');
      else if (y < lastY - 2 || y < 500) nav.classList.remove('is-hidden');
      document.body.classList.toggle('nav-hidden', nav.classList.contains('is-hidden'));
      lastY = y;
      toTop.classList.toggle('is-visible', y > 700);
      ring.style.setProperty('--off', 157 * (1 - p));
      updateParallax();
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
    update();
  }

  const parallaxEls = new Set();
  function updateParallax() {
    if (reduceMotion) return;
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.setProperty('--py', offset.toFixed(1) + 'px');
    });
  }

  /* ---------- Cielo estrellado ---------- */
  function initStarfield() {
    const canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, stars = [], meteors = [], raf = 0;
    let mx = 0, my = 0, cmx = 0, cmy = 0;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(620, Math.round((w * h) / (w < 700 ? 5200 : 3600)));
      stars = Array.from({ length: n }, () => {
        const z = Math.random();
        const tone = Math.random();
        return {
          x: Math.random() * w, y: Math.random() * h, z,
          r: z * 1.2 + 0.25,
          tw: Math.random() * Math.PI * 2,
          ts: 0.4 + Math.random() * 1.6,
          c: tone < 0.2 ? '175,200,255' : tone < 0.26 ? '160,240,230' : '255,255,255'
        };
      });
      if (reduceMotion) render(performance.now());
    };

    const render = (now) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      cmx += (mx - cmx) * 0.04;
      cmy += (my - cmy) * 0.04;
      const sy = window.scrollY;
      for (const s of stars) {
        const x = s.x + cmx * s.z * 16;
        let y = (s.y - sy * s.z * 0.12 + cmy * s.z * 16) % h;
        if (y < 0) y += h;
        const a = (0.35 + 0.65 * Math.abs(Math.sin(t * s.ts + s.tw))) * (0.3 + s.z * 0.7);
        ctx.fillStyle = `rgba(${s.c},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, 6.2832);
        ctx.fill();
        if (s.r > 1.2) {
          ctx.fillStyle = `rgba(${s.c},${(a * 0.12).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 3.2, 0, 6.2832);
          ctx.fill();
        }
      }
      if (!reduceMotion && meteors.length < 2 && Math.random() < 0.0028) {
        meteors.push({ x: w * (0.3 + Math.random() * 0.7), y: Math.random() * h * 0.45, vx: -(7 + Math.random() * 5), vy: 2.4 + Math.random() * 2.2, life: 0, max: 50 + Math.random() * 30 });
      }
      meteors = meteors.filter((m) => m.life < m.max);
      for (const m of meteors) {
        m.x += m.vx; m.y += m.vy; m.life++;
        const alpha = Math.sin((m.life / m.max) * Math.PI);
        const tx = m.x - m.vx * 12, ty = m.y - m.vy * 12;
        const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${alpha.toFixed(3)})`);
        g.addColorStop(1, 'rgba(143,178,255,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
      }
    };

    const frame = (now) => { render(now); raf = requestAnimationFrame(frame); };
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 160); });
    window.addEventListener('pointermove', (e) => { mx = e.clientX / w - 0.5; my = e.clientY / h - 0.5; }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduceMotion) raf = requestAnimationFrame(frame);
    });
    resize();
    if (!reduceMotion) raf = requestAnimationFrame(frame);
  }

  /* ---------- Transiciones entre páginas ---------- */
  function initTransitions() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download') || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.protocol !== location.protocol || url.host !== location.host) return;
      if (!/(\.html?|\/)$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // mismo documento (anclas)
      e.preventDefault();
      if (reduceMotion) { location.href = url.href; return; }
      document.documentElement.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 540);
    });
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) document.documentElement.classList.remove('is-leaving');
    });
  }

  /* ---------- Aparición al hacer scroll, texto dividido, contadores ---------- */
  const revealIO = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          el.classList.add('is-in');
          if (el.dataset.count !== undefined) countUp(el);
          revealIO.unobserve(el);
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' })
    : null;

  const observe = (el) => (revealIO ? revealIO.observe(el) : el.classList.add('is-in'));

  function splitText(el) {
    let i = 0;
    const wrap = (content) => {
      const w = document.createElement('span');
      w.className = 'sw';
      const inner = document.createElement('span');
      inner.className = 'sw__i';
      inner.style.setProperty('--i', i++);
      if (typeof content === 'string') inner.textContent = content;
      else inner.append(content);
      w.append(inner);
      return w;
    };
    [...el.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          frag.append(/^\s+$/.test(part) ? document.createTextNode(part) : wrap(part));
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') {
        if (!n.children.length) {
          // Span con estilo (p. ej. gradiente): cada palabra conserva la clase del span original
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(part)); return; }
            const s = n.cloneNode(false);
            s.textContent = part;
            frag.append(wrap(s));
          });
          n.replaceWith(frag);
        } else {
          const placeholder = document.createComment('');
          n.replaceWith(placeholder);
          placeholder.replaceWith(wrap(n));
        }
      }
    });
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = prefix + target.toLocaleString('es-AR') + suffix; return; }
    const dur = 1900;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = prefix + Math.round(target * eased).toLocaleString('es-AR') + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Tilt 3D y brillo que sigue al cursor ---------- */
  function bindTilt(el) {
    if (!finePointer || reduceMotion) return;
    const max = parseFloat(el.dataset.tilt) || 7;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add('is-tilting');
      el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('is-tilting');
      el.style.transform = '';
    });
  }

  function initSpotlight() {
    if (!finePointer) return;
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest && e.target.closest('.card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  function bindMagnetic(el) {
    if (!finePointer || reduceMotion) return;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  }

  function bindMouseTilt(el) {
    if (!finePointer || reduceMotion) return;
    const max = parseFloat(el.dataset.mouseTilt) || 10;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      el.style.transform = `rotateX(${(-cy * max).toFixed(2)}deg) rotateY(${(cx * max).toFixed(2)}deg)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  }

  /* ---------- Carrusel horizontal ---------- */
  function bindRail(root) {
    const track = $('[data-rail-track]', root);
    const prev = $('[data-rail-prev]', root);
    const next = $('[data-rail-next]', root);
    const thumb = $('.rail__thumb', root);
    const step = () => {
      const item = track.firstElementChild;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      return item ? item.getBoundingClientRect().width + gap : 320;
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const ratio = track.scrollWidth ? track.clientWidth / track.scrollWidth : 1;
      const p = max > 0 ? track.scrollLeft / max : 0;
      if (thumb) {
        thumb.style.width = (ratio * 100).toFixed(2) + '%';
        thumb.style.left = (p * (1 - ratio) * 100).toFixed(2) + '%';
      }
      if (prev) prev.disabled = track.scrollLeft < 4;
      if (next) next.disabled = track.scrollLeft > max - 4;
    };
    prev && prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next && next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    new MutationObserver(update).observe(track, { childList: true });
    requestAnimationFrame(update);

    // Arrastre con mouse
    let down = false, moved = false, startX = 0, startLeft = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('is-dragging'); }
      if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (moved) {
        track.classList.remove('is-dragging');
        const s = step();
        track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: 'smooth' });
      }
    });
    track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    track.addEventListener('dragstart', (e) => e.preventDefault());

    // Reproducción automática
    const delay = parseInt(root.dataset.autoplay, 10);
    if (delay && !reduceMotion) {
      let timer = 0, visible = false, paused = false;
      const tick = () => {
        const max = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
        else track.scrollBy({ left: step(), behavior: 'smooth' });
      };
      const sync = () => {
        clearInterval(timer);
        if (visible && !paused) timer = setInterval(tick, delay);
      };
      root.addEventListener('pointerenter', () => { paused = true; sync(); });
      root.addEventListener('pointerleave', () => { paused = false; sync(); });
      root.addEventListener('focusin', () => { paused = true; sync(); });
      root.addEventListener('focusout', () => { paused = false; sync(); });
      track.addEventListener('touchstart', () => { paused = true; sync(); }, { passive: true });
      new IntersectionObserver(([en]) => { visible = en.isIntersecting; sync(); }, { threshold: 0.3 }).observe(root);
    }
  }

  /* ---------- Galería coverflow ---------- */
  function bindCoverflow(root) {
    const items = $$('.cf-item', root);
    const n = items.length;
    const caption = document.querySelector(root.dataset.caption);
    const swap = caption && $('.cf-caption__swap', caption);
    const dotsWrap = caption && $('.cf-dots', caption);
    let idx = 0, timer = 0, visible = false, paused = false;

    if (dotsWrap) dotsWrap.innerHTML = items.map((_, i) => `<button class="cf-dot" type="button" aria-label="Ver imagen ${i + 1}"></button>`).join('');
    const dots = dotsWrap ? $$('.cf-dot', dotsWrap) : [];

    const layout = () => {
      const narrow = window.innerWidth < 900;
      items.forEach((it, i) => {
        let off = i - idx;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        const abs = Math.abs(off);
        const x = off * (narrow ? 44 : 58);
        it.style.transform = `translate(-50%, -50%) translateX(${x}%) translateZ(${-abs * 150}px) rotateY(${-off * 30}deg) scale(${1 - abs * 0.06})`;
        it.style.zIndex = String(10 - abs);
        it.style.opacity = abs >= 2 ? '0' : '1';
        it.classList.toggle('is-active', off === 0);
        it.setAttribute('aria-hidden', String(off !== 0));
      });
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    };

    const setCaption = () => {
      if (!swap) return;
      const it = items[idx];
      swap.classList.add('is-out');
      setTimeout(() => {
        $('.cf-caption__count', caption).innerHTML = `<b>${String(idx + 1).padStart(2, '0')}</b> / ${String(n).padStart(2, '0')}`;
        $('[data-cf-tag]', caption).textContent = it.dataset.tag;
        $('[data-cf-title]', caption).textContent = it.dataset.title;
        $('[data-cf-text]', caption).textContent = it.dataset.text;
        swap.classList.remove('is-out');
      }, 300);
    };

    const go = (i) => { idx = (i + n) % n; layout(); setCaption(); restart(); };
    const restart = () => {
      clearInterval(timer);
      if (visible && !paused && !reduceMotion) timer = setInterval(() => go(idx + 1), 5500);
    };

    items.forEach((it, i) => it.addEventListener('click', () => { if (i !== idx) go(i); }));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    caption && $('[data-cf-prev]', caption)?.addEventListener('click', () => go(idx - 1));
    caption && $('[data-cf-next]', caption)?.addEventListener('click', () => go(idx + 1));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
    });
    let sx = null;
    root.addEventListener('pointerdown', (e) => { sx = e.clientX; });
    root.addEventListener('pointerup', (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
    });
    root.addEventListener('pointerenter', () => { paused = true; restart(); });
    root.addEventListener('pointerleave', () => { paused = false; restart(); });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; restart(); }, { threshold: 0.35 }).observe(root);
    window.addEventListener('resize', layout);
    layout();
    setCaption();
  }

  /* ---------- Acordeón ---------- */
  function bindAccordion(root) {
    $$('.faq__item', root).forEach((item) => {
      const btn = $('.faq__q', item);
      btn.addEventListener('click', () => {
        const open = !item.classList.contains('is-open');
        $$('.faq__item.is-open', root).forEach((o) => {
          o.classList.remove('is-open');
          $('.faq__q', o).setAttribute('aria-expanded', 'false');
        });
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ---------- Cuenta regresiva ---------- */
  function countdown(root, isoDate) {
    const target = parseDate(isoDate).getTime();
    const units = { d: $('[data-cd="d"]', root), h: $('[data-cd="h"]', root), m: $('[data-cd="m"]', root), s: $('[data-cd="s"]', root) };
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const vals = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
      Object.entries(units).forEach(([k, el]) => {
        if (!el) return;
        const v = String(vals[k]).padStart(2, '0');
        if (el.textContent !== v) {
          el.textContent = v;
          if (!reduceMotion) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
        }
      });
    };
    tick();
    return setInterval(tick, 1000);
  }

  /* ---------- Toasts ---------- */
  function toast(msg, ico = 'check') {
    const wrap = $('.toast-wrap');
    if (!wrap) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `${icon(ico)}<span>${msg}</span>`;
    wrap.append(t);
    setTimeout(() => { t.classList.add('is-leaving'); setTimeout(() => t.remove(), 420); }, 3200);
  }

  /* ---------- Modal accesible ---------- */
  const modal = (() => {
    let root, panel, content, lastFocus = null;
    const build = () => {
      root = document.createElement('div');
      root.className = 'modal';
      root.innerHTML = `
        <div class="modal__backdrop" data-close></div>
        <div class="modal__panel" role="dialog" aria-modal="true" tabindex="-1">
          <button class="icon-btn modal__close" type="button" data-close aria-label="Cerrar">${icon('x')}</button>
          <div class="modal__content"></div>
        </div>`;
      document.body.append(root);
      panel = $('.modal__panel', root);
      content = $('.modal__content', root);
      root.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
      document.addEventListener('keydown', (e) => {
        if (!root.classList.contains('is-open')) return;
        if (e.key === 'Escape') { e.preventDefault(); close(); }
        if (e.key === 'Tab') {
          const f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', panel).filter((x) => x.offsetParent !== null);
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    };
    const open = (html, { size = '', label = 'Detalle' } = {}) => {
      if (!root) build();
      const wasOpen = root.classList.contains('is-open');
      content.innerHTML = html;
      panel.className = 'modal__panel' + (size ? ' modal__panel--' + size : '');
      panel.setAttribute('aria-label', label);
      panel.scrollTop = 0;
      if (!wasOpen) {
        lastFocus = document.activeElement;
        const sw = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        if (sw > 0) document.documentElement.style.paddingRight = sw + 'px';
        root.classList.add('is-open');
      }
      setTimeout(() => panel.focus({ preventScroll: true }), 60);
    };
    const close = () => {
      if (!root || !root.classList.contains('is-open')) return;
      root.classList.remove('is-open');
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    };
    return { open, close };
  })();

  /* ---------- Aviso "próximamente" (sin registro todavía) ---------- */
  const SOON_COPY = {
    inscripcion: {
      title: 'La inscripción online está en camino',
      text: (n) => `Muy pronto vas a poder inscribirte a <b>${n}</b> en menos de tres clics, con tu perfil de alumno y el cupo actualizado en tiempo real.`,
      alt: { href: 'rutas.html', label: 'Explorar rutas' }
    },
    espera: {
      title: 'La lista de espera llega pronto',
      text: (n) => `<b>${n}</b> tiene el cupo completo. Cuando se habilite el registro de alumnos vas a poder anotarte en la lista de espera y te avisaremos si se libera un lugar.`,
      alt: { href: 'cursos.html', label: 'Ver otros cursos' }
    },
    postulacion: {
      title: 'Las postulaciones abren muy pronto',
      text: (n) => `Estamos construyendo el registro de alumnos para que puedas postularte a <b>${n}</b> y seguir el estado de tu postulación desde tu panel personal.`,
      alt: { href: 'rutas.html', label: 'Preparar mi ruta' }
    },
    evento: {
      title: 'La reserva de lugares llega pronto',
      text: (n) => `Cuando se habilite el registro de alumnos vas a poder reservar tu lugar en <b>${n}</b>. Mientras tanto, podés agregarlo a tu calendario.`,
      alt: { href: 'eventos.html', label: 'Ver agenda' }
    },
    contacto: {
      title: '¡Gracias por escribirnos!',
      text: () => 'Esta es una página piloto: el formulario todavía no envía datos. Muy pronto vas a poder contactar a la Academia directamente desde acá.',
      alt: null
    }
  };

  function comingSoon(kind, name = '') {
    const c = SOON_COPY[kind] || SOON_COPY.inscripcion;
    const here = location.pathname.split('/').pop() || 'index.html';
    const alt = c.alt && c.alt.href !== here ? `<a class="btn btn-ghost" href="${c.alt.href}">${c.alt.label}</a>` : '';
    modal.open(`
      <div class="soon">
        <div class="soon__visual"><span class="soon__sat"></span><span class="soon__rocket">${icon('rocket')}</span></div>
        <span class="eyebrow eyebrow--center">Próximamente</span>
        <h3>${c.title}</h3>
        <p>${c.text(escapeHTML(name))}</p>
        <div class="soon__progress">
          <div><span>Sistema de registro de alumnos</span><span>En desarrollo</span></div>
          <div class="soon__bar"></div>
        </div>
        <div class="soon__actions">
          <button class="btn btn-primary" type="button" data-close>Entendido</button>
          ${alt}
        </div>
        <p class="soon__foot">Página piloto en desarrollo a modo de demostración</p>
      </div>`, { size: 'sm', label: c.title });
  }

  /* ---------- Cursos: tarjeta y detalle ---------- */
  function capacityHTML(c) {
    const full = c.inscriptos >= c.cupo;
    const pct = Math.min(100, Math.round((c.inscriptos / c.cupo) * 100));
    return `
      <div class="capacity${full ? ' is-full' : ''}">
        <div class="capacity__label"><span>${full ? 'Cupo completo' : `${c.cupo - c.inscriptos} lugares disponibles`}</span><span>${c.inscriptos}/${c.cupo}</span></div>
        <div class="capacity__bar"><span class="capacity__fill" style="--w:${pct}%"></span></div>
      </div>`;
  }

  function courseCard(c) {
    const r = D.rutas[c.ruta];
    const lvl = D.niveles[c.nivel];
    const full = c.inscriptos >= c.cupo;
    return `
      <article class="card card--lift course-card rc-${c.ruta}" data-course="${c.id}">
        <div class="course-card__top">
          <span class="icon-box icon-box--route">${icon(c.icon)}</span>
          <span class="badge">N${c.nivel} · ${lvl.nombre}</span>
        </div>
        <div class="course-card__body">
          <span class="course-card__route">${r.corto}${c.minimo ? ' · Mínimo' : ''}</span>
          <h3>${c.titulo}</h3>
          <p>${c.resumen}</p>
        </div>
        <ul class="meta-list">
          <li>${icon('clock')}${c.semanas} semanas</li>
          <li>${icon(MOD_ICON[c.modalidad])}${c.modalidad}</li>
          <li>${icon('calendar')}${fmtShort(c.inicio)}</li>
        </ul>
        ${capacityHTML(c)}
        <div class="course-card__actions">
          <button class="btn btn-ghost btn-sm" type="button" data-action="detalle">Ver detalle</button>
          <button class="btn btn-primary btn-sm" type="button" data-action="inscribir">${full ? 'Lista de espera' : 'Inscribirme'}</button>
        </div>
      </article>`;
  }

  function reqLink(id) {
    const c = cursoById(id);
    return c ? `<button class="req-link" type="button" data-open-course="${c.id}"><span>${c.titulo}</span>${icon('arrow-right')}</button>` : '';
  }

  function openCourse(id) {
    const c = cursoById(id);
    if (!c) return;
    const r = D.rutas[c.ruta];
    const lvl = D.niveles[c.nivel];
    const full = c.inscriptos >= c.cupo;
    const minimos = c.minimo
      ? `<p>Este curso es un <b>conocimiento mínimo</b> de todas las rutas.</p>`
      : MINIMOS.map((m) => reqLink(m.id)).join('');
    const extra = (c.extra || []).map((x) => `<p>${icon('check')} ${x}</p>`).join('');
    const recomendados = c.recomendados.length
      ? c.recomendados.map(reqLink).join('')
      : '<p>No hay cursos previos recomendados: ideal para empezar.</p>';

    modal.open(`
      <div class="rc-${c.ruta}">
        <header class="cm-head">
          <div class="cm-head__badges">
            <span class="badge badge--route">${icon(r.icon)}${r.nombre}</span>
            <span class="badge">Nivel ${c.nivel} · ${lvl.nombre}</span>
            ${c.minimo ? '<span class="badge badge--soon">Conocimiento mínimo</span>' : ''}
          </div>
          <h2>${c.titulo}</h2>
          <p>${c.resumen}</p>
        </header>
        <div class="cm-body">
          <div class="info-grid">
            <div class="info"><span>Duración</span><b>${c.semanas} semanas</b></div>
            <div class="info"><span>Carga horaria</span><b>${c.horas} horas</b></div>
            <div class="info"><span>Modalidad</span><b>${c.modalidad}</b></div>
            <div class="info"><span>Inicio</span><b>${fmtDate(c.inicio)}</b></div>
            <div class="info"><span>Cupo</span><b>${c.cupo} alumnos</b></div>
            <div class="info"><span>Al aprobar</span><b>Certificado AACE</b></div>
          </div>
          <section>
            <h4 class="cm-h">Contenidos mínimos</h4>
            <ul class="check-list">${c.contenidos.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
          </section>
          <section class="req-cols">
            <div class="req-box"><h4>Conocimientos mínimos</h4>${minimos}${extra}</div>
            <div class="req-box"><h4>Recomendados</h4>${recomendados}</div>
          </section>
          <p class="cm-note">${icon('info')}<span>Podés inscribirte al curso que elijas: los recomendados son una guía, no un límite. Los conocimientos mínimos pueden acreditarse con el curso de la Academia o con una certificación equivalente.</span></p>
        </div>
        <footer class="cm-foot">
          ${capacityHTML(c)}
          <button class="btn btn-primary" type="button" data-soon="${full ? 'espera' : 'inscripcion'}" data-name="${escapeHTML(c.titulo)}">${full ? 'Anotarme en lista de espera' : 'Inscribirme'} ${icon('arrow-right', 'ico-arrow')}</button>
        </footer>
      </div>`, { label: c.titulo });
  }

  /* ---------- Delegación global de clics ---------- */
  function initDelegation() {
    document.addEventListener('click', (e) => {
      const soon = e.target.closest('[data-soon]');
      if (soon) { e.preventDefault(); comingSoon(soon.dataset.soon, soon.dataset.name || ''); return; }

      const openBtn = e.target.closest('[data-open-course]');
      if (openBtn) { e.preventDefault(); openCourse(openBtn.dataset.openCourse); return; }

      const t = e.target.closest('[data-toast]');
      if (t) { toast(t.dataset.toast, 'info'); return; }

      const card = e.target.closest('[data-course]');
      if (card) {
        const action = e.target.closest('[data-action]');
        const c = cursoById(card.dataset.course);
        if (action && action.dataset.action === 'inscribir') {
          comingSoon(c.inscriptos >= c.cupo ? 'espera' : 'inscripcion', c.titulo);
        } else {
          openCourse(card.dataset.course);
        }
      }
    });
  }

  /* ---------- Mejora progresiva de nodos (también los que se agregan después) ---------- */
  function enhance(root = document) {
    const all = (sel) => (root.matches && root.matches(sel) ? [root, ...$$(sel, root)] : $$(sel, root));

    // <i data-icon> se reemplaza por el SVG (conserva sus clases); otros elementos lo contienen
    all('[data-icon]').forEach((el) => {
      if (el.tagName === 'I') el.outerHTML = icon(el.dataset.icon, el.className);
      else if (!el.firstElementChild) el.innerHTML = icon(el.dataset.icon);
    });
    all('[data-stagger]').forEach((p) => {
      const gap = parseInt(p.dataset.stagger, 10) || 90;
      const base = parseInt(p.dataset.staggerBase, 10) || 0;
      [...p.children].forEach((ch, i) => ch.style.setProperty('--d', base + i * gap + 'ms'));
    });
    all('[data-split]').forEach((el) => {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = '1';
      splitText(el);
      observe(el);
    });
    all('[data-reveal], [data-count], [data-observe]').forEach((el) => {
      if (el.dataset.revealBound) return;
      el.dataset.revealBound = '1';
      observe(el);
    });
    const once = (sel, fn) => all(sel).forEach((el) => { if (el.dataset.bound && el.dataset.bound.includes(sel)) return; el.dataset.bound = (el.dataset.bound || '') + sel; fn(el); });
    once('[data-tilt]', bindTilt);
    once('[data-magnetic]', bindMagnetic);
    once('[data-mouse-tilt]', bindMouseTilt);
    once('[data-rail]', bindRail);
    once('[data-coverflow]', bindCoverflow);
    once('[data-accordion]', bindAccordion);
    once('[data-marquee]', (track) => {
      const clone = track.innerHTML;
      track.insertAdjacentHTML('beforeend', clone);
      [...track.children].slice(track.children.length / 2).forEach((c) => c.setAttribute('aria-hidden', 'true'));
    });
    all('[data-parallax]').forEach((el) => parallaxEls.add(el));
  }

  /* ---------- Inicio ---------- */
  function init() {
    renderChrome();
    initStarfield();
    const { nav, menu } = initNav();
    initTransitions();
    initSpotlight();
    initDelegation();
    enhance(document);
    initScroll(nav, menu);

    new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) enhance(n); }));
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* API pública para los scripts de cada página */
  window.AACE = {
    D, $, $$, icon, escapeHTML, normalize,
    parseDate, fmtDate, fmtShort, fmtLong, fmtTime, daysUntil, MESES, MESES_L,
    cursoById, MINIMOS, MOD_ICON, OPP_ICON, EVT_TYPE, oppStatus, eventEnd, upcomingEvents,
    courseCard, openCourse, capacityHTML, comingSoon, modal, toast, countdown,
    reduceMotion
  };

  // Los scripts diferidos de cada página se ejecutan antes de DOMContentLoaded,
  // así que su contenido ya está en el DOM cuando se aplican las mejoras.
  if (document.readyState === 'complete') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
