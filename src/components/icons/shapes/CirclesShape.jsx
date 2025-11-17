import React from 'react';

export default function CirclesShape({ width = 89, height = 83, opacity = 0.2, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 89 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        opacity={opacity}
        cx={33}
        cy={33}
        r={28}
        stroke="currentColor"
        strokeWidth={10}
      />
      <circle
        opacity={opacity * 0.75}
        cx={56}
        cy={50}
        r={28}
        stroke="currentColor"
        strokeWidth={10}
      />
    </svg>
  );
}
