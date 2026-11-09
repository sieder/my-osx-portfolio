import { render, screen } from "@testing-library/react";
import App from "./App";
import { projects } from "./data/projects";

test("renders name, sections and every project", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1, name: "Sieder Villareal" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Work" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/resume.pdf");
  for (const p of projects) {
    expect(screen.getByRole("heading", { level: 3, name: new RegExp(p.title) })).toBeInTheDocument();
  }
});
