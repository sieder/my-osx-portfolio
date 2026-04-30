export interface Skill {
  name: string;
  level: number; // 0-100
}

export const skills: Skill[] = [
  { name: "HTML",       level: 95 },
  { name: "CSS",        level: 92 },
  { name: "JAVASCRIPT", level: 95 },
  { name: "TYPESCRIPT", level: 90 },
  { name: "REACT",      level: 95 },
  { name: "REACT NATIVE", level: 88 },
  { name: "NODE.JS",    level: 85 },
  { name: "ASTRO",      level: 80 },
  { name: "SVELTE",     level: 70 },
  { name: "TAILWIND",   level: 92 },
  { name: "GIT",        level: 90 },
  { name: "DOCKER",     level: 70 },
];
