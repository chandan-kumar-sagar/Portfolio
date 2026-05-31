/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      colors: {
        cyber: {
          bg: "#03030c",      // Ultra-deep space black
          card: "rgba(10, 11, 26, 0.45)", // Semi-transparent glass container
          border: "rgba(0, 255, 255, 0.15)", // Interactive cyan border
          grid: "#07091b",
          dark: "#050614",
          light: "#1a1d36",
          accent: "#00ffff"
        },
        neon: {
          cyan: "#00f0ff",
          blue: "#0066ff",
          purple: "#bd00ff",
          pink: "#ff007f",
          green: "#39ff14"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 240, 255, 0.35)',
        'blue-glow': '0 0 15px rgba(0, 102, 255, 0.35)',
        'purple-glow': '0 0 15px rgba(189, 0, 255, 0.35)',
        'cyan-glow-heavy': '0 0 25px rgba(0, 240, 255, 0.65)',
        'hud-glow': 'inset 0 0 15px rgba(0, 240, 255, 0.1), 0 0 10px rgba(0, 240, 255, 0.2)'
      },
      animation: {
        'matrix-float': 'matrixFloat 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'hud-scan': 'hudScan 8s linear infinite',
        'typing-blink': 'typingBlink 0.8s step-end infinite',
        'slow-spin': 'spin 20s linear infinite',
        'reverse-spin': 'reverseSpin 15s linear infinite',
        'glitch': 'glitch 1s linear infinite'
      },
      keyframes: {
        matrixFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.35, filter: 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.3))' },
          '50%': { opacity: 0.9, filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.8))' }
        },
        hudScan: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' }
        },
        typingBlink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00f0ff' }
        },
        reverseSpin: {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' }
        },
        glitch: {
          '0%': { clipPath: 'inset(40% 0 61% 0)' },
          '20%': { clipPath: 'inset(92% 0 1% 0)' },
          '40%': { clipPath: 'inset(25% 0 58% 0)' },
          '60%': { clipPath: 'inset(75% 0 5% 0)' },
          '80%': { clipPath: 'inset(12% 0 85% 0)' },
          '100%': { clipPath: 'inset(60% 0 20% 0)' }
        }
      }
    },
  },
  plugins: [],
}
