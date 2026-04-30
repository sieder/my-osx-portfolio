import { AppState, Action } from "./types";
import { projects } from "../data/projects";
import { contacts } from "../data/contact";

export const MENU_ITEMS = [
  "ABOUT",
  "PROJECTS",
  "RESUME",
  "CONTACT",
  "SNAKE",
  "POWER OFF",
] as const;

export const initialState: AppState = {
  screen: "boot",
  prevScreen: null,
  menuIndex: 0,
  projectIndex: 0,
  selectedProjectId: null,
  contactIndex: 0,
  resumeMode: "text",
  transitioning: false,
};

const screenForMenuIndex = (i: number): AppState["screen"] => {
  switch (MENU_ITEMS[i]) {
    case "ABOUT": return "about";
    case "PROJECTS": return "projects";
    case "RESUME": return "resume";
    case "CONTACT": return "contact";
    case "SNAKE": return "snake";
    case "POWER OFF": return "powerOff";
    default: return "menu";
  }
};

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "BOOT_DONE":
      return { ...state, screen: "menu" };

    case "POWER_ON":
      return { ...initialState, screen: "boot" };

    case "NAV_UP":
      if (state.screen === "menu") {
        return { ...state, menuIndex: (state.menuIndex - 1 + MENU_ITEMS.length) % MENU_ITEMS.length };
      }
      if (state.screen === "projects") {
        return { ...state, projectIndex: (state.projectIndex - 1 + projects.length) % projects.length };
      }
      if (state.screen === "contact") {
        return { ...state, contactIndex: (state.contactIndex - 1 + contacts.length) % contacts.length };
      }
      return state;

    case "NAV_DOWN":
      if (state.screen === "menu") {
        return { ...state, menuIndex: (state.menuIndex + 1) % MENU_ITEMS.length };
      }
      if (state.screen === "projects") {
        return { ...state, projectIndex: (state.projectIndex + 1) % projects.length };
      }
      if (state.screen === "contact") {
        return { ...state, contactIndex: (state.contactIndex + 1) % contacts.length };
      }
      return state;

    case "SELECT":
      if (state.screen === "menu") {
        return { ...state, prevScreen: "menu", screen: screenForMenuIndex(state.menuIndex) };
      }
      if (state.screen === "projects") {
        const p = projects[state.projectIndex];
        return { ...state, prevScreen: "projects", screen: "projectDetail", selectedProjectId: p.id };
      }
      if (state.screen === "contact") {
        const c = contacts[state.contactIndex];
        if (typeof window !== "undefined") window.location.href = c.href;
        return state;
      }
      if (state.screen === "projectDetail") {
        const p = projects.find(x => x.id === state.selectedProjectId);
        if (p?.url && typeof window !== "undefined") window.location.href = p.url;
        return state;
      }
      if (state.screen === "powerOff") {
        return { ...initialState, screen: "boot" };
      }
      return state;

    case "BACK":
      if (state.screen === "projectDetail") {
        return { ...state, screen: "projects", selectedProjectId: null };
      }
      if (state.screen !== "menu" && state.screen !== "boot") {
        return { ...state, screen: "menu" };
      }
      return state;

    case "GOTO":
      return { ...state, prevScreen: state.screen, screen: action.screen };

    case "SET_MENU_INDEX":
      return { ...state, menuIndex: action.index };

    case "SET_PROJECT_INDEX":
      return { ...state, projectIndex: action.index };

    case "SET_CONTACT_INDEX":
      return { ...state, contactIndex: action.index };

    case "OPEN_PROJECT":
      return { ...state, prevScreen: state.screen, screen: "projectDetail", selectedProjectId: action.id };

    case "TOGGLE_RESUME_MODE":
      return { ...state, resumeMode: state.resumeMode === "text" ? "pdf" : "text" };

    case "TRANSITION_START":
      return { ...state, transitioning: true };

    case "TRANSITION_END":
      return { ...state, transitioning: false };

    default:
      return state;
  }
}
