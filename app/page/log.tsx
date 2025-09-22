import { useEffect, useState } from "react";
import Header from "../components/section/header";
import Typography from "../components/ui/typography";
import { marked } from "marked";

export default function Log() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/md/UNIT.md")
      .then((res) => res.text())
      .then(async (text) => {
        const parsed = marked.parse(text);
        if (parsed instanceof Promise) {
          setMarkdown(await parsed);
        } else {
          setMarkdown(parsed);
        }
      });
  }, []);

  return (
    <div className="mx-12 md:mx-42 lg:mx-60 dark:bg-black">
      <div id="/log" className="h-20"></div>
      <Typography variant={"h1"}>(B)log</Typography>
      <Typography variant={"p"}>
        Welcome to my (B)log, a combination of blog and log about my experiences
        and work. This log is the work-log I write when working as UNIT.
      </Typography>
      <div className="h-6"></div>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
    </div>
  );
}
