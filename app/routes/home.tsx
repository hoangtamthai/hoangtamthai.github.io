import type { Route } from "./+types/home";
import HomePage from "../page/home";

export function meta({}: Route.MetaArgs) {
  const title = "Tam Thai";
  const description = "Tam Thai's Personal Website";

  return [
    { title: title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:type", content: "article" },
    { property: "og:description", content: description },
    {
      property: "og:image",
      content: "https://www.tamthai.de/images/og-image.png",
    },
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
