import type { Route } from "./+types/home";
import HomePage from "../page/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tam Thai" },
    { name: "description", content: "Tam Thai's Personal Website" },
    { name: "og:title", content: "Tam Thai" },
    { name: "og:description", content: "Tam Thai's Personal Website" },
    { name: "og:image", content: "https://www.tamthai.de/images/og-image.png" },
  ];
}

export default function Home() {
  return <HomePage />;
}
