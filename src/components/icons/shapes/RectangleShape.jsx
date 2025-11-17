import React from 'react';

export default function RectangleShape({ 
  width = 140, 
  height = 103, 
  opacity = 0.25, 
  className = '' 
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        opacity={opacity}
        x="6.84847"
        y="38.2329"
        width="59.8743"
        height="59.8743"
        transform="rotate(-30 6.84847 38.2329)"
        stroke="currentColor"
        strokeWidth={10}
      />
    </svg>
  );
}
