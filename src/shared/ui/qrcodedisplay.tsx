"use client";

import { QRCodeSVG } from "qrcode.react";

export const QRCodeDisplay = ({ text, size }: { text: string, size: number }) => {
  return (
    <div>
      <QRCodeSVG value={text} size={size} />
    </div>
  );
}