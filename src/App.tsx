import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CRTShell } from "./components/CRTShell";
import { ChannelTransition } from "./components/ChannelTransition";
import { MobileDPad } from "./components/MobileDPad";
import { BootScreen } from "./screens/BootScreen";
import { MainMenu } from "./screens/MainMenu";
import { AboutScreen } from "./screens/AboutScreen";
import { ProjectsScreen } from "./screens/ProjectsScreen";
import { ProjectDetailScreen } from "./screens/ProjectDetailScreen";
import { ResumeScreen } from "./screens/ResumeScreen";
import { ContactScreen } from "./screens/ContactScreen";
import { SnakeScreen } from "./screens/SnakeScreen";
import { PowerOffScreen } from "./screens/PowerOffScreen";
import { reducer, initialState, MENU_ITEMS } from "./state/reducer";
import { useKeyboard } from "./hooks/useKeyboard";
import { useAudio } from "./hooks/useAudio";
import { projects } from "./data/projects";
import { contacts } from "./data/contact";
import { Screen } from "./state/types";

const MENU_SCREEN_MAP: Record<string, Screen> = {
  ABOUT: "about",
  PROJECTS: "projects",
  RESUME: "resume",
  CONTACT: "contact",
  SNAKE: "snake",
  "POWER OFF": "powerOff",
};

function AppInner() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { beep } = useAudio(true);
  const prevScreenRef = useRef(state.screen);

  // Channel-change transition on real screen swaps
  useEffect(() => {
    const prev = prevScreenRef.current;
    if (prev === state.screen) return;
    const skip = new Set<Screen>(["boot", "powerOff"]);
    if (!skip.has(state.screen) && !skip.has(prev)) {
      dispatch({ type: "TRANSITION_START" });
    }
    prevScreenRef.current = state.screen;
  }, [state.screen]);

  const navUp = useCallback(() => { beep("move"); dispatch({ type: "NAV_UP" }); }, [beep]);
  const navDown = useCallback(() => { beep("move"); dispatch({ type: "NAV_DOWN" }); }, [beep]);
  const select = useCallback(() => { beep("select"); dispatch({ type: "SELECT" }); }, [beep]);
  const back = useCallback(() => { beep("back"); dispatch({ type: "BACK" }); }, [beep]);

  const keyboardActive =
    state.screen !== "boot" &&
    state.screen !== "powerOff" &&
    state.screen !== "snake";

  useKeyboard(
    {
      up: keyboardActive ? navUp : undefined,
      down: keyboardActive ? navDown : undefined,
      select: keyboardActive
        ? () => {
            // Menu: dispatch goto by selected label
            if (state.screen === "menu") {
              const target = MENU_SCREEN_MAP[MENU_ITEMS[state.menuIndex]];
              beep("select");
              dispatch({ type: "GOTO", screen: target });
              return;
            }
            select();
          }
        : undefined,
      back: keyboardActive ? back : undefined,
      custom:
        state.screen === "resume"
          ? {
              v: () => { beep("select"); dispatch({ type: "TOGGLE_RESUME_MODE" }); },
              d: () => {
                const a = document.createElement("a");
                a.href = "/resume.pdf";
                a.download = "sieder-villareal-resume.pdf";
                a.click();
              },
            }
          : undefined,
    },
    [keyboardActive, state.screen, state.menuIndex, navUp, navDown, select, back, beep]
  );

  const onMenuSelect = (i: number) => {
    const target = MENU_SCREEN_MAP[MENU_ITEMS[i]];
    beep("select");
    dispatch({ type: "SET_MENU_INDEX", index: i });
    dispatch({ type: "GOTO", screen: target });
  };

  const onProjectSelect = (i: number) => {
    beep("select");
    dispatch({ type: "SET_PROJECT_INDEX", index: i });
    dispatch({ type: "OPEN_PROJECT", id: projects[i].id });
  };

  const onContactSelect = (i: number) => {
    beep("select");
    const c = contacts[i];
    if (typeof window !== "undefined") window.location.href = c.href;
  };

  const onMobileSelect = () => {
    if (state.screen === "menu") return onMenuSelect(state.menuIndex);
    if (state.screen === "projects") return onProjectSelect(state.projectIndex);
    if (state.screen === "contact") return onContactSelect(state.contactIndex);
    select();
  };

  const renderScreen = () => {
    switch (state.screen) {
      case "boot":
        return <BootScreen onDone={() => dispatch({ type: "BOOT_DONE" })} />;
      case "menu":
        return (
          <MainMenu
            selectedIndex={state.menuIndex}
            onHover={(i) => dispatch({ type: "SET_MENU_INDEX", index: i })}
            onSelect={onMenuSelect}
          />
        );
      case "about":
        return <AboutScreen />;
      case "projects":
        return (
          <ProjectsScreen
            selectedIndex={state.projectIndex}
            onHover={(i) => dispatch({ type: "SET_PROJECT_INDEX", index: i })}
            onSelect={onProjectSelect}
          />
        );
      case "projectDetail":
        return (
          <ProjectDetailScreen
            projectId={state.selectedProjectId}
            onVisit={() => {
              const p = projects.find((x) => x.id === state.selectedProjectId);
              if (p?.url) window.location.href = p.url;
            }}
          />
        );
      case "resume":
        return (
          <ResumeScreen
            mode={state.resumeMode}
            onToggleMode={() => dispatch({ type: "TOGGLE_RESUME_MODE" })}
          />
        );
      case "contact":
        return (
          <ContactScreen
            selectedIndex={state.contactIndex}
            onHover={(i) => dispatch({ type: "SET_CONTACT_INDEX", index: i })}
            onSelect={onContactSelect}
          />
        );
      case "snake":
        return <SnakeScreen active={true} onBack={back} />;
      case "powerOff":
        return <PowerOffScreen onPowerOn={() => dispatch({ type: "POWER_ON" })} />;
    }
  };

  const dpadVisible =
    state.screen !== "boot" &&
    state.screen !== "powerOff" &&
    state.screen !== "snake";

  return (
    <>
      <CRTShell>{renderScreen()}</CRTShell>
      <ChannelTransition
        active={state.transitioning}
        onEnd={() => dispatch({ type: "TRANSITION_END" })}
      />
      {dpadVisible && (
        <MobileDPad
          onUp={navUp}
          onDown={navDown}
          onSelect={onMobileSelect}
          onBack={back}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
