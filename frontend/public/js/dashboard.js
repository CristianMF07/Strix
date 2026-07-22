/* ============================================================
   STRIX – Dashboard Scripts
   ============================================================ */

/* ── Sidebar toggle (mobile) ──────────────────────────────── */
(function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggle  = document.getElementById('sidebarToggle');

  if (!sidebar || !overlay || !toggle) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
})();


/* ── Chart.js global defaults ─────────────────────────────── */
Chart.defaults.color        = '#8A93A8';
Chart.defaults.font.family  = "'Segoe UI', system-ui, sans-serif";
Chart.defaults.font.size    = 11;


/* ── Bar Chart – Tendencia de Ventas Mensuales ────────────── */
(function initBarChart() {
  const ctx = document.getElementById('barChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Ventas ($)',
        data: [1200000, 1950000, 1400000, 1700000, 1450000, 2500000],
        backgroundColor: 'rgba(245,166,35,.75)',
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: '#F5A623',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ' $' + ctx.parsed.y.toLocaleString('es-CO')
          }
        }
      },
      scales: {
        x: {
          grid:   { color: 'rgba(46,54,80,.5)' },
          border: { color: '#2E3650' }
        },
        y: {
          grid:   { color: 'rgba(46,54,80,.5)' },
          border: { color: '#2E3650' },
          ticks: {
            callback: v => '$' + (v / 1_000_000).toFixed(1) + 'M'
          }
        }
      }
    }
  });
})();


/* ── Doughnut Chart – Ventas por Categoría ────────────────── */
(function initPieChart() {
  const ctx = document.getElementById('pieChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Camisas', 'Zapatos', 'Pantalones', 'Accesorios'],
      datasets: [{
        data: [35, 28, 22, 15],
        backgroundColor: ['#F5A623', '#28C76F', '#00BFFF', '#8A93A8'],
        borderColor:  '#1A2035',
        borderWidth:  3,
        hoverOffset:  6,
      }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ' ' + ctx.label + ': ' + ctx.parsed + '%'
          }
        }
      }
    }
  });
})();
