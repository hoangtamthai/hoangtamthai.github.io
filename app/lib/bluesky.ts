import { BlueskyComment } from "../components/ui/bluesky-comment";

export interface BlueskyProp {
  post_id: string;
  handle: string;
}
export interface BlueskyComment {
  uri: string;
  cid: string;
  author: {
    did: string;
    handle: string;
    displayName?: string;
    avatar?: string;
  };
  external?: string;
  fullsizes?: string[];
  thumbs?: string[];
  text: string;
  createdAt: string;
  likeCount: number;
  replyCount: number;
  replies?: BlueskyComment[];
}

export interface BlueskyThread {
  root: {
    uri: string;
    cid: string;
    author: {
      did: string;
      handle: string;
      displayName?: string;
      avatar?: string;
    };
    text: string;
    createdAt: string;
    repostCount: number;
    likeCount: number;
    replyCount: number;
  };
  replies: BlueskyComment[];
}

const BLUESKY_PUBLIC_API_BASE = "https://public.api.bsky.app";

export async function fetchBlueskyComments(
  url: string,
): Promise<BlueskyThread | null> {
  try {
    const threadPromises = async () => {
      try {
        const threadResponse = await fetch(
          `${BLUESKY_PUBLIC_API_BASE}/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(url)}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!threadResponse.ok) {
          console.warn("Failed to fetch thread for post:", url);
          return null;
        }

        const threadData = await threadResponse.json();

        return toBlueskyThread(threadData);
      } catch (error) {
        console.warn("Error fetching thread for post:", url, error);
        return null;
      }
    };

    const thread = await threadPromises();
    if (!thread) {
      return null;
    }

    return thread;
  } catch (error) {
    console.error("Error fetching Bluesky comments:", error);
    return null;
  }
}

function toBlueskyThread(threadData: any): BlueskyThread | null {
  if (!threadData.thread) {
    return null;
  }

  const root = threadData.thread;
  if (!root.post) {
    return null;
  }

  const rootPost = root.post;
  const replies: BlueskyComment[] = [];

  function collectReplies(node: any): void {
    if (node.replies) {
      for (const reply of node.replies) {
        if (reply.post) {
          replies.push(transformPostToComment(reply.post, reply.replies));
        }
      }
    }
  }

  collectReplies(root);

  return {
    root: {
      uri: rootPost.uri,
      cid: rootPost.cid,
      author: {
        did: rootPost.author.did,
        handle: rootPost.author.handle,
        displayName: rootPost.author.displayName,
        avatar: rootPost.author.avatar,
      },
      text: rootPost.record?.text || "",
      createdAt: rootPost.record?.createdAt || rootPost.createdAt,
      replyCount: rootPost.replyCount,
      repostCount: rootPost.repostCount,
      likeCount: rootPost.likeCount,
    },
    replies,
  };
}

function transformPostToComment(post: any, replies: any): BlueskyComment {
  const allReplies: BlueskyComment[] = [];
  replies?.map((reply: any) =>
    allReplies.push(transformPostToComment(reply.post, reply.replies)),
  );
  console.log("reply embed", post.embed?.images);
  const thumbs: string[] = [];
  const fullsizes: string[] = [];
  post.embed?.images?.map((image: any) => {
    thumbs.push(image.thumb);
    fullsizes.push(image.fullsize);
  });
  console.log("thumbs", thumbs);
  return {
    uri: post.uri,
    cid: post.cid,
    author: {
      did: post.author.did,
      handle: post.author.handle,
      displayName: post.author.displayName,
      avatar: post.author.avatar,
    },
    fullsizes: fullsizes,
    thumbs: thumbs,
    text: post.record?.text || "",
    createdAt: post.record?.createdAt || post.createdAt,
    likeCount: post.likeCount || 0,
    replyCount: post.replyCount || 0,
    replies: allReplies,
  };
}

export function formatBlueskyDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toBlueskyProfileUrl(handle: string): string {
  return `https://bsky.app/profile/${handle}`;
}
export function toBlueskyPostUrl(handle: string, uri: string): string {
  return `https://bsky.app/profile/${handle}/post/${uri.split("/").pop()}`;
}
