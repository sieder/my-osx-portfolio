import React from "react";

interface Props {
  onUp: () => void;
  onDown: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onSelect: () => void;
  onBack: () => void;
}

const Btn: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}> = ({ onClick, children, className = "", ariaLabel }) => (
  <button
    aria-label={ariaLabel}
    onClick={onClick}
    onTouchStart={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={
      "active:scale-95 active:bg-amber-base/30 transition-transform " +
      "border-2 border-amber-base/70 text-amber-base font-pixel " +
      "flex items-center justify-center select-none " +
      className
    }
    style={{ touchAction: "manipulation" }}
  >
    {children}
  </button>
);

export const MobileDPad: React.FC<Props> = ({
  onUp,
  onDown,
  onLeft,
  onRight,
  onSelect,
  onBack,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2 flex justify-between items-end pointer-events-none">
      {/* D-pad */}
      <div className="grid grid-cols-3 grid-rows-3 gap-1 pointer-events-auto">
        <div />
        <Btn ariaLabel="up" onClick={onUp} className="w-12 h-12 rounded-md">^</Btn>
        <div />
        <Btn ariaLabel="left" onClick={onLeft || (() => {})} className="w-12 h-12 rounded-md">{"<"}</Btn>
        <div className="w-12 h-12 border-2 border-amber-base/30 rounded-md" />
        <Btn ariaLabel="right" onClick={onRight || (() => {})} className="w-12 h-12 rounded-md">{">"}</Btn>
        <div />
        <Btn ariaLabel="down" onClick={onDown} className="w-12 h-12 rounded-md">v</Btn>
        <div />
      </div>

      {/* A / B */}
      <div className="flex gap-3 pointer-events-auto items-end">
        <Btn ariaLabel="back" onClick={onBack} className="w-14 h-14 rounded-full text-base">B</Btn>
        <Btn ariaLabel="select" onClick={onSelect} className="w-14 h-14 rounded-full text-base">A</Btn>
      </div>
    </div>
  );
};
