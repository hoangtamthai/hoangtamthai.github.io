import type { Route } from "./+types/home";
import HomePage from "../page/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tam Thai" },
    { name: "description", content: "My Website" },
  ];
}

export default function Home() {
  return <HomePage />;
}
