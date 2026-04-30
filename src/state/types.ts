export type Screen =
  | "boot"
  | "menu"
  | "about"
  | "projects"
  | "projectDetail"
  | "resume"
  | "contact"
  | "snake"
  | "powerOff";

export interface AppState {
  screen: Screen;
  prevScreen: Screen | null;
  menuIndex: number;
  projectIndex: number;
  selectedProjectId: string | null;
  contactIndex: number;
  resumeMode: "text" | "pdf";
  transitioning: boolean;
}

export type Action =
  | { type: "BOOT_DONE" }
  | { type: "NAV_UP" }
  | { type: "NAV_DOWN" }
  | { type: "NAV_LEFT" }
  | { type: "NAV_RIGHT" }
  | { type: "SELECT" }
  | { type: "BACK" }
  | { type: "GOTO"; screen: Screen }
  | { type: "SET_MENU_INDEX"; index: number }
  | { type: "SET_PROJECT_INDEX"; index: number }
  | { type: "SET_CONTACT_INDEX"; index: number }
  | { type: "OPEN_PROJECT"; id: string }
  | { type: "TOGGLE_RESUME_MODE" }
  | { type: "TRANSITION_START" }
  | { type: "TRANSITION_END" }
  | { type: "POWER_ON" };
