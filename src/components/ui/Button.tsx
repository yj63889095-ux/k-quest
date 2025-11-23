import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest",
                    {
                        "bg-[#D4AF37] text-[#1A1A1A] hover:bg-white hover:text-[#1A1A1A]":
                            variant === "primary",
                        "bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A]":
                            variant === "secondary", // Used as 'Gold Outline'
                        "bg-transparent border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A]":
                            variant === "outline",
                        "hover:text-[#D4AF37] text-white/80":
                            variant === "ghost",
                        "text-[#D4AF37] underline-offset-4 hover:underline":
                            variant === "link",
                        "h-9 px-4 text-xs": size === "sm",
                        "h-12 px-8 text-sm": size === "md",
                        "h-16 px-10 text-base": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
