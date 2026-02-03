import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Heart, MessageSquare, User } from "lucide-react";
import { Link } from "react-router";
import {
  fetchBlueskyComments,
  formatBlueskyDate,
  toBlueskyPostUrl,
  toBlueskyProfileUrl,
  type BlueskyComment,
  type BlueskyProp,
} from "~/lib/bluesky";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import Typography from "./typography";

const MAX_DEPTH = 3;
interface BlueskyCommentSectionProps {
  blueskyProp?: BlueskyProp;
  className?: string;
}

interface CommentItemProps {
  comment: BlueskyComment;
  depth: number;
}

export function BlueskyIcon() {
  return (
    <svg
      viewBox="0 0 600 530"
      width="20"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
        fill="#1185fe"
      ></path>
    </svg>
  );
}
interface Avatar {
  avatar?: string;
  handle: string;
  displayName?: string;
}
function Avatar(prop: Avatar) {
  return (
    <div className="mt-0.5 ml-1 h-8 w-8 shrink-0 sm:ml-2 sm:h-10 sm:w-10">
      {prop.avatar ? (
        <img
          src={prop.avatar}
          alt={`${prop.displayName || prop.handle}'s avatar`}
          className="rounded-full"
          loading="lazy"
        />
      ) : (
        <User className="bg-accent h-8 w-8 rounded-full sm:h-10 sm:w-10" />
      )}
    </div>
  );
}

