/* =========================================================
   AACE · Rutas — pestañas por carrera, trayectoria por niveles
   y mapa completo de cursos (RF06: progreso en la ruta)
   ========================================================= */
(() => {
  'use strict';
  const A = window.AACE;
  const { D, $, $$, icon } = A;

  const ORDER = ['computacion', 'vida', 'ingenieria'];
  const tabs = $('#route-tabs');
  const panel = $('#route-panel');
  const fromHash = () => (ORDER.includes(location.hash.slice(1)) ? location.hash.slice(1) : null);
  let current = fromHash() || 'computacion';

  const cursosDe = (ruta, nivel) =>
    D.cursos.filter((c) => c.nivel === nivel && !c.minimo && (c.ruta === ruta || c.ruta === 'comun'));

  const pill = (c) => `
    <button class="course-pill rc-${c.ruta}" type="button" data-open-course="${c.id}">
      <span class="icon-box icon-box--route">${icon(c.icon)}</span>
      <span class="course-pill__txt">
        <b>${c.titulo}</b>
        <small>${c.semanas} semanas · ${c.modalidad}${c.ruta === 'comun' ? ' · Base común' : ''}</small>
      </span>
      ${icon('arrow-right')}
    </button>`;

  /* ---------- Pestañas ---------- */
  tabs.innerHTML = ORDER.map((id) => {
    const r = D.rutas[id];
    return `
      <button class="route-tab rc-${id}" type="button" role="tab" id="tab-${id}" data-route="${id}"
              aria-selected="${id === current}" aria-controls="route-panel" tabindex="${id === current ? 0 : -1}">
        <span class="icon-box icon-box--route">${icon(r.icon)}</span>
        <span><b>${r.nombre}</b><small>${r.especialidades.join(' · ')}</small></span>
      </button>`;
  }).join('');

  /* ---------- Panel de la ruta ---------- */
  function renderPanel(id) {
    const r = D.rutas[id];
    const propios = D.cursos.filter((c) => c.ruta === id);
    const horas = propios.reduce((s, c) => s + c.horas, 0);
    panel.className = `route-panel rc-${id}`;
    panel.setAttribute('aria-labelledby', `tab-${id}`);
    panel.innerHTML = `
      <aside class="route-aside">
        <div>
          <span class="eyebrow">Ruta ${ORDER.indexOf(id) + 1} de 3</span>
          <h2 style="margin-top:14px">${r.nombre}</h2>
          <p class="route-aside__lema" style="margin-top:8px">${r.lema}</p>
        </div>
        <p>${r.desc}</p>
        <div><h4>Especialidades</h4><div class="tags">${r.especialidades.map((e) => `<span class="tag">${e}</span>`).join('')}</div></div>
        <div><h4>¿Hacia dónde te lleva?</h4><ul class="dest-list">${r.destinos.map((d) => `<li>${icon('target')}${d}</li>`).join('')}</ul></div>
        <div class="route-aside__stats">
          <div><b>${propios.length}</b><span>cursos propios</span></div>
          <div><b>${horas}</b><span>horas</span></div>
          <div><b>4</b><span>niveles</span></div>
        </div>
        <a class="btn btn-primary" href="cursos.html?ruta=${id}">Ver cursos de esta ruta ${icon('arrow-right', 'ico-arrow')}</a>
      </aside>

      <div class="trajectory" id="trajectory">
        <div class="trajectory__line" aria-hidden="true"><div class="trajectory__fill"></div><span class="trajectory__probe"></span></div>

        <div class="stage stage--min" data-stage data-reveal>
          <span class="stage__node">${icon('book')}</span>
          <div class="card stage__card">
            <span class="stage__label">Antes de despegar · Conocimientos mínimos</span>
            <h3>Cuenta regresiva</h3>
            <p class="stage__desc">La base común de todas las rutas. Podés acreditarla con estos cursos o con una certificación equivalente.</p>
            <div class="stage__courses">${A.MINIMOS.map(pill).join('')}</div>
          </div>
        </div>

        ${[1, 2, 3, 4].map((n) => {
          const l = D.niveles[n];
          return `
            <div class="stage" data-stage data-reveal>
              <span class="stage__node">N${n}</span>
              <div class="card stage__card">
                <span class="stage__label">Nivel ${n} · ${l.etiqueta}</span>
                <h3>${l.nombre}</h3>
                <p class="stage__desc">${l.desc}</p>
                <div class="stage__courses">${cursosDe(id, n).map(pill).join('')}</div>
              </div>
            </div>`;
        }).join('')}

        <div class="stage stage--goal" data-stage data-reveal>
          <span class="stage__node">${icon('rocket')}</span>
          <div class="card stage__card">
            <span class="stage__label">Destino</span>
            <h3>El sector aeroespacial</h3>
            <p class="stage__desc">Con tu ruta avanzada y certificada, accedés a becas, pasantías y procesos de selección filtrados según tu carrera y tu nivel.</p>
            <div class="stage__goal-actions">
              <a class="btn btn-primary btn-sm" href="oportunidades.html">Ver oportunidades ${icon('arrow-right', 'ico-arrow')}</a>
              <a class="btn btn-ghost btn-sm" href="eventos.html">Próximos eventos</a>
            </div>
          </div>
        </div>
      </div>`;
    updateTrajectory();
  }

  /* ---------- Progreso de la trayectoria con el scroll ---------- */
  function updateTrajectory() {
    const traj = $('#trajectory');
    if (!traj) return;
    const line = $('.trajectory__line', traj);
    const r = line.getBoundingClientRect();
    const anchor = window.innerHeight * 0.55;
    const pct = Math.max(0, Math.min(1, (anchor - r.top) / r.height));
    line.style.setProperty('--fill', (pct * 100).toFixed(2) + '%');
    $$('[data-stage]', traj).forEach((st) => {
      const nr = $('.stage__node', st).getBoundingClientRect();
      st.classList.toggle('is-reached', nr.top + nr.height / 2 < anchor);
    });
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; updateTrajectory(); });
  }, { passive: true });
  window.addEventListener('resize', updateTrajectory);

  /* ---------- Cambio de ruta ---------- */
  function select(id, { focus = false } = {}) {
    if (!ORDER.includes(id) || id === current) return;
    current = id;
    $$('.route-tab', tabs).forEach((t) => {
      const on = t.dataset.route === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    try { history.replaceState(null, '', '#' + id); } catch { /* file:// */ }
    panel.classList.add('is-switching');
    setTimeout(() => {
      renderPanel(id);
      panel.classList.remove('is-switching');
    }, A.reduceMotion ? 0 : 320);
  }

  tabs.addEventListener('click', (e) => {
    const t = e.target.closest('.route-tab');
    if (t) select(t.dataset.route);
  });
  tabs.addEventListener('keydown', (e) => {
    const i = ORDER.indexOf(current);
    if (e.key === 'ArrowRight') { e.preventDefault(); select(ORDER[(i + 1) % 3], { focus: true }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(ORDER[(i + 2) % 3], { focus: true }); }
  });
  window.addEventListener('hashchange', () => {
    const id = fromHash();
    if (id) { select(id); $('#explorar').scrollIntoView({ behavior: A.reduceMotion ? 'auto' : 'smooth' }); }
  });

  renderPanel(current);

  // Si se llegó con #ruta desde otra página, bajar hasta el explorador
  if (fromHash()) {
    setTimeout(() => $('#explorar').scrollIntoView({ behavior: A.reduceMotion ? 'auto' : 'smooth' }), 900);
  }

  /* ---------- Mapa completo (matriz nivel × ruta) ---------- */
  const COLS = ['comun', ...ORDER];
  const cell = (ruta, n) => {
    const list = D.cursos.filter((c) => c.ruta === ruta && c.nivel === n);
    return list.length
      ? list.map((c) => `<button type="button" class="rc-${c.ruta}" data-open-course="${c.id}">${c.titulo}${c.minimo ? ' <span class="muted">· mínimo</span>' : ''}</button>`).join('')
      : '<span class="matrix__empty">—</span>';
  };
  $('#matrix').innerHTML = `
    <div class="matrix__corner">Nivel / Ruta</div>
    ${COLS.map((id) => `<div class="matrix__col rc-${id}">${icon(D.rutas[id].icon)}${D.rutas[id].corto}</div>`).join('')}
    ${[1, 2, 3, 4].map((n) => `
      <div class="matrix__row"><span>Nivel ${n}</span><b>${D.niveles[n].nombre}</b></div>
      ${COLS.map((id) => `<div class="matrix__cell">${cell(id, n)}</div>`).join('')}
    `).join('')}`;
})();
