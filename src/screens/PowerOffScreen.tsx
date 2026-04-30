import React, { useEffect, useState } from "react";

interface Props {
  onPowerOn: () => void;
}

export const PowerOffScreen: React.FC<Props> = ({ onPowerOn }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!done) return;
    const onKey = () => onPowerOn();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onKey);
    };
  }, [done, onPowerOn]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {!done ? (
        <div className="w-full h-full animate-powerOff bg-amber-base/30" />
      ) : (
        <div className="text-center">
          <div className="w-2 h-2 mx-auto bg-amber-base/30 rounded-full mb-6" />
          <div className="text-xs sm:text-sm font-pixel text-amber-deep opacity-50">
            PRESS ANY KEY TO POWER ON
          </div>
        </div>
      )}
    </div>
  );
};
