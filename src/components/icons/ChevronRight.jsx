import React from 'react';

export default function ChevronRight({ size = 7, className = '' }) {
  return (
    <svg
      width={size}
      height={size * 1.714} // Maintain 7:12 aspect ratio
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 1.272L4.55116 6L0 10.728L1.22442 12L7 6L1.22442 0L0 1.272Z"
        fill="currentColor"
      />
    </svg>
  );
}
