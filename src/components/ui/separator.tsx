"use client";

import * as React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  const baseClass = "shrink-0 bg-border";
  const orientationClass = orientation === "horizontal" ? "h-[1px] w-full bg-gray-500" : "h-full w-[1px]";
  const combinedClassName = `${baseClass} ${orientationClass} ${className || ""}`;

  return <div ref={ref} role={decorative ? "presentation" : "separator"} aria-orientation={orientation} className={combinedClassName} {...props} />;
});
Separator.displayName = "Separator";

export default Separator;
