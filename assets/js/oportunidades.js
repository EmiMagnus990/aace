/* =========================================================
   AACE · Oportunidades — bolsa filtrable por tipo, ruta y nivel
   (RF08 publicar / RF09 postularse, CU09)
   ========================================================= */
(() => {
  'use strict';
  const A = window.AACE;
  const { D, $, $$, icon } = A;

  const grid = $('#opp-grid');
  const chips = $('#f-tipo');
  const fRuta = $('#f-ruta');
  const fNivel = $('#f-nivel');
  const fAbiertas = $('#f-abiertas');
  const TIPOS = ['Beca', 'Pasantía', 'Proceso de selección', 'Hackatón', 'Convocatoria'];
  const ORDER_STATUS = { open: 0, soon: 1, closed: 2 };

  const items = D.oportunidades.map((o) => ({ o, s: A.oppStatus(o) }));
  const state = { tipo: '', ruta: '', nivel: '', abiertas: false };

  /* ---------- Estadísticas ---------- */
  const abiertas = items.filter((x) => x.s.key === 'open');
  const vacantes = abiertas.reduce((n, x) => n + x.o.cupos, 0);
  $('#opp-stats').innerHTML = [
    [abiertas.length, 'convocatorias abiertas'],
    [vacantes, 'vacantes disponibles'],
    [new Set(D.oportunidades.map((o) => o.org)).size, 'organizaciones']
  ].map(([n, l]) => `<div class="hero-stat" data-reveal><b>${n}</b><span>${l}</span></div>`).join('');

  /* ---------- Chips de tipo ---------- */
  chips.innerHTML = [['', 'Todas'], ...TIPOS.map((t) => [t, t])].map(([id, label]) => {
    const n = id ? D.oportunidades.filter((o) => o.tipo === id).length : D.oportunidades.length;
    return `<button class="chip" type="button" data-tipo="${id}" aria-pressed="${state.tipo === id}">${id ? icon(A.OPP_ICON[id]) : ''}${label} <span class="muted">${n}</span></button>`;
  }).join('');

  /* ---------- Tarjeta ---------- */
  const rutasLabel = (rs) => (rs.length === 3 ? 'Todas las rutas' : rs.map((r) => D.rutas[r].corto).join(' · '));
  const deadline = (o, s) => {
    if (s.key === 'soon') return { label: 'Abre el', value: A.fmtDate(o.apertura), urgent: false };
    if (s.key === 'closed') return { label: 'Cerró el', value: A.fmtDate(o.cierre), urgent: false };
    return { label: 'Cierra el', value: `${A.fmtDate(o.cierre)} · ${s.days} ${s.days === 1 ? 'día' : 'días'}`, urgent: s.days <= 14 };
  };

  const card = ({ o, s }, i) => {
    const dl = deadline(o, s);
    return `
      <div class="anim-in" style="--d:${Math.min(i, 8) * 60}ms">
        <article class="card card--lift opp-card${s.key === 'closed' ? ' is-closed' : ''}" id="${o.id}" style="height:100%">
          <div class="opp-card__head">
            <div class="opp-card__org">
              <span class="org-avatar">${o.siglas}</span>
              <span><b>${o.org}</b><small>${o.lugar}</small></span>
            </div>
            <span class="badge ${s.cls}">${s.key === 'open' ? '<span class="dot-pulse"></span>' : ''}${s.label}</span>
          </div>
          <div>
            <div class="opp-card__type"><span class="badge">${icon(A.OPP_ICON[o.tipo])}${o.tipo}</span><span class="badge badge--demo">Ejemplo</span></div>
            <h3 style="margin-top:14px">${o.titulo}</h3>
            <p class="opp-card__desc">${o.desc}</p>
          </div>
          <div class="facts">
            <span class="fact">${icon(A.MOD_ICON[o.modalidad])}${o.modalidad}</span>
            <span class="fact">${icon('layers')}Desde nivel ${o.nivel}</span>
            <span class="fact">${icon('users')}${o.cupos} ${o.cupos === 1 ? 'vacante' : 'vacantes'}</span>
            <span class="fact"><span class="route-dots">${o.rutas.map((r) => `<i class="rc-${r}"></i>`).join('')}</span>${rutasLabel(o.rutas)}</span>
          </div>
          <div class="deadline">
            <div class="deadline__info"><span>${dl.label}</span><b class="${dl.urgent ? 'is-urgent' : ''}">${dl.value}</b></div>
            <div class="deadline__actions">
              <button class="btn btn-ghost btn-sm" type="button" data-opp="${o.id}">Detalle</button>
              <button class="btn btn-primary btn-sm" type="button" data-soon="postulacion" data-name="${A.escapeHTML(o.titulo)}"${s.key !== 'open' ? ' disabled' : ''}>Postularme</button>
            </div>
          </div>
        </article>
      </div>`;
  };

  /* ---------- Detalle en modal ---------- */
  function openOpp(id) {
    const x = items.find((it) => it.o.id === id);
    if (!x) return;
    const { o, s } = x;
    const dl = deadline(o, s);
    A.modal.open(`
      <div>
        <header class="cm-head">
          <div class="cm-head__badges">
            <span class="badge ${s.cls}">${s.label}</span>
            <span class="badge">${icon(A.OPP_ICON[o.tipo])}${o.tipo}</span>
            <span class="badge badge--demo">Ejemplo ilustrativo</span>
          </div>
          <div class="opp-card__org" style="margin-top:20px">
            <span class="org-avatar">${o.siglas}</span>
            <span><b>${o.org}</b><small>${o.lugar}</small></span>
          </div>
          <h2>${o.titulo}</h2>
          <p>${o.desc}</p>
        </header>
        <div class="cm-body">
          <div class="info-grid">
            <div class="info"><span>Modalidad</span><b>${o.modalidad}</b></div>
            <div class="info"><span>Lugar</span><b>${o.lugar}</b></div>
            <div class="info"><span>Vacantes</span><b>${o.cupos}</b></div>
            <div class="info"><span>Nivel recomendado</span><b>Desde nivel ${o.nivel}</b></div>
            <div class="info"><span>Rutas</span><b>${rutasLabel(o.rutas)}</b></div>
            <div class="info"><span>${dl.label}</span><b>${s.key === 'soon' ? A.fmtDate(o.apertura) : A.fmtDate(o.cierre)}</b></div>
          </div>
          <section>
            <h4 class="cm-h">Requisitos</h4>
            <ul class="check-list">${o.requisitos.map((r) => `<li>${icon('check')}<span>${r}</span></li>`).join('')}</ul>
          </section>
          <p class="cm-note">${icon('info')}<span>Antes de confirmar tu postulación, el sistema verificará que tu perfil de alumno esté completo. La postulación quedará registrada con fecha y estado, visible para vos y para la Coordinación.</span></p>
        </div>
        <footer class="cm-foot">
          <span class="muted" style="font-size:.85rem">${s.key === 'open' ? `Quedan ${s.days} ${s.days === 1 ? 'día' : 'días'} para postularte` : s.key === 'soon' ? 'La convocatoria todavía no abrió' : 'La convocatoria ya cerró'}</span>
          <button class="btn btn-primary" type="button" data-soon="postulacion" data-name="${A.escapeHTML(o.titulo)}"${s.key !== 'open' ? ' disabled' : ''}>Postularme ${icon('arrow-right', 'ico-arrow')}</button>
        </footer>
      </div>`, { label: o.titulo });
  }

  /* ---------- Render ---------- */
  function render() {
    const list = items
      .filter(({ o, s }) =>
        (!state.tipo || o.tipo === state.tipo) &&
        (!state.ruta || o.rutas.includes(state.ruta)) &&
        (!state.nivel || o.nivel <= Number(state.nivel)) &&
        (!state.abiertas || s.key === 'open'))
      .sort((a, b) => ORDER_STATUS[a.s.key] - ORDER_STATUS[b.s.key] || A.parseDate(a.o.cierre) - A.parseDate(b.o.cierre));

    const active = state.tipo || state.ruta || state.nivel || state.abiertas;
    $('#opp-count').innerHTML = `<b>${list.length}</b> de ${items.length} oportunidades`;
    $('#reset').style.visibility = active ? 'visible' : 'hidden';
    $$('.chip', chips).forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.tipo === state.tipo)));

    grid.innerHTML = list.length
      ? list.map(card).join('')
      : `<div class="empty-state" style="grid-column:1/-1">
           <span class="icon-box">${icon('satellite')}</span>
           <h3>No hay oportunidades con esos filtros</h3>
           <p>Probá con otra combinación. Nuevas convocatorias se publican a medida que se concretan convenios.</p>
         </div>`;
  }

  chips.addEventListener('click', (e) => {
    const c = e.target.closest('.chip');
    if (c) { state.tipo = c.dataset.tipo; render(); }
  });
  fRuta.addEventListener('change', () => { state.ruta = fRuta.value; render(); });
  fNivel.addEventListener('change', () => { state.nivel = fNivel.value; render(); });
  fAbiertas.addEventListener('change', () => { state.abiertas = fAbiertas.checked; render(); });
  $('#reset').addEventListener('click', () => {
    Object.assign(state, { tipo: '', ruta: '', nivel: '', abiertas: false });
    fRuta.value = ''; fNivel.value = ''; fAbiertas.checked = false;
    render();
  });
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-opp]');
    if (b) openOpp(b.dataset.opp);
  });

  render();

  // Enlace directo desde el inicio: oportunidades.html#o1
  const target = location.hash && document.getElementById(location.hash.slice(1));
  if (target) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: A.reduceMotion ? 'auto' : 'smooth', block: 'center' });
      target.classList.add('is-highlight');
    }, 900);
  }
})();
