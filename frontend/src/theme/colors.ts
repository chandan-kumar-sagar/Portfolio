/** Shared UI palette — keep globe, particles, and sections in sync */
export const theme = {
  bg: '#03030c',
  bgDeep: '#02020a',
  card: '#080915',
  cardGlass: 'rgba(8, 9, 21, 0.55)',
  grid: '#07091b',
  dark: '#050614',

  neon: {
    cyan: '#00f0ff',
    blue: '#0066ff',
    purple: '#bd00ff',
    pink: '#ff007f',
  },

  /** Three.js / WebGL */
  three: {
    fog: '#03030c',
    ambient: '#0a0e1c',
    core: '#050614',
    coreWire: '#0d1b3e',
    particle: '#00f0ff',
    particleAlt: '#bd00ff',
    ringColors: ['#00f0ff', '#bd00ff', '#ff007f', '#0066ff', '#00f0ff'] as const,
    streamColors: ['#00f0ff', '#bd00ff', '#ff007f', '#0066ff'] as const,
    star: '#6b9eb8',
  },

  rgba: {
    cyan03: 'rgba(0, 240, 255, 0.03)',
    cyan08: 'rgba(0, 240, 255, 0.08)',
    cyan15: 'rgba(0, 240, 255, 0.15)',
    cyan25: 'rgba(0, 240, 255, 0.25)',
    purple04: 'rgba(189, 0, 255, 0.04)',
    purple08: 'rgba(189, 0, 255, 0.08)',
    pink04: 'rgba(255, 0, 127, 0.04)',
  },
} as const;

export default theme;
