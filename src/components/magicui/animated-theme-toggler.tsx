"use client";

import { Moon, SunDim } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle("dark");
        setIsDarkMode(dark);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );

    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if(!theme) {
      localStorage.setItem('theme', 'dark') //set as dark mode by default
      setIsDarkMode(true)
      return
    }

    if (theme === 'dark') {
      setIsDarkMode(true)
    }
  }, [])

  return (
    <button ref={buttonRef} onClick={changeTheme} className={cn(className, buttonVariants({ variant: "ghost", size: "icon" }))}>
      {isDarkMode ? <SunDim className="size-6" /> : <Moon className="size-4.5" />}
    </button>
  );
};
