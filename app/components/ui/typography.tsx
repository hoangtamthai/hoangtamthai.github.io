import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const styleDefault = "z-2 text-xl";
export const typographyVariants = cva(styleDefault, {
  variants: {
    variant: {
      h1: "scroll-m-20 w-fit text-2xl font-semibold tracking-tight lg:text-3xl ",
      h2: "scroll-m-20 w-fit text-3xl font-semibold tracking-tight first:mt-0 ",
      h3: "scroll-m-20 text-3xl p-2 font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-4",
      small: "text-xs sm:text-sm",
      // blockquote: "mt-6 border-l-2 pl-6 italic",
      // list: "my-6 ml-6 list-disc [&>li]:mt-2",
    },
    affects: {
      default: "text-justify",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      removePMargin: "[&:not(:first-child)]:mt-0",
      bracket: "z-2 p-2 relative",
    },
  },
  defaultVariants: {
    variant: "h1",
    affects: "default",
  },
});

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, affects, ...props }, ref) => {
    const Comp = variant || "p";
    if (affects === "bracket") {
      return (
        <div className="relative w-fit">
          <div className="bg-foreground absolute -top-1 -left-1 h-5 w-5 pt-2 pb-2"></div>
          <Comp
            className={cn(
              "bg-background",
              typographyVariants({ variant, affects, className }),
            )}
            ref={ref}
            {...props}
          />
          <div className="bg-foreground absolute -right-1 -bottom-1 z-1 h-5 w-5 pt-2 pb-2"></div>
        </div>
      );
    }
    return (
      <Comp
        className={cn(typographyVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Typography.displayName = "H1";

export default Typography;
