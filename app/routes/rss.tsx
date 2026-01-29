import { useLoaderData } from "react-router";
import { getAllBlogPosts, getBlogPost } from "../lib/blog";
import { Divide } from "lucide-react";
import { marked } from "marked";
import markedFootnote from "marked-footnote";

marked.use(markedFootnote());
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const posts = await getAllBlogPosts();

  // Get full content for recent posts (last 10 or all if less)
  const postsWithContent = await Promise.all(
    posts.slice(0, 10).map(async (post) => {
      const fullPost = await getBlogPost(
        post.year,
        post.month,
        post.day,
        post.title,
      );
      return fullPost;
    }),
  );

  const validPosts = postsWithContent.filter(
    (post): post is NonNullable<typeof post> => post !== null,
  );

  const rssItems = await Promise.all(
    validPosts.map(async (post) => {
      const postUrl = `${baseUrl}/log/${post.year}/${post.month}/${post.day}/${post.slug}`;
      const pubDate = post.date.toUTCString();

      // Convert markdown content to HTML (basic conversion)
      var content = await marked.parse(post.content);
      // const content = raw_content
      //   .replace(/&/g, "&amp;")
      //   .replace(/</g, "&lt;")
      //   .replace(/>/g, "&gt;")
      //   .replace(/\n\n/g, "</p><p>")
      //   .replace(/\n/g, "<br/>")
      //   .replace(/^/, "<p>")
      //   .replace(/$/, "</p>");

      const tags = post.properties?.tags || [];
      const categoryTags = tags
        .map((tag: string) => `    <category>${tag}</category>`)
        .join("\n");

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <content:encoded><![CDATA[${content}]]></content:encoded>
${categoryTags}
    </item>`;
    }),
  );

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/" 
     xmlns:atom="http://www.w3.org/2005/Atom" 
     version="2.0">
  <channel>
    <title>Tam Thai (B)log</title>
    <description>Tam Thai's personal blog and log</description>
    <link>${baseUrl}/log</link>
    <atom:link href="${baseUrl}/index.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems.join("\n")}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8;",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
