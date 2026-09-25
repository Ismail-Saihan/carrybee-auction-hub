import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CarryBeeLogoProps {
  variant?: "dark" | "light" | "icon";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function CarryBeeLogo({
  variant = "light",
  className,
  width,
  height,
  priority = false,
}: CarryBeeLogoProps) {
  if (variant === "icon") {
    const size = width || height || 40;
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#111827] p-1.5 shadow-xs",
          className
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src="/favicon.png"
          alt="CarryBee Favicon"
          width={size}
          height={size}
          className="h-full w-full object-contain"
          priority={priority}
        />
      </div>
    );
  }

  // Dark variant uses the original white text logo.png
  // Light variant uses logo-light.png with charcoal text
  const isDark = variant === "dark";
  const defaultWidth = 160;
  const targetWidth = width ?? defaultWidth;
  const targetHeight = height ?? Math.round(targetWidth * (173 / 512));

  return (
    <div className={cn("inline-flex items-center", className)}>
      <Image
        src={isDark ? "/logo.png" : "/logo-light.png"}
        alt="CarryBee Delivering with Trust"
        width={targetWidth}
        height={targetHeight}
        className="h-auto w-auto object-contain"
        priority={priority}
      />
    </div>
  );
}
