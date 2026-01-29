import { Menu, Sun, Moon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useEffect, useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldUseDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const links = [
    { url: "/", title: "Home" },
    { url: "/#about", title: "About" },
    { url: "/#experience", title: "Experience" },
    { url: "/#projects", title: "Projects" },
    { url: "/#media", title: "Media" },
    { url: "/log", title: "(B)log" },
  ];
  function Menus() {
    return links.map((link) => {
      if (link.url === "/log") {
        return (
          <Link
            to={link.url}
            className="mr-10 ml-auto sm:m-auto"
            key={link.url}
          >
            <Button variant={"outline"}>{link.title}</Button>
          </Link>
        );
      }
      return (
        <Link
          to={link.url}
          key={link.url}
          className="mr-10 ml-auto first:mt-3 hover:underline sm:m-auto sm:first:mt-auto"
        >
          {link.title}
        </Link>
      );
    });
  }
  return (
    <div
      id="header"
      className="bg-background fixed top-0 left-0 z-10 flex max-h-10 w-full items-center justify-between px-4 py-1 opacity-95 shadow-md"
    >
      <div>
        <Link to="/">
          <img
            id="logo"
            alt="Tam Logo"
            aria-label="Tam Logo"
            className="h-8"
            src="/images/logo_transparent.png"
          />
        </Link>
      </div>
      <div id="nav">
        <Sheet>
          <SheetTrigger className="h-10 sm:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-56 rounded-md sm:w-[1/3]">
            <SheetHeader>
              <SheetTitle className="mt-2 mr-10 ml-auto">Menu</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col gap-5">
                  <Menus />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    className="mr-10 ml-auto"
                    aria-label="Toggle theme"
                  >
                    {isDark ? (
                      <Moon className="m-auto h-5 w-5" />
                    ) : (
                      <Sun className="m-auto h-5 w-5" />
                    )}
                  </Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="hidden sm:flex sm:gap-5">
          <Menus />
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="hidden sm:block"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Moon className="m-auto h-5 w-5" />
        ) : (
          <Sun className="m-auto h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
