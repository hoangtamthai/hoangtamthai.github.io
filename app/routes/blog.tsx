import { Link, useLoaderData } from "react-router";
import Typography from "../components/ui/typography";
import { formatDate, getAllBlogPosts } from "../lib/blog";
import type { Route } from "./+types/home";
import { BodyContainer } from "../components/section/body-container";
import { Badge } from "../components/ui/badge";
import { Rss } from "lucide-react";
import { Button } from "../components/ui/button";

export function meta({}: Route.MetaArgs) {
  const title = "Tam Thai (B)log";
  const description =
    "Welcome to my (B)log, a combination of blog and log (short, bullet styles) about the things I like to do, which are mostly about tech, self-hosting, configurations, and tools I use.";
  return [
    { title: title },
    { name: "description", content: description },
    { property: "og:title", content: title },
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

export async function loader() {
  const posts = await getAllBlogPosts();
  return posts;
}

export default function Blog() {
  const posts = useLoaderData<typeof loader>();

  return (
    <BodyContainer>
      <div className="h-20"></div>
      <Typography id="/blog" variant={"h2"} affects={"bracket"}>
        (B)log
      </Typography>
      <Typography variant={"h1"}>
        Welcome to my (B)log, a combination of blog and log (short, bullet
        styles) about the things I like to do, which are mostly about tech,
        self-hosting, configurations, and tools I use.
      </Typography>
      <div className="mt-4 mb-2">
        <Link reloadDocument to="/rss.xml">
          <Button data-umami-event="RSS" variant={"outline"}>
            <Rss className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <BlogList posts={posts} />
    </BodyContainer>
  );
}

function BlogList({ posts }: { posts: Awaited<ReturnType<typeof loader>> }) {
  return (
    <div className="mt-6 space-y-4">
      {posts.map((post) => (
        <Link
          key={post.path}
          to={`/blog/${post.year}/${post.month}/${post.day}/${post.slug}`}
          className="border-foreground hover:bg-accent block rounded-md border-2 p-4 transition-colors"
        >
          <Typography variant={"h4"} className="mb-1">
            {post.title}
          </Typography>
          <Typography
            variant={"p"}
            className="text-muted-foreground mt-0 flex items-center text-sm"
          >
            <Typography variant={"small"}>{formatDate(post.date)}</Typography>
            <span className="ml-1">{"|"}</span>
            <div className="mx-1">
              {post.properties?.["tags"]?.map((tag: string) => {
                return (
                  <Badge variant="outline" className="m-0.5">
                    #{tag}
                  </Badge>
                );
              })}
            </div>
          </Typography>
        </Link>
      ))}
    </div>
  );
}
