import { clsx, type ClassValue } from "clsx";
import { RGBColor } from "react-color";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}

//function for convert rgbaObjectToRgbaString
export function rgbaObjectToString(rgba: RGBColor | "transparent") {
  if (rgba === "transparent") {
    return `rgba(0,0,0,0)`;
  }

  const alpha = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r},${rgba.g},${rgba.b},${alpha})`;
}
