import * as React from "react";
import { cn } from "@/lib/utils";

const SpotifyCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md dark:bg-opacity-40 dark:backdrop-blur-sm dark:backdrop-filter hover:-translate-y-1",
      className,
    )}
    {...props}
  />
));
SpotifyCard.displayName = "SpotifyCard";

const SpotifyCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
SpotifyCardHeader.displayName = "SpotifyCardHeader";

const SpotifyCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
SpotifyCardTitle.displayName = "SpotifyCardTitle";

const SpotifyCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SpotifyCardDescription.displayName = "SpotifyCardDescription";

const SpotifyCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
SpotifyCardContent.displayName = "SpotifyCardContent";

const SpotifyCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
SpotifyCardFooter.displayName = "SpotifyCardFooter";

export {
  SpotifyCard,
  SpotifyCardHeader,
  SpotifyCardFooter,
  SpotifyCardTitle,
  SpotifyCardDescription,
  SpotifyCardContent,
};
