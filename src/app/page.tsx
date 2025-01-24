"use client";

import LoginButton from "@/components/auth/login-button";
import BackgroundPattern from "@/components/background-pattern";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function Home() {
  return (
    <BackgroundPattern>
      <div className="z-10 whitespace-pre-wrap text-center text-5xl space-y-4">
        <h1 className="font-semibold drop-shadow-md">Auth</h1>
        <p className="text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <InteractiveHoverButton className="text-base dark:text-black">
              Sign In
            </InteractiveHoverButton>
          </LoginButton>
        </div>
      </div>
    </BackgroundPattern>
  );
}
