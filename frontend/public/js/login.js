/* ============================================================
   STRIX – Login Scripts
   ============================================================ */

/**
 * Toggle password visibility
 */
function togglePw() {
  const field   = document.getElementById('pwField');
  const eyeIcon = document.getElementById('eyeIcon');

  if (field.type === 'password') {
    field.type        = 'text';
    eyeIcon.className = 'bi bi-eye-slash';
  } else {
    field.type        = 'password';
    eyeIcon.className = 'bi bi-eye';
  }
}
