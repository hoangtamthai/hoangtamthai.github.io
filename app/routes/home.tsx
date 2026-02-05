import type { Route } from "./+types/home";
import HomePage from "../page/home";

export function meta({}: Route.MetaArgs) {
  const title = "Tam Thai";
  const description = "Tam Thai's Personal Website";

  return [
    { title: title },
    { name: "description", content: description },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:image", content: "https://www.tamthai.de/images/og-image.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    {
      name: "twitter:image",
      content: "https://www.tamthai.de/images/og-image.png",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
