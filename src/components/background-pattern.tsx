import { cn } from "@/lib/utils";
import React from "react";
import { InteractiveGridPattern } from "./ui/interactive-grid-pattern";

type Props = {
  children: React.ReactNode;
};

const BackgroundPattern = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {children}

      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        )}
        width={40}
        height={40}
        squares={[80, 80]}
      />
    </div>
  );
};

export default BackgroundPattern;
