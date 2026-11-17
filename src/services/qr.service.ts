import { BRAND } from "@/config/brand.config";
import type { QRCodeSettings } from "@/types";

export function buildPublicMenuUrl(origin?: string): string {
  const resolvedOrigin =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "http://localhost:5173");
  return `${resolvedOrigin.replace(/\/$/, "")}/`;
}

export function isValidQrUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function getDefaultQrSettings(origin?: string): QRCodeSettings {
  return {
    value: buildPublicMenuUrl(origin),
    size: 260,
    foregroundColor: BRAND.COLORS.BURGUNDY,
    backgroundColor: "#ffffff",
    includeLogo: true,
    format: "png",
  };
}

export function downloadSvgElement(svgElement: SVGSVGElement, filename: string): void {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  const dataUrl = canvas.toDataURL("image/png");
  triggerDownload(dataUrl, filename);
}

function triggerDownload(href: string, filename: string): void {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
