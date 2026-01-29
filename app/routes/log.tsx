import { Link, useLoaderData } from "react-router";
import Typography from "../components/ui/typography";
import { formatDate, getAllBlogPosts } from "../lib/blog";
import type { Route } from "./+types/home";
import { BodyContainer } from "../components/section/body-container";
import { Badge } from "../components/ui/badge";
import { Rss } from "lucide-react";
import { Button } from "../components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tam Thai (B)log" },
    { name: "description", content: "Tam Thai (B)log" },
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
      <Typography id="/log" variant={"h1"} affects={"bracket"}>
        (B)log
      </Typography>
      <Typography variant={"p"}>
        Welcome to my (B)log, a combination of blog and log (short, bullet
        styles) about my experiences and work.
      </Typography>
      <div className="mt-4 mb-2">
        <Link reloadDocument to="/rss.xml">
          <Button variant={"outline"}>
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
          to={`/log/${post.year}/${post.month}/${post.day}/${post.slug}`}
          className="block rounded-md border-2 border-black p-4 transition-colors hover:border-gray-500"
        >
          <Typography variant={"h4"} className="mb-1">
            {post.title}
          </Typography>
          <Typography
            variant={"p"}
            className="text-muted-foreground flex items-center text-sm"
          >
            <span>{formatDate(post.date)}</span>
            <div className="mx-1">
              <span className="w-1">{"|"}</span>
              {post.properties!["tags"]?.map((tag: string) => {
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
