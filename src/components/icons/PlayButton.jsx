import React from 'react';

export default function PlayButton({ size = 80, color = '#FD6219', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx={40} cy={40} r={40} fill={color} />
      <path
        d="M60.079 39.9998L30.148 57.4394L30.0104 22.7986L60.079 39.9998Z"
        fill="white"
      />
    </svg>
  );
}