function CommentItem({ comment, depth }: CommentItemProps) {
  const profileUrl = toBlueskyProfileUrl(comment.author.handle);
  const indent = depth > 0 ? "1rem" : 0;

  return (
    <article
      style={{ marginLeft: indent }}
      className={cn(`border-l-bluesky border-l-2`)}
    >
      <Link
        className="select-text"
        onDragStart={(e) => e.preventDefault()}
        to={toBlueskyPostUrl(comment.author.handle, comment.uri)}
      >
        <div className="hover:bg-accent hover:text-accent-foreground flex items-start gap-1 rounded-r-md hover:outline sm:gap-2">
          <Avatar
            avatar={comment.author.avatar}
            handle={comment.author.handle}
            displayName={comment.author.displayName}
          />

          <div>
            {comment.author.displayName ? (
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <Link
                  to={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-sm font-medium hover:underline sm:text-base"
                >
                  {comment.author.displayName}
                </Link>
                <Link
                  to={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-sm font-medium sm:text-base"
                >
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    @{comment.author.handle}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                to={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground text-sm font-medium hover:underline sm:text-base"
              >
                {comment.author.handle}
              </Link>
            )}
            <div className="flex flex-col flex-wrap gap-1 sm:flex-row sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 sm:gap-2"></div>
            </div>

            <div className="mt-2 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
              {comment.text}
            </div>
            {comment.fullsizes?.map((thumb) => (
              <img
                className="max-w-2/3 rounded-md"
                src={thumb}
                key={thumb}
              ></img>
            ))}

            <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
              <div className="flex gap-1">
                <Heart size={16} className="my-auto inline" />
                <Typography variant={"small"} className="my-auto text-center">
                  {comment.likeCount}
                </Typography>
              </div>
              {comment.replyCount > 0 && (
                <div className="flex gap-1">
                  <MessageSquare size={16} className="my-auto inline w-4" />
                  <Typography variant={"small"} className="m-auto">
                    {comment.replyCount}
                  </Typography>
                </div>
              )}
              <Typography
                variant={"small"}
                className="text-muted-foreground my-auto"
              >
                {formatBlueskyDate(comment.createdAt)}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
      {depth < MAX_DEPTH ? (
        comment.replies?.map((reply) => (
          <CommentItem key={reply.cid} comment={reply} depth={depth + 1} />
        ))
      ) : (
        <Link
          to={toBlueskyPostUrl(comment.author.handle, comment.uri)}
          className="ml-4 underline"
        >
          View more comments <ExternalLink className="inline w-3" />
        </Link>
      )}
    </article>
  );
}

export function BlueskyComment({
  blueskyProp,
  className,
}: BlueskyCommentSectionProps) {
  const atUrl = `at://${blueskyProp?.handle}/app.bsky.feed.post/${blueskyProp?.post_id}`;
  const postUrl = `https://bsky.app/profile/${blueskyProp?.handle}/post/${blueskyProp?.post_id}`;
  const {
    data: thread,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bluesky-comments", atUrl],
    queryFn: () => fetchBlueskyComments(atUrl),
    refetchInterval: 30000, // Polling every 30 seconds
    refetchOnWindowFocus: true, // Refresh when user clicks back onto the tab
  });

  if (isLoading) {
    return (
      <section
        className={cn("mt-8", className)}
        aria-live="polite"
        aria-busy="true"
      >
        <div className="text-center">
          <Typography
            variant="p"
            className="text-muted-foreground rounded-md outline outline-offset-8"
          >
            Loading Bluesky comments...
          </Typography>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className={cn("mt-8", className)}
        role="alert"
        aria-live="assertive"
      >
        <div className="outline-destructive/20 rounded-md text-center outline outline-offset-8">
          <Typography variant="p" className="text-destructive">
            Fail to load Bluesky comments
          </Typography>
          <Typography
            variant="p"
            className="text-muted-foreground mt-2 text-sm"
          >
            {error.message}
          </Typography>
        </div>
      </section>
    );
  }

  if (!thread) {
    return (
      <section className={cn("mt-8", className)}>
        <div className="rounded-md text-center outline outline-offset-8">
          <Typography variant="p" className="text-muted-foreground">
            No Bluesky comments found
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn("mt-8", className)}
      aria-labelledby="bluesky-comments-heading"
    >
      <div className="rounded-md outline outline-offset-8">
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BlueskyIcon />
            <Typography
              variant="h4"
              className="font-semibold"
              id="bluesky-comments-heading"
            >
              Bluesky Comments
            </Typography>
          </div>
        </header>
        <div className="space-y-6">
          <div key={thread.root.uri} className="space-y-4">
            <div className="border-l-bluesky border-l-2">
              <Link
                className="select-text"
                onDragStart={(e) => e.preventDefault()}
                to={toBlueskyPostUrl(
                  thread.root.author.handle,
                  thread.root.uri,
                )}
              >
                <div className="hover:bg-accent hover:text-accent-foreground rounded-r-md">
                  <div className="mb-2 flex items-center gap-1 sm:gap-2">
                    <Avatar
                      avatar={thread.root.author.avatar}
                      handle={thread.root.author.handle}
                      displayName={thread.root.author.displayName}
                    />
                    {thread.root.author.displayName ? (
                      <div className="flex flex-col">
                        <Link
                          to={toBlueskyProfileUrl(thread.root.author.handle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:underline"
                        >
                          {thread.root.author.displayName}
                        </Link>
                        <Link
                          to={toBlueskyProfileUrl(thread.root.author.handle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-sm font-medium"
                        >
                          @{thread.root.author.handle}
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to={toBlueskyProfileUrl(thread.root.author.handle)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium"
                      >
                        @{thread.root.author.handle}
                      </Link>
                    )}
                  </div>
                  <Typography
                    variant="p"
                    className="px-2 text-sm leading-relaxed"
                  >
                    {thread.root.text}
                  </Typography>
                  <div
                    id="thread-properties"
                    className="text-muted-foreground flex gap-4 p-2"
                  >
                    <div className="my-auto flex gap-1">
                      <Heart size={20} />
                      <Typography variant="small">
                        {thread.root.likeCount}
                      </Typography>
                    </div>
                    <div className="my-auto flex gap-1">
                      <MessageSquare size={20} />
                      <Typography variant="small">
                        {thread.replies.length}
                      </Typography>
                    </div>
                    <Typography variant="small">
                      {formatBlueskyDate(thread.root.createdAt)}
                    </Typography>
                  </div>
                </div>
              </Link>
            </div>

            <div className="space-y-3">
              <Link to={postUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  className="mx-auto mb-2 w-full text-center"
                  variant={"outline"}
                  size="lg"
                >
                  <BlueskyIcon />
                  Join Bluesky and reply :&gt;
                </Button>
              </Link>
              {thread.replies.map((comment) => (
                <CommentItem key={comment.uri} comment={comment} depth={0} />
              ))}
            </div>
          </div>
        </div>

        {thread.replies.length > 0 && (
          <div className="mt-4 border-t-2 pt-4 pb-2">
            <Link to={postUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full">
                Reply on Bluesky
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
