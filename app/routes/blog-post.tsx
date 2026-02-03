import { ExternalLink, Eye } from "lucide-react";
import { marked } from "marked";
import markedFootnote from "marked-footnote";
import { Link, useLoaderData } from "react-router";
import { BodyContainer } from "../components/section/body-container";
import { getPageStatUrl, PageView } from "../components/section/page-view";
import { Badge } from "../components/ui/badge";
import { BlueskyComment } from "../components/ui/bluesky-comment";
import { Button } from "../components/ui/button";
import Typography from "../components/ui/typography";
import { formatDate, getBlogPost } from "../lib/blog";
import type { BlueskyProp } from "../lib/bluesky";
import type { Route } from "./+types/blog-post";

export function meta({ loaderData }: Route.MetaArgs) {
  const originalTitle = loaderData ? `${loaderData.title}` : "(B)log";
  const title = `${originalTitle} | Tam Thai`;
  const description = loaderData ? `${loaderData.title}` : "Tam Thai (B)log";

  return [
    { title: title },
    { name: "description", content: description },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    {
      name: "og:image",
      content: `https://www.tamthai.de/images/blog/${originalTitle.replace(" ", "%20")}.png`,
    },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const { year, month, day, slug } = params;
  const title = slugToTitle(slug);
  const post = await getBlogPost(year, month, day, title);
  const url = new URL(request.url);
  const host = url.origin;

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const html = await marked.use(markedFootnote()).parse(post.content);
  const tags: string[] = post.properties["tags"];
  const blueskyProp: BlueskyProp = post.properties["bluesky"];

  // This regex matches:
  // 1. The opening <a> tag and all its attributes
  // 2. The inner text/html of the link
  // 3. The closing </a> tag
  const linkRegex = /<a([\s\S]*?)>([\s\S]*?)<\/a>/g;

  const formattedHtml = html.replace(
    linkRegex,
    (match, attributes, content) => {
      const isExternal =
        attributes.includes("http") && !attributes.includes(host);
      const isAnchor =
        attributes.includes('href="#"') || attributes.includes('href="#');
      const externalLinkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link inline" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>`;
      if (isExternal && !isAnchor) {
        return `<a${attributes} target="_blank" rel="noopener noreferrer">${content} ${externalLinkSvg}</a>`;
      }

      return match;
    },
  );

  return {
    title: post.title,
    date: post.date,
    html: formattedHtml,
    tags,
    blueskyProp,
  };
}
function slugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/~/g, "-");
}

export default function BlogPost() {
  const { title, date, html, tags, blueskyProp } =
    useLoaderData<typeof loader>();
  return (
    <BodyContainer>
      <div className="h-20"></div>
      <Typography variant={"h1"} affects={"bracket"}>
        {title}
      </Typography>
      <div className="text-muted-foreground mt-4 flex flex-col items-center justify-start overflow-clip sm:flex-row">
        <Typography variant={"p"}>{formatDate(date)}</Typography>
        <Typography variant={"small"} className="mx-1 my-auto">
          {"|"}
        </Typography>
        <div className="flex">
          {tags?.map((tag: string) => {
            return (
              <Badge
                key={tag}
                variant="outline"
                className="text-muted-foreground m-1"
              >
                #{tag}
              </Badge>
            );
          })}
        </div>
        <Typography variant={"small"} className="mx-1 my-auto">
          {"|"}
        </Typography>
        <Link to={getPageStatUrl()} target="_blank" rel="noopener noreferrer">
          <Button variant={"outline"}>
            <Eye size={24} />
            <PageView />
            <ExternalLink />
          </Button>
        </Link>
      </div>
      <div className="h-6"></div>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <BlueskyComment blueskyProp={blueskyProp} />
    </BodyContainer>
  );
}

export function ErrorBoundary() {
  return (
    <div className="mx-12 md:mx-42 lg:mx-60">
      <div id="/blog" className="h-20"></div>
      <Typography variant={"h1"}>Blog Post Not Found</Typography>
      <Typography variant={"p"}>
        The requested blog post doesn't exist.
      </Typography>
    </div>
  );
}
