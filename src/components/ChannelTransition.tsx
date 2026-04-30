import React, { useEffect } from "react";

interface Props {
  active: boolean;
  onEnd: () => void;
  durationMs?: number;
}

export const ChannelTransition: React.FC<Props> = ({ active, onEnd, durationMs = 220 }) => {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(onEnd, durationMs);
    return () => clearTimeout(t);
  }, [active, durationMs, onEnd]);

  if (!active) return null;
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 crt-static bg-crt-bg opacity-90" />
      <div
        className="absolute left-0 right-0 h-2 bg-amber-base opacity-70"
        style={{
          top: "48%",
          boxShadow: "0 0 20px #FFB000, 0 0 40px #FFB000",
        }}
      />
    </div>
  );
};
