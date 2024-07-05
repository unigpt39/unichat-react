import React from "react";

const ResponseIcon = () => (
  <svg
    width="54"
    height="54"
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g filter="url(#filter0_d_33_1910)">
      <rect
        x="5"
        y="5"
        width="43.9315"
        height="44"
        rx="21.9658"
        fill="white"
        shapeRendering="crispEdges"
      />
      <rect
        x="12.5"
        y="15"
        width="28.9315"
        height="24"
        fill="url(#pattern0_33_1910)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_33_1910"
        x="0"
        y="0"
        width="53.9314"
        height="54"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_33_1910"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_33_1910"
          result="shape"
        />
      </filter>
      <pattern
        id="pattern0_33_1910"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use href="#image0_33_1910" transform="scale(0.0113636 0.0136986)" />
      </pattern>
      <image
        id="image0_33_1910"
        width="88"
        height="73"
        href="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default ResponseIcon;
