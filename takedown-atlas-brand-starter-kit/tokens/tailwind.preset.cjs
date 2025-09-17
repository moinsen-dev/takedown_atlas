// tailwind.preset.cjs
/** Brand tokens preset for Tailwind CSS */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          accent: 'var(--brand-accent)',
          teal: 'var(--brand-teal)',
          slate: 'var(--brand-slate)',
          bg: 'var(--brand-bg)',
          dark: 'var(--brand-dark)',
        },
        state: {
          success: 'var(--brand-success)',
          danger: 'var(--brand-danger)',
          warning: 'var(--brand-warning)',
          info: 'var(--brand-info)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        brand: '0 10px 30px -10px rgba(11,59,95,0.35)'
      }
    }
  }
};
