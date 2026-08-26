'use client';

import { QRCodeSVG } from 'qrcode.react';

interface Props {
  value: string;
  size?: number;
}

export default function SessionQRCode({ value, size = 220 }: Props) {
  return (
    <div className="inline-block rounded-lg border border-neutral-200 bg-white p-4">
      <QRCodeSVG value={value} size={size} />
    </div>
  );
}
