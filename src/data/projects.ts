export type ProjectCategory = "WORK" | "PERSONAL";

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  tech: string[];
  url?: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: "aa-dutyfree-web",
    category: "WORK",
    title: "AirAsia Duty Free — Web",
    tech: ["Astro", "Zustand", "Tailwind"],
    url: "https://www.airasia.com/dutyfree",
    description:
      "Full-stack e-commerce storefront for AirAsia Duty Free. Static site generation with islands of interactivity, optimized for low-latency travel retail.",
  },
  {
    id: "aa-dutyfree-app",
    category: "WORK",
    title: "AirAsia Duty Free — App",
    tech: ["React Native", "Expo"],
    description:
      "Mobile app for AirAsia Duty Free. Cross-platform iOS/Android shopping experience with offline support and on-flight integration.",
  },
  {
    id: "aa-travelmall-app",
    category: "WORK",
    title: "AirAsia Travel Mall App",
    tech: ["React Native"],
    description:
      "Native mobile commerce app for AirAsia's Travel Mall ecosystem. Multi-vertical shopping, payments, vouchers, and loyalty.",
  },
  {
    id: "aa-play",
    category: "WORK",
    title: "AirAsia Play",
    tech: ["React", "Context API", "Node.js", "SCSS"],
    url: "https://www.airasia.com/play/",
    description:
      "Digital media hub for AirAsia featuring articles, stories, and multimedia about travel, culture, and food across ASEAN.",
  },
  {
    id: "aa-movetix",
    category: "WORK",
    title: "AirAsia MoveTix",
    tech: ["Turborepo", "React Native", "React"],
    url: "https://www.airasia.com/movetix",
    description:
      "Cross-platform event ticketing inside MoveTix. Shared monorepo serving both web and mobile apps with TanStack Query and i18next.",
  },
  {
    id: "pokko",
    category: "PERSONAL",
    title: "Pokko",
    tech: ["Swift", "SwiftUI", "Kotlin", "Supabase", "Claude"],
    url: "https://pokkopocket.com",
    description:
      "AI-powered personal drive and assistant: drop in any file, it sorts itself, and you can ask for it back from any device. Native apps for macOS, iOS and Android, a Supabase backend serving a hosted Claude model, and encrypted sync with a user-held key. iPhone app live on the App Store.",
  },
  {
    id: "optcg-web",
    category: "PERSONAL",
    title: "OPTCG Web",
    tech: ["npm workspaces", "TypeScript"],
    url: "https://optcg-web.com",
    description:
      "One Piece TCG web companion. Monorepo with engine package and web client for deck building, simulation, and card lookup.",
  },
  {
    id: "first",
    category: "PERSONAL",
    title: "First",
    tech: ["SvelteKit", "Tauri", "Supabase"],
    description:
      "Cross-platform desktop productivity app built with SvelteKit + Tauri, with a Supabase backend and end-to-end tests in Playwright.",
  },
];
