import { Menu } from "lucide-react";
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

export default function Header() {
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
          <Link to={link.url} className="m-auto" key={link.url}>
            <Button
              variant={"outline"}
              className="relative m-auto border-2 border-black"
            >
              {link.title}
            </Button>
          </Link>
        );
      }
      return (
        <Link to={link.url} key={link.url} className="m-auto hover:underline">
          {link.title}
        </Link>
      );
    });
  }
  return (
    <div
      id="header"
      className="fixed top-0 left-0 z-10 flex w-full items-center justify-between px-4 py-2 opacity-90 shadow-md backdrop-blur-3xl"
    >
      <div>
        <Link to="/">
          <img id="logo" className="h-10" src="images/logo_transparent.png" />
        </Link>
      </div>
      <div id="nav">
        <Sheet>
          <SheetTrigger className="sm:hidden">
            <div></div>
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-56 sm:w-[540px]">
            <SheetHeader>
              <SheetTitle className="m-auto">Menu</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col gap-2">
                  <Menus />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="hidden sm:flex sm:gap-5">
          <Menus />
        </div>
      </div>
      <div className="hidden sm:block"></div>
    </div>
  );
}
