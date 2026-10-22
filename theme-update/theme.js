/* Shared by the hub, learning paths and standalone courses. */
(() => {
  'use strict';
  const key = 'masterTechAcademy.theme';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  let button;
  try { preference = localStorage.getItem(key); } catch (_) { /* Storage can be disabled. */ }
  if (preference !== 'light' && preference !== 'dark') preference = null;
  function apply() {
    const dark = (preference || (system.matches ? 'dark' : 'light')) === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    if (button) {
      button.textContent = dark ? '☀ Sáng / Light' : '☾ Tối / Dark';
      button.setAttribute('aria-pressed', String(dark));
    }
  }
  apply();
  system.addEventListener('change', () => { if (!preference) apply(); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
    apply();
  });
  document.addEventListener('DOMContentLoaded', () => {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'academy-theme-toggle';
    button.setAttribute('aria-label', 'Giao diện tối / Dark mode');
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch (_) { /* Keep working in memory. */ }
      apply();
    });
    document.body.appendChild(button);
    apply();
  });
})();
