'use client';

import { useEffect, useRef } from 'react';

function CanvasBackground() {
  const circleBig = useRef<HTMLCanvasElement>(null);
  const circleSmall = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 画大圆
    if (circleBig.current) {
      const ctx = circleBig.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#d32d26cc';
        ctx.arc(100, 50, 500, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#973718';
        ctx.lineWidth = 30;
        ctx.stroke();
      }
    }

    // 画小圆
    if (circleSmall.current) {
      const ctx = circleSmall.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#d32d26cc';
        ctx.arc(950, 850, 280, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#973718';
        ctx.lineWidth = 20;
        ctx.stroke();
      }
    }
  }, []);

  return (
    <div>
      {/* 大圆圈 */}
      <canvas
        id="circle-big"
        ref={circleBig}
        width={800}
        height={800}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      ></canvas>
      {/* 小圆圈 */}
      <canvas
        id="circle-small"
        ref={circleSmall}
        width={800}
        height={800}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      ></canvas>
    </div>
  );
}

export default CanvasBackground;
