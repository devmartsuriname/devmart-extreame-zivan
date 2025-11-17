/**
 * Branding Injection Utility
 * Converts hex colors to HSL and injects them as CSS custom properties
 * Controls global branding for both admin panel and frontend
 */

/**
 * Convert hex color to HSL triplet (space-separated for CSS custom properties)
 * @param {string} hex - Hex color (e.g., "#121212")
 * @returns {string} - HSL triplet (e.g., "220 13% 7%")
 */
function hexToHSL(hex) {
  hex = hex.replace(/^#/, '');
  
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / delta + 2) / 6;
    } else {
      h = ((r - g) / delta + 4) / 6;
    }
  }
  h = Math.round(h * 360);
  
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  
  return `${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Apply branding colors to global CSS custom properties
 * Affects BOTH admin panel and public frontend
 * @param {Object} branding - { primary, secondary, accent }
 */
export function applyBrandingToCSS(branding) {
  const root = document.documentElement;
  
  if (branding.primary) {
    root.style.setProperty('--primary', hexToHSL(branding.primary));
  }
  
  if (branding.secondary) {
    root.style.setProperty('--secondary', hexToHSL(branding.secondary));
  }
  
  if (branding.accent) {
    root.style.setProperty('--accent', hexToHSL(branding.accent));
  }
}

/**
 * Load branding from settings object and apply globally
 * Called on app initialization
 * @param {Object} settings - All site settings
 */
export function loadBrandingFromSettings(settings) {
  if (settings?.branding) {
    applyBrandingToCSS(settings.branding);
  }
}
