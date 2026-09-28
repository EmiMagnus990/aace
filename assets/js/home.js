/* =========================================================
   AACE · Inicio — contenido dinámico de la landing
   ========================================================= */
(() => {
  'use strict';
  const A = window.AACE;
  const { D, $, icon } = A;

  // Cantidad real de cursos del catálogo
  const statCursos = $('[data-stat="cursos"]');
  if (statCursos) statCursos.dataset.count = D.cursos.length;

  /* ---------- Rutas ---------- */
  const ORDER = ['computacion', 'vida', 'ingenieria'];
  $('#home-routes').innerHTML = ORDER.map((id, i) => {
    const r = D.rutas[id];
    const propios = D.cursos.filter((c) => c.ruta === id).length;
    return `
      <div data-reveal>
        <a class="card route-card rc-${id}" href="rutas.html#${id}" data-tilt="6">
          <span class="route-card__glow" aria-hidden="true"></span>
          <span class="route-card__num">0${i + 1} / 03</span>
          <span class="icon-box icon-box--route">${icon(r.icon)}</span>
          <div>
            <h3>${r.nombre}</h3>
            <p class="route-card__lema">${r.lema}</p>
          </div>
          <p class="route-card__desc">${r.desc}</p>
          <div class="tags">${r.especialidades.map((e) => `<span class="tag">${e}</span>`).join('')}</div>
          <div class="route-card__levels">
            <small>4 niveles · ${propios} cursos + base común</small>
            <div class="route-card__bars">${[0, 1, 2, 3].map((n) => `<i style="--i:${n}"></i>`).join('')}</div>
          </div>
          <div class="route-card__foot"><span>Explorar ruta</span>${icon('arrow-right')}</div>
        </a>
      </div>`;
  }).join('');

  /* ---------- Cursos destacados (carrusel) ---------- */
  $('#featured-track').innerHTML = D.cursos
    .filter((c) => c.destacado)
    .sort((a, b) => A.parseDate(a.inicio) - A.parseDate(b.inicio))
    .map(A.courseCard)
    .join('');

  /* ---------- Oportunidades abiertas ---------- */
  const abiertas = D.oportunidades
    .map((o) => ({ o, s: A.oppStatus(o) }))
    .filter((x) => x.s.key === 'open')
    .sort((a, b) => A.parseDate(a.o.cierre) - A.parseDate(b.o.cierre))
    .slice(0, 4);

  $('#home-opps').innerHTML = abiertas.length
    ? abiertas.map(({ o, s }) => `
        <a class="opp-row" href="oportunidades.html#${o.id}">
          <span class="org-avatar">${o.siglas}</span>
          <div>
            <h4>${o.titulo}</h4>
            <small>${o.org} · ${o.modalidad}</small>
          </div>
          <div class="opp-row__right">
            <span class="badge">${icon(A.OPP_ICON[o.tipo])}${o.tipo}</span>
            <small class="mono">Cierra en ${s.days} ${s.days === 1 ? 'día' : 'días'}</small>
          </div>
        </a>`).join('')
    : '<p class="muted">No hay convocatorias abiertas en este momento.</p>';

  /* ---------- Eventos: próximo con cuenta regresiva + siguientes ---------- */
  const proximos = A.upcomingEvents();
  const next = proximos[0];
  const eventRow = (e) => {
    const d = A.parseDate(e.fecha);
    return `
      <a class="event-row" href="eventos.html#${e.id}">
        <span class="date-block"><b>${d.getDate()}</b><span>${A.MESES[d.getMonth()]}</span></span>
        <div>
          <h4>${e.titulo}</h4>
          <small>${icon(A.EVT_TYPE[e.tipo].icon)}${e.tipo} · ${A.fmtTime(e.fecha)} · ${e.modalidad}</small>
        </div>
      </a>`;
  };

  if (next) {
    $('#home-next').innerHTML = `
      <span class="badge badge--soon" style="justify-self:start">${icon(A.EVT_TYPE[next.tipo].icon)}Próximo · ${next.tipo} · ${A.fmtShort(next.fecha)}</span>
      <p class="next-event__title">${next.titulo}</p>
      <div class="countdown" aria-label="Cuenta regresiva al próximo evento">
        <div class="cd-unit"><b data-cd="d">00</b><span>días</span></div>
        <div class="cd-unit"><b data-cd="h">00</b><span>horas</span></div>
        <div class="cd-unit"><b data-cd="m">00</b><span>min</span></div>
        <div class="cd-unit"><b data-cd="s">00</b><span>seg</span></div>
      </div>`;
    A.countdown($('#home-next'), next.fecha);

    const bar = $('#hero-next-event');
    bar.innerHTML = `Próximo evento · T− <b><span data-cd="d">00</span>d <span data-cd="h">00</span>h <span data-cd="m">00</span>m</b>`;
    A.countdown(bar, next.fecha);
  } else {
    $('#home-next').remove();
  }
  $('#home-events').innerHTML = proximos.slice(1, 4).map(eventRow).join('');
})();
