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
    title: "AIRASIA DUTY FREE WEB",
    tech: ["AstroJS", "Zustand", "Tailwind"],
    url: "https://www.airasia.com/dutyfree",
    description:
      "Full-stack e-commerce storefront for AirAsia Duty Free. Static site generation with islands of interactivity, optimized for low-latency travel retail.",
  },
  {
    id: "aa-dutyfree-app",
    category: "WORK",
    title: "AIRASIA DUTY FREE APP",
    tech: ["React Native", "Expo"],
    description:
      "Mobile app for AirAsia Duty Free. Cross-platform iOS/Android shopping experience with offline support and on-flight integration.",
  },
  {
    id: "aa-travelmall-app",
    category: "WORK",
    title: "AIRASIA TRAVEL MALL APP",
    tech: ["React Native"],
    description:
      "Native mobile commerce app for AirAsia's Travel Mall ecosystem. Multi-vertical shopping, payments, vouchers, and loyalty.",
  },
  {
    id: "aa-play",
    category: "WORK",
    title: "AIRASIA PLAY",
    tech: ["React", "Context API", "NodeJS", "SCSS"],
    url: "https://www.airasia.com/play/",
    description:
      "Digital media hub for AirAsia featuring articles, stories, and multimedia about travel, culture, and food across ASEAN.",
  },
  {
    id: "aa-movetix",
    category: "WORK",
    title: "AIRASIA MOVETIX",
    tech: ["Turborepo", "React Native", "React"],
    url: "https://www.airasia.com/movetix",
    description:
      "Cross-platform event ticketing inside MoveTix. Shared monorepo serving both web and mobile apps with TanStack Query and i18next.",
  },
  {
    id: "optcg-web",
    category: "PERSONAL",
    title: "OPTCG WEB",
    tech: ["npm workspaces", "TypeScript"],
    url: "https://optcg-web.com",
    description:
      "One Piece TCG web companion. Monorepo with engine package and web client for deck building, simulation, and card lookup.",
  },
  {
    id: "first",
    category: "PERSONAL",
    title: "FIRST",
    tech: ["SvelteKit", "Tauri", "Supabase"],
    description:
      "Cross-platform desktop app built with SvelteKit + Tauri, Supabase backend, end-to-end tested with Playwright.",
  },
  {
    id: "osx-portfolio",
    category: "PERSONAL",
    title: "OSX PORTFOLIO",
    tech: ["React", "Tailwind", "framer-motion"],
    description:
      "Previous version of this portfolio styled as a macOS desktop. Now retired in favor of the amber CRT terminal you're using right now.",
  },
];
