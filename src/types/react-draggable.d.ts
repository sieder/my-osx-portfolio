declare module 'react-draggable' {
  import { ReactNode, CSSProperties, RefObject } from 'react';

  export interface DraggableProps {
    children: ReactNode;
    bounds?: string | { left?: number; top?: number; right?: number; bottom?: number };
    defaultPosition?: { x: number; y: number };
    position?: { x: number; y: number };
    onStart?: (e: any, data: any) => void;
    onDrag?: (e: any, data: any) => void;
    onStop?: (e: any, data: any) => void;
    disabled?: boolean;
    axis?: 'both' | 'x' | 'y' | 'none';
    handle?: string;
    cancel?: string;
    grid?: [number, number];
    scale?: number;
    allowAnyClick?: boolean;
    enableUserSelectHack?: boolean;
    offsetParent?: HTMLElement;
    nodeRef?: RefObject<HTMLElement | null>;
    style?: CSSProperties;
    className?: string;
  }

  const Draggable: React.FC<DraggableProps>;
  export default Draggable;
}
