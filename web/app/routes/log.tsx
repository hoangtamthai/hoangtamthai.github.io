import Log from "../page/log";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tam Thai (B)log" },
    { name: "description", content: "My (B)log" },
  ];
}

export default function Home() {
  return <Log />;
}
