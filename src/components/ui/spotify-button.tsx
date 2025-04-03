import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spotifyButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-light",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        spotify: "bg-[#1DB954] text-white hover:bg-[#1ED760] shadow-md",
        "spotify-outline":
          "border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10",
        "spotify-ghost": "text-[#1DB954] hover:bg-[#1DB954]/10",
        "spotify-dark":
          "bg-[#191414] text-white hover:bg-[#333] border border-[#333]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SpotifyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof spotifyButtonVariants> {
  asChild?: boolean;
}

const SpotifyButton = React.forwardRef<HTMLButtonElement, SpotifyButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(spotifyButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
SpotifyButton.displayName = "SpotifyButton";

export { SpotifyButton, spotifyButtonVariants };
