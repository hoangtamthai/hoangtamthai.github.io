import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

export interface BlogPost {
  year: string;
  month: string;
  day: string;
  slug: string;
  title: string;
  date: Date;
  path: string;
  properties?: { [key: string]: any };
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
  properties: { [key: string]: any };
}

export function formatTitle(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function filenameToSlug(title: string): string {
  return title.replace(/\.md$/, "").replace(/-/g, "~").replace(/ /g, "-");
}

export function parseBlogPath(relativePath: string): BlogPost | null {
  const parts = relativePath.split(path.sep);
  if (parts.length < 5) return null;

  const mdIndex = parts.indexOf("md");
  if (mdIndex === -1 || mdIndex + 4 >= parts.length) return null;

  const year = parts[mdIndex + 1];
  const month = parts[mdIndex + 2];
  const day = parts[mdIndex + 3];
  const filename = parts[mdIndex + 4];

  if (!year || !month || !day || !filename || !filename.endsWith(".md")) {
    return null;
  }

  const slug = filenameToSlug(filename);
  const title = formatTitle(filename);

  try {
    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) return null;

    return {
      year,
      month,
      day,
      slug,
      title,
      date,
      path: relativePath,
    };
  } catch {
    return null;
  }
}

async function scanMarkdownDirectory(dir: string): Promise<BlogPost[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subPosts = await scanMarkdownDirectory(fullPath);
      posts.push(...subPosts);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const relativePath = fullPath.replace(process.cwd(), "");
      const post = parseBlogPath(relativePath);
      if (post) {
        const mdPath = getMdPathFromPost(post);
        const fileContent = await fs.readFile(mdPath, "utf-8");
        const { data } = matter(fileContent);
        post.properties = data;
        posts.push(post);
      }
    }
  }

  return posts;
}

function getMdPathFromPost(post: BlogPost) {
  return path.join(
    process.cwd(),
    "public",
    "md",
    post.year,
    post.month,
    post.day,
    `${post.title}.md`,
  );
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const mdPath = path.join(process.cwd(), "public", "md");

  try {
    await fs.access(mdPath);
  } catch {
    return [];
  }

  const posts = await scanMarkdownDirectory(mdPath);
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getBlogPost(
  year: string,
  month: string,
  day: string,
  title: string,
): Promise<BlogPostWithContent | null> {
  const mdPath = path.join(
    process.cwd(),
    "public",
    "md",
    year,
    month,
    day,
    `${title}.md`,
  );

  try {
    await fs.access(mdPath);
  } catch {
    return null;
  }

  try {
    const fileContent = await fs.readFile(mdPath, "utf-8");
    const { data, content } = matter(fileContent);
    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date.getTime())) return null;

    return {
      year,
      month,
      day,
      slug: filenameToSlug(title),
      title,
      date,
      path: `/md/${year}/${month}/${day}/${title}.md`,
      content: content,
      properties: data,
    };
  } catch {
    return null;
  }
}
