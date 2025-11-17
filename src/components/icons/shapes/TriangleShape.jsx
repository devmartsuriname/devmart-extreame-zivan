import React from 'react';

export default function TriangleShape({ width = 48, height = 55, opacity = 0.2, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        opacity={opacity}
        d="M1.12432 0.00707413L47.9971 27.93L0.378738 54.5616L1.12432 0.00707413Z"
        fill="currentColor"
      />
    </svg>
  );
}
