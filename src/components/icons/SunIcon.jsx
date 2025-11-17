import React from 'react';

export default function SunIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 1V3M10 17V19M19 10H17M3 10H1M16.0711 3.92893L14.6569 5.34315M5.34315 14.6569L3.92893 16.0711M16.0711 16.0711L14.6569 14.6569M5.34315 5.34315L3.92893 3.92893"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
