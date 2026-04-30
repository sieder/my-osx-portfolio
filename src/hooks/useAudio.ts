import { useCallback, useRef } from "react";

type BeepKind = "move" | "select" | "back" | "error";

export function useAudio(enabled: boolean = true) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    return ctxRef.current;
  };

  const beep = useCallback(
    (kind: BeepKind = "move") => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";

      const config = {
        move:   { freq: 440, dur: 0.04, vol: 0.04 },
        select: { freq: 880, dur: 0.08, vol: 0.06 },
        back:   { freq: 220, dur: 0.06, vol: 0.05 },
        error:  { freq: 110, dur: 0.15, vol: 0.06 },
      }[kind];

      osc.frequency.setValueAtTime(config.freq, ctx.currentTime);
      gain.gain.setValueAtTime(config.vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + config.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + config.dur);
    },
    [enabled]
  );

  return { beep };
}
