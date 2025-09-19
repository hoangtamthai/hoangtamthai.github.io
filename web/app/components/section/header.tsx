import { Menu } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Header() {
  // const clamp = (value: number) => Math.max(0, value);

  // const isBetween = (value: number, floor: number, ceil: number) =>
  //   value >= floor && value <= ceil;
  // const useScrollspy = (ids: string[], offset: number = 0) => {
  //   const [activeId, setActiveId] = useState("");

  //   useLayoutEffect(() => {
  //     const listener = () => {
  //       const scroll = window.pageYOffset;

  //       const position = ids
  //         .map((id) => {
  //           const element = document.getElementById(id);

  //           if (!element) return { id, top: -1, bottom: -1 };

  //           const rect = element.getBoundingClientRect();
  //           const top = clamp(rect.top + scroll - offset);
  //           const bottom = clamp(rect.bottom + scroll - offset);

  //           return { id, top, bottom };
  //         })
  //         .find(({ top, bottom }) => isBetween(scroll, top, bottom));

  //       setActiveId(position?.id || "");
  //     };

  //     listener();

  //     window.addEventListener("resize", listener);
  //     window.addEventListener("scroll", listener);

  //     return () => {
  //       window.removeEventListener("resize", listener);
  //       window.removeEventListener("scroll", listener);
  //     };
  //   }, [ids, offset]);

  //   return activeId;
  // };
  // get urls from links array
  // const ids = links.map((link) => link.url.replace("#", "").replace("/", ""));
  // console.log(ids);
  // const activeId = useScrollspy(ids, 56); // 56 is navigation height
  // console.log(activeId);
  // console.log("header rendered");

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
      return (
        <Link
          to={link.url}
          key={link.url}
          // className={activeId === link.url.replace("/", "").replace("#", "") ? "font-bold underline" : ""}
        >
          {link.title}
        </Link>
      );
    });
  }
  return (
    <div
      id="header"
      className="z-10 fixed w-full backdrop-blur-3xl opacity-90 left-0 py-2 top-0 shadow-md flex items-center justify-between px-4"
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
              <SheetTitle>Menu</SheetTitle>
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
