"use client";

import { QRCodeSVG } from "qrcode.react";

export const QRCodeDisplay = ({
  className,
  text,
  size,
}: {
  className?: string;
  text: string;
  size: number;
}) => {
  return (
    <QRCodeSVG
      value={text}
      size={size}
      style={{ objectFit: "cover" }}
      className={className ?? ""}
    />
  );
};
