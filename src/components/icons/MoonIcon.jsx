import React from 'react';

export default function MoonIcon({ size = 20, className = '' }) {
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
        d="M17.2939 11.5393C16.2956 11.8085 15.249 11.9505 14.1716 11.9505C9.14569 11.9505 5.07056 7.87542 5.07056 2.84949C5.07056 1.77211 5.21258 0.725485 5.48176 -0.272827C2.31446 1.10594 0.0705566 4.27324 0.0705566 7.97977C0.0705566 13.0057 4.14569 17.0808 9.17162 17.0808C12.8781 17.0808 16.0454 14.8369 17.2939 11.5393Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
