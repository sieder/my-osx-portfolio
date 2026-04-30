module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        amber: {
          base: "#FFB000",
          bright: "#FFCC33",
          dim: "#C68D00",
          deep: "#8A5A00",
          glow: "rgba(255, 176, 0, 0.5)",
        },
        crt: {
          bg: "#0A0700",
          chassis: "#2A2520",
          chassisDark: "#1A1612",
          chassisLight: "#3A332A",
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        terminal: ['"VT323"', "monospace"],
      },
      animation: {
        flicker: "flicker 0.15s infinite",
        scanline: "scanline 8s linear infinite",
        blink: "blink 1s steps(2) infinite",
        bootFlash: "bootFlash 0.3s ease-out",
        powerOff: "powerOff 0.6s ease-in forwards",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.97" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        bootFlash: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        powerOff: {
          "0%": { transform: "scale(1, 1)", opacity: "1" },
          "60%": { transform: "scale(1, 0.005)", opacity: "1" },
          "100%": { transform: "scale(0, 0.005)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
