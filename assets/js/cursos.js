/* =========================================================
   AACE · Cursos — catálogo con buscador, filtros y orden
   (RF03 / RF04: filtrar por nivel y por carrera de interés)
   ========================================================= */
(() => {
  'use strict';
  const A = window.AACE;
  const { D, $, $$, icon, normalize } = A;

  const grid = $('#grid');
  const q = $('#q');
  const clear = $('.search__clear');
  const fNivel = $('#f-nivel');
  const fModalidad = $('#f-modalidad');
  const fOrden = $('#f-orden');
  const chipsWrap = $('#f-ruta');
  const count = $('#results-count');

  const RUTAS = [
    ['', 'Todas'],
    ['comun', 'Base común'],
    ['computacion', 'Computación'],
    ['vida', 'Ciencias de la vida'],
    ['ingenieria', 'Ingenierías']
  ];

  /* ---------- Estado (sincronizado con la URL) ---------- */
  const state = { q: '', ruta: '', nivel: '', modalidad: '', orden: 'inicio' };
  const params = new URLSearchParams(location.search);
  Object.keys(state).forEach((k) => { if (params.get(k)) state[k] = params.get(k); });

  q.value = state.q;
  fNivel.value = state.nivel;
  fModalidad.value = state.modalidad;
  fOrden.value = state.orden;

  /* ---------- Estadísticas del encabezado ---------- */
  const libres = D.cursos.reduce((s, c) => s + Math.max(0, c.cupo - c.inscriptos), 0);
  const proximos = D.cursos.filter((c) => A.parseDate(c.inicio).getFullYear() === 2026).length;
  $('#catalog-stats').innerHTML = [
    [D.cursos.length, 'cursos en el catálogo'],
    [proximos, 'inicios en 2026'],
    [libres, 'lugares disponibles'],
    ['100%', 'con certificación']
  ].map(([n, l]) => `<div class="hero-stat" data-reveal><b>${n}</b><span>${l}</span></div>`).join('');

  /* ---------- Chips de ruta ---------- */
  const countBy = (id) => (id ? D.cursos.filter((c) => c.ruta === id).length : D.cursos.length);
  chipsWrap.innerHTML = RUTAS.map(([id, label]) => `
    <button class="chip${id ? ' rc-' + id : ''}" type="button" data-ruta="${id}" aria-pressed="${state.ruta === id}">
      ${id ? '<span class="swatch"></span>' : ''}${label} <span class="muted">${countBy(id)}</span>
    </button>`).join('');

  /* ---------- Niveles (leyenda) ---------- */
  $('#levels').innerHTML = [1, 2, 3, 4].map((n) => {
    const l = D.niveles[n];
    return `
      <article class="card level-card" data-reveal>
        <span class="level-card__n">Nivel ${n} · ${l.etiqueta}</span>
        <h3>${l.nombre}</h3>
        <p>${l.desc}</p>
        <div class="level-card__bar">${[1, 2, 3, 4].map((i) => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>
      </article>`;
  }).join('');

  /* ---------- Filtrado ---------- */
  const haystack = new Map(D.cursos.map((c) => [c.id, normalize([
    c.titulo, c.resumen, c.modalidad, D.rutas[c.ruta].nombre, D.niveles[c.nivel].nombre, ...c.contenidos
  ].join(' '))]));

  function filtered() {
    const terms = normalize(state.q.trim()).split(/\s+/).filter(Boolean);
    const list = D.cursos.filter((c) =>
      (!state.ruta || c.ruta === state.ruta) &&
      (!state.nivel || String(c.nivel) === state.nivel) &&
      (!state.modalidad || c.modalidad === state.modalidad) &&
      terms.every((t) => haystack.get(c.id).includes(t))
    );
    const sorters = {
      inicio: (a, b) => A.parseDate(a.inicio) - A.parseDate(b.inicio),
      nivel: (a, b) => a.nivel - b.nivel || a.titulo.localeCompare(b.titulo, 'es'),
      cupo: (a, b) => (b.cupo - b.inscriptos) - (a.cupo - a.inscriptos),
      az: (a, b) => a.titulo.localeCompare(b.titulo, 'es')
    };
    return list.sort(sorters[state.orden] || sorters.inicio);
  }

  function syncURL() {
    const p = new URLSearchParams();
    Object.entries(state).forEach(([k, v]) => { if (v && !(k === 'orden' && v === 'inicio')) p.set(k, v); });
    const qs = p.toString();
    try { history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash); } catch { /* file:// */ }
  }

  function render() {
    const list = filtered();
    const active = state.q || state.ruta || state.nivel || state.modalidad;
    count.innerHTML = `<b>${list.length}</b> de ${D.cursos.length} cursos${active ? ' coinciden con tu búsqueda' : ''}`;
    $('#reset').style.visibility = active ? 'visible' : 'hidden';
    clear.classList.toggle('is-visible', !!state.q);
    $$('.chip', chipsWrap).forEach((ch) => ch.setAttribute('aria-pressed', String(ch.dataset.ruta === state.ruta)));

    grid.innerHTML = list.length
      ? list.map((c, i) => `<div class="anim-in" style="--d:${Math.min(i, 9) * 50}ms">${A.courseCard(c)}</div>`).join('')
      : `<div class="empty-state" style="grid-column:1/-1">
           <span class="icon-box">${icon('telescope')}</span>
           <h3>No encontramos cursos con esos filtros</h3>
           <p>Probá con otra búsqueda o quitá algún filtro para ver más resultados.</p>
           <button class="btn btn-ghost btn-sm" type="button" data-reset>Limpiar filtros</button>
         </div>`;
    syncURL();
  }

  /* ---------- Eventos ---------- */
  let debounce;
  q.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => { state.q = q.value; render(); }, 180);
  });
  clear.addEventListener('click', () => { q.value = ''; state.q = ''; render(); q.focus(); });
  fNivel.addEventListener('change', () => { state.nivel = fNivel.value; render(); });
  fModalidad.addEventListener('change', () => { state.modalidad = fModalidad.value; render(); });
  fOrden.addEventListener('change', () => { state.orden = fOrden.value; render(); });
  chipsWrap.addEventListener('click', (e) => {
    const ch = e.target.closest('.chip');
    if (!ch) return;
    state.ruta = ch.dataset.ruta;
    render();
  });
  const reset = () => {
    Object.assign(state, { q: '', ruta: '', nivel: '', modalidad: '' });
    q.value = ''; fNivel.value = ''; fModalidad.value = '';
    render();
  };
  $('#reset').addEventListener('click', reset);
  grid.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) reset(); });

  render();

  // Enlace directo a un curso: cursos.html#c05
  const hashId = location.hash.slice(1);
  if (A.cursoById(hashId)) setTimeout(() => A.openCourse(hashId), 1100);
})();
