export type QRCodeFormat = "png" | "svg";

export type QRCodeSettings = {
  value: string;
  size: number;

  foregroundColor: string;
  backgroundColor: string;

  includeLogo: boolean;
  logo?: string;

  format: QRCodeFormat;
};
