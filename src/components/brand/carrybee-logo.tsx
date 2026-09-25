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
  const aspectRatio = 512 / 173; // ~2.9595
  
  let targetHeight: number;
  let targetWidth: number;

  if (height && !width) {
    targetHeight = height;
    targetWidth = Math.round(height * aspectRatio);
  } else if (width && !height) {
    targetWidth = width;
    targetHeight = Math.round(width / aspectRatio);
  } else if (width && height) {
    targetWidth = width;
    targetHeight = height;
  } else {
    // Default optimal header dimensions: height 38px, width ~112px
    targetHeight = 38;
    targetWidth = Math.round(targetHeight * aspectRatio);
  }

  return (
    <div
      className={cn("inline-flex items-center justify-center shrink-0 overflow-hidden", className)}
      style={{ height: targetHeight, width: targetWidth }}
    >
      <Image
        src={isDark ? "/logo.png" : "/logo-light.png"}
        alt="CarryBee Delivering with Trust"
        width={targetWidth}
        height={targetHeight}
        className="h-full w-full object-contain"
        priority={priority}
      />
    </div>
  );
}
