import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 130,
          fontWeight: 800,
          color: '#0c0b0e',
          background: '#e8843a',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        P
      </div>
    ),
    size
  );
}
