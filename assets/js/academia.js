/* =========================================================
   AACE · Academia — tabla comparativa y formulario de contacto
   ========================================================= */
(() => {
  'use strict';
  const A = window.AACE;
  const { D, $, $$, icon } = A;

  /* ---------- Tabla comparativa ---------- */
  const V = {
    y: `<span class="cmp cmp--yes" role="img" aria-label="Sí">${icon('check')}</span>`,
    m: `<span class="cmp cmp--mid" role="img" aria-label="Parcial">${icon('minus')}</span>`,
    n: `<span class="cmp cmp--no" role="img" aria-label="No">${icon('x')}</span>`
  };
  const FILAS = [
    ['Ruta de aprendizaje progresiva', 'y', 'm', 'n', 'm'],
    ['Vínculo con oportunidades del sector', 'y', 'n', 'n', 'm'],
    ['Seguimiento personalizado', 'y', 'n', 'n', 'm'],
    ['Foco en el sector aeroespacial', 'y', 'n', 'm', 'm'],
    ['Continuidad pedagógica', 'y', 'm', 'n', 'y'],
    ['Flexibilidad horaria', 'y', 'y', 'm', 'n'],
    ['Eventos, hackatones y comunidad', 'y', 'n', 'm', 'm']
  ];
  $('#compare-body').innerHTML = FILAS.map(([label, ...vals]) =>
    `<tr><td>${label}</td>${vals.map((v, i) => `<td${i === 0 ? ' class="is-us"' : ''}>${V[v]}</td>`).join('')}</tr>`
  ).join('');

  /* ---------- Datos de contacto ---------- */
  $('#c-email').textContent = D.contacto.email;
  $('#c-ubicacion').textContent = D.contacto.ubicacion;
  $('#c-horario').textContent = D.contacto.horario;
  $('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(D.contacto.email);
      A.toast('Email copiado al portapapeles');
    } catch {
      A.toast(D.contacto.email, 'mail');
    }
  });

  /* ---------- Formulario (validación en el cliente, sin envío) ---------- */
  const form = $('#contact-form');
  const perfil = new URLSearchParams(location.search).get('perfil');
  if (perfil && $(`#f-perfil option[value="${perfil}"]`)) $('#f-perfil').value = perfil;

  const rules = {
    'f-nombre': (v) => (v.trim().length >= 3 ? '' : 'Ingresá tu nombre y apellido.'),
    'f-email': (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Ingresá un email válido.'),
    'f-msg': (v) => (v.trim().length >= 10 ? '' : 'Contanos un poco más (mínimo 10 caracteres).')
  };
  const check = (input) => {
    const msg = rules[input.id] ? rules[input.id](input.value) : '';
    const field = input.closest('.field');
    field.classList.toggle('is-invalid', !!msg);
    $('.field__error', field).textContent = msg;
    input.setAttribute('aria-invalid', String(!!msg));
    return !msg;
  };
  Object.keys(rules).forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener('blur', () => check(input));
    input.addEventListener('input', () => { if (input.closest('.field').classList.contains('is-invalid')) check(input); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = Object.keys(rules).map((id) => document.getElementById(id));
    const ok = inputs.map(check).every(Boolean);
    if (!ok) {
      inputs.find((i) => i.getAttribute('aria-invalid') === 'true').focus();
      return;
    }
    A.comingSoon('contacto');
    form.reset();
    $$('.field', form).forEach((f) => f.classList.remove('is-invalid'));
  });
})();
