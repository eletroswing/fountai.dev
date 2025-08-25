"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
  images?: string[];
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  images,
  className,
}: MeteorsProps) => {
  const [myImages, setMyImages] = useState<Array<string>>([])
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setMeteorStyles(styles);
    handleFirstIter()
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  const handleFirstIter = () => {
    if (!images) return
    const imagesCopy = [...images]

    const randomOrder = imagesCopy.sort(() => Math.random() - 0.5)

    if (myImages.length < number) {
      const newImage = randomOrder.slice(0, number)
      setMyImages([...newImage])
      return
    }
  }

  const handleAnimationIteration = (idx: number) => () => {
    if (!images) return
    const imagesCopy = [...images]

    const randomImage = imagesCopy[Math.floor(Math.random() * imagesCopy.length)]

    const newSet = [...myImages]
    newSet[idx] = randomImage
    setMyImages(newSet)
  }

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "pointer-events-none absolute rotate-[var(--angle)] animate-meteor rounded-full",
            className,
          )}
          onAnimationIteration={handleAnimationIteration(idx)}
        >
          {
            images && <img src={myImages![idx]} alt="meteor" className="w-[10px] aspect-square" />
          }

          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent" />
        </span>
      ))}
    </>
  );
};
