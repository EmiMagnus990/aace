/* =========================================================
   AACE · Eventos — cuenta regresiva, agenda por mes,
   detalle en modal y exportación a calendario (.ics)
   ========================================================= */
(() => {
  'use strict';
  const A = window.AACE;
  const { D, $, $$, icon } = A;

  const TIPOS = Object.keys(A.EVT_TYPE);
  const upcoming = A.upcomingEvents();
  const past = D.eventos.filter((e) => A.eventEnd(e) <= new Date()).sort((a, b) => A.parseDate(b.fecha) - A.parseDate(a.fecha));
  const byId = (id) => D.eventos.find((e) => e.id === id);
  let tipo = '';

  const duracion = (e) => {
    if (e.fin) {
      const dias = Math.round((A.parseDate(e.fin) - A.parseDate(e.fecha)) / 864e5) + 1;
      return `${dias} días`;
    }
    const h = (e.duracion || 90) / 60;
    return h % 1 ? `${h.toFixed(1).replace('.', ',')} h` : `${h} h`;
  };
  const rutasTxt = (e) => (!e.rutas || e.rutas.length === 3 ? 'Todas las rutas' : e.rutas.map((r) => D.rutas[r].corto).join(' · '));

  /* ---------- Próximo evento ---------- */
  const next = upcoming[0];
  const nextCard = $('#next-card');
  if (next) {
    nextCard.innerHTML = `
      <span class="badge badge--open" style="justify-self:start"><span class="dot-pulse"></span>Próximo evento · ${next.tipo}</span>
      <p class="countdown-card__title">${next.titulo}</p>
      <ul class="meta-list">
        <li>${icon('calendar')}${A.fmtLong(next.fecha)}</li>
        <li>${icon('clock')}${A.fmtTime(next.fecha)}</li>
        <li>${icon(A.MOD_ICON[next.modalidad])}${next.lugar}</li>
      </ul>
      <div class="countdown" aria-label="Cuenta regresiva">
        <div class="cd-unit"><b data-cd="d">00</b><span>días</span></div>
        <div class="cd-unit"><b data-cd="h">00</b><span>horas</span></div>
        <div class="cd-unit"><b data-cd="m">00</b><span>min</span></div>
        <div class="cd-unit"><b data-cd="s">00</b><span>seg</span></div>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" type="button" data-soon="evento" data-name="${A.escapeHTML(next.titulo)}">Reservar lugar</button>
        <button class="btn btn-ghost btn-sm" type="button" data-ics="${next.id}">${icon('calendar-plus')}Agregar al calendario</button>
      </div>`;
    A.countdown(nextCard, next.fecha);
  } else {
    nextCard.innerHTML = '<p class="countdown-card__title">Pronto anunciaremos nuevos eventos.</p>';
  }

  /* ---------- Chips ---------- */
  const chips = $('#f-tipo');
  chips.innerHTML = [['', 'Todos'], ...TIPOS.map((t) => [t, t])].map(([id, label]) => {
    const n = id ? upcoming.filter((e) => e.tipo === id).length : upcoming.length;
    return `<button class="chip" type="button" data-tipo="${id}" aria-pressed="${id === tipo}"${!n ? ' disabled' : ''}>${id ? icon(A.EVT_TYPE[id].icon) : ''}${label} <span class="muted">${n}</span></button>`;
  }).join('');

  /* ---------- Agenda agrupada por mes ---------- */
  const eventCard = (e) => {
    const d = A.parseDate(e.fecha);
    const t = A.EVT_TYPE[e.tipo];
    return `
      <article class="card event-card ${t.cls}" id="${e.id}">
        <div class="date-block"><b>${d.getDate()}</b><span>${A.MESES[d.getMonth()]}</span></div>
        <div>
          <span class="badge type-badge">${icon(t.icon)}${e.tipo}</span>
          <h3>${e.titulo}</h3>
          <ul class="meta-list">
            <li>${icon('clock')}${A.fmtLong(e.fecha).split(' ')[0]} · ${A.fmtTime(e.fecha)}${e.fin ? ` · ${duracion(e)}` : ''}</li>
            <li>${icon(A.MOD_ICON[e.modalidad])}${e.lugar}</li>
          </ul>
        </div>
        <div class="event-card__actions">
          <button class="btn btn-ghost btn-sm" type="button" data-evt="${e.id}">Detalle</button>
          <button class="btn btn-primary btn-sm" type="button" data-ics="${e.id}">${icon('calendar-plus')}Agendar</button>
        </div>
      </article>`;
  };

  function render() {
    const list = upcoming.filter((e) => !tipo || e.tipo === tipo);
    $('#evt-count').innerHTML = `<b>${list.length}</b> ${list.length === 1 ? 'evento próximo' : 'eventos próximos'}`;
    $$('.chip', chips).forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.tipo === tipo)));

    const groups = [];
    list.forEach((e) => {
      const d = A.parseDate(e.fecha);
      const key = d.getFullYear() * 12 + d.getMonth();
      let g = groups.find((x) => x.key === key);
      if (!g) groups.push((g = { key, d, items: [] }));
      g.items.push(e);
    });

    $('#agenda-list').innerHTML = groups.length
      ? groups.map((g, gi) => `
          <div class="month-group anim-in" style="--d:${gi * 90}ms">
            <div class="month-label"><b>${A.MESES_L[g.d.getMonth()]}</b><span>${g.d.getFullYear()} · ${g.items.length} ${g.items.length === 1 ? 'evento' : 'eventos'}</span></div>
            <div class="month-events">${g.items.map(eventCard).join('')}</div>
          </div>`).join('')
      : `<div class="empty-state"><span class="icon-box">${icon('calendar')}</span><h3>No hay eventos de este tipo por ahora</h3><p>Volvé a mirar pronto: la agenda se actualiza constantemente.</p></div>`;
  }

  $('#past-list').innerHTML = past.map((e) => `
    <div class="past-item">
      <span><b>${e.titulo}</b> · ${e.tipo}</span>
      <span class="mono" style="font-size:.78rem">${A.fmtDate(e.fecha)} · Finalizado</span>
    </div>`).join('');

  chips.addEventListener('click', (e) => {
    const c = e.target.closest('.chip');
    if (c && !c.disabled) { tipo = c.dataset.tipo; render(); }
  });

  /* ---------- Detalle ---------- */
  function openEvent(id) {
    const e = byId(id);
    if (!e) return;
    const t = A.EVT_TYPE[e.tipo];
    A.modal.open(`
      <div class="${t.cls}">
        <header class="cm-head">
          <div class="evt-head">
            <span class="badge type-badge">${icon(t.icon)}${e.tipo}</span>
            <span class="badge">${A.fmtDate(e.fecha)}</span>
          </div>
          <h2>${e.titulo}</h2>
          <p>${e.desc}</p>
        </header>
        <div class="cm-body">
          <div class="info-grid">
            <div class="info"><span>Fecha</span><b>${A.fmtLong(e.fecha)}</b></div>
            <div class="info"><span>Horario</span><b>${A.fmtTime(e.fecha)}</b></div>
            <div class="info"><span>Duración</span><b>${duracion(e)}</b></div>
            <div class="info"><span>Modalidad</span><b>${e.modalidad}</b></div>
            <div class="info"><span>Lugar</span><b>${e.lugar}</b></div>
            <div class="info"><span>Para</span><b>${rutasTxt(e)}</b></div>
          </div>
          ${e.ponente ? `<p class="cm-note">${icon('mic')}<span>A cargo de: <b>${e.ponente}</b></span></p>` : ''}
        </div>
        <footer class="cm-foot">
          <button class="btn btn-ghost" type="button" data-ics="${e.id}">${icon('calendar-plus')}Agregar al calendario</button>
          <button class="btn btn-primary" type="button" data-soon="evento" data-name="${A.escapeHTML(e.titulo)}">Reservar lugar ${icon('arrow-right', 'ico-arrow')}</button>
        </footer>
      </div>`, { label: e.titulo });
  }

  /* ---------- Exportar a calendario (.ics) ---------- */
  function downloadICS(id) {
    const e = byId(id);
    if (!e) return;
    const start = A.parseDate(e.fecha);
    const end = A.eventEnd(e);
    const f = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const esc = (s) => String(s).replace(/[\\,;]/g, (m) => '\\' + m);
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AACE Cruz del Sur//Agenda//ES', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${e.id}@aace-cruzdelsur`,
      `DTSTAMP:${f(new Date())}`,
      `DTSTART:${f(start)}`,
      `DTEND:${f(end)}`,
      `SUMMARY:${esc(e.titulo)}`,
      `DESCRIPTION:${esc(e.desc)}`,
      `LOCATION:${esc(e.lugar)}`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `aace-${e.id}.ics`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    A.toast('Evento listo para agregar a tu calendario', 'calendar-plus');
  }

  document.addEventListener('click', (ev) => {
    const ics = ev.target.closest('[data-ics]');
    if (ics) { downloadICS(ics.dataset.ics); return; }
    const det = ev.target.closest('[data-evt]');
    if (det) openEvent(det.dataset.evt);
  });

  render();

  // Enlace directo desde el inicio: eventos.html#e2
  const target = location.hash && document.getElementById(location.hash.slice(1));
  if (target && target.classList.contains('event-card')) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: A.reduceMotion ? 'auto' : 'smooth', block: 'center' });
      target.classList.add('is-highlight');
    }, 900);
  }
})();
