import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import Typography from "../ui/typography";

const SHARE_ID = "KMFfe0V0ID12zX1v";
const WEBSITE_ID = "cd8b2767-003c-487d-b46b-cefca5e57130";
const BASE_URL = "https://umami-fs.tamthai.de";

export function usePageViews() {
  const { pathname } = useLocation();
  console.log("path", pathname);

  // 1. Fetch the Share Token first
  const shareQuery = useQuery({
    queryKey: ["umami-token", SHARE_ID],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/share/${SHARE_ID}`);
      if (!res.ok) throw new Error("Failed to get share token");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // Token is likely valid for an hour
  });

  const token = shareQuery.data?.token;

  // 2. Fetch the Stats once we have the token
  const webUrl = `${BASE_URL}/api/websites/${WEBSITE_ID}`;
  return useQuery({
    queryKey: ["views", pathname, token],
    enabled: !!token, // Only run if token exists
    queryFn: async () => {
      const startAt = 1735689600000; // start of 2025
      const endAt = Date.now();
      const pageUrl = `${BASE_URL}/share/${SHARE_ID}?date=range:${startAt}:${endAt}:all&path=eq.${pathname}`;
      const statUrl = `${webUrl}/stats?startAt=${startAt}&endAt=${endAt}&path=eq.${pathname}`;
      const res = await fetch(statUrl, {
        headers: { "x-umami-share-token": token },
      });

      if (!res.ok) throw new Error("Page views request failed");
      const data = await res.json();
      return { value: data.pageviews, url: pageUrl };
    },
    staleTime: 1000 * 60 * 5, // Stats stay fresh for 5 mins
  });
}

export function getPageStatUrl() {
  const { pathname } = useLocation();
  const startAt = 1735689600000; // start of 2025
  const endAt = Date.now();
  const pageUrl = `${BASE_URL}/share/${SHARE_ID}?date=range:${startAt}:${endAt}:all&path=eq.${pathname}`;
  return pageUrl;
}

export function PageView() {
  const { data: pageView, isLoading, error } = usePageViews();
  if (error) {
    return <>Page views error</>;
  }

  if (isLoading) {
    return (
      <Typography variant={"small"} className="text-xs sm:text-sm">
        loading...
      </Typography>
    );
  }

  return (
    <Typography variant={"small"} className="text-xs sm:text-sm">
      {pageView?.value}
    </Typography>
  );
}
