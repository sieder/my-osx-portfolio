import React from "react";

interface Props {
  children: React.ReactNode;
}

export const CRTShell: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center p-2 sm:p-6 md:p-10 overflow-hidden">
      {/* Chassis */}
      <div
        className="relative bg-crt-chassis rounded-[28px] shadow-2xl"
        style={{
          width: "min(100%, 1100px)",
          height: "min(100%, 780px)",
          background:
            "linear-gradient(160deg, #3A332A 0%, #2A2520 40%, #1A1612 100%)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.7), inset 0 0 30px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.05)",
          padding: "clamp(20px, 4vw, 56px)",
        }}
      >
        {/* Brand label */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-pixel text-amber-deep tracking-widest opacity-50 select-none">
          AMBER 14"
        </div>

        {/* Power LED */}
        <div className="absolute bottom-3 right-6 flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full bg-amber-base"
            style={{ boxShadow: "0 0 6px #FFB000, 0 0 12px #FFB000" }}
          />
          <span className="text-[8px] sm:text-[10px] font-pixel text-amber-deep tracking-widest">
            PWR
          </span>
        </div>

        {/* Knobs */}
        <div className="absolute bottom-3 left-6 flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "radial-gradient(circle, #1A1612, #0A0700)" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "radial-gradient(circle, #1A1612, #0A0700)" }}
          />
        </div>

        {/* Inner screen well (recessed) */}
        <div
          className="relative w-full h-full rounded-[22px] crt-curve"
          style={{
            background: "#0A0700",
            boxShadow:
              "inset 0 0 60px rgba(0,0,0,0.95), inset 0 0 8px rgba(255,176,0,0.15)",
          }}
        >
          {/* Screen content */}
          <div
            className="absolute inset-0 overflow-hidden crt-curve"
            style={{ transform: "perspective(1200px) rotateX(0.4deg)" }}
          >
            {/* Background scanlines layer behind content */}
            <div className="absolute inset-0 z-0 pointer-events-none crt-static" />

            {/* Content */}
            <div className="absolute inset-0 z-10 text-amber-base font-terminal animate-flicker">
              {children}
            </div>

            {/* Scanlines on top */}
            <div className="absolute inset-0 z-20 pointer-events-none crt-scanlines" />

            {/* Moving scanline beam */}
            <div className="absolute left-0 right-0 z-20 pointer-events-none crt-beam animate-scanline" />

            {/* Vignette */}
            <div className="absolute inset-0 z-30 pointer-events-none crt-vignette" />

            {/* Glass reflection highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-1/3 z-30 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
