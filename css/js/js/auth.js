// js/auth.js - include this on every page
// Simple auth flow: shows overlay if not authorized, posts to Netlify function to verify.

const AUTH_KEY = "portfolio_auth_v1";
const FUNCTION_URL = "/.netlify/functions/verifyPassword";

function isAuthorized() {
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

function setAuthorized(val) {
  try {
    localStorage.setItem(AUTH_KEY, val ? "true" : "false");
  } catch {}
}

function createOverlay() {
  if (document.getElementById("pw-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "pw-overlay";
  overlay.innerHTML = `
    <div class="pw-card">
      <h3>Private Portfolio</h3>
      <p class="sub">This portfolio is restricted. Please enter the access password to continue.</p>
      <div class="form-row">
        <input id="pw-input" type="password" placeholder="Enter password" />
        <button id="pw-submit" class="btn">Enter</button>
      </div>
      <p class="pw-note">Contact owner if you believe you need access.</p>
      <p id="pw-error" style="color:#b00020; margin-top:10px; display:none"></p>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("pw-submit").addEventListener("click", submitPassword);
  document.getElementById("pw-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") submitPassword();
  });
}

async function submitPassword() {
  const input = document.getElementById("pw-input");
  const errEl = document.getElementById("pw-error");
  if (!input) return;
  const pw = input.value.trim();
  if (!pw) {
    errEl.style.display = "block";
    errEl.innerText = "Please enter a password.";
    return;
  }

  // disable UI
  input.disabled = true;
  document.getElementById("pw-submit").disabled = true;

  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });

    const json = await res.json();
    if (res.ok && json.authorized) {
      setAuthorized(true);
      // remove overlay
      const overlay = document.getElementById("pw-overlay");
      if (overlay) overlay.remove();
    } else {
      errEl.style.display = "block";
      errEl.innerText = "Incorrect password.";
      input.disabled = false;
      document.getElementById("pw-submit").disabled = false;
    }
  } catch (err) {
    errEl.style.display = "block";
    errEl.innerText = "Network error. Try again.";
    input.disabled = false;
    document.getElementById("pw-submit").disabled = false;
  }
}

function initAuth() {
  if (!isAuthorized()) {
    createOverlay();
  }
}

// Optional helper to logout (call from UI)
function logoutAuth() {
  setAuthorized(false);
  window.location.reload();
}

// export for pages
window.__portfolioAuth = { initAuth, logoutAuth, isAuthorized };

document.addEventListener("DOMContentLoaded", initAuth);
