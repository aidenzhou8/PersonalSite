import React, { useMemo } from "react";
import { generateEinsteinPatch } from "./einsteinPattern";

// Scale pattern to fill viewBox (pattern units → SVG units)
const SCALE = 100;

function polygonToPath(vertices) {
  // Generator uses Y-up; SVG uses Y-down, so negate y
  const pts = vertices.map((p) => `${SCALE * p.x},${-SCALE * p.y}`);
  return `M ${pts.join(" L ")} Z`;
}

export function EinsteinTiling({ className = "", opacity = 0.04, level = 2 }) {
  const polygons = useMemo(() => generateEinsteinPatch(level), [level]);

  return (
    <svg
      className={`absolute left-1/2 top-1/2 ${className}`}
      style={{
        opacity: "var(--theme-einstein-svg-opacity, 0.12)",
        transform: "translate(-50%, -50%)",
        width: "250vmax",
        height: "250vmax",
        minWidth: "250vmax",
        minHeight: "250vmax",
      }}
      viewBox="-2500 -2500 5000 5000"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient spans ±600 so variation occurs across the visible center (viewport shows ~center of 250vmax SVG) */}
        <linearGradient id="einstein-fade" x1="-600" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" />
          <stop offset="30%" stopColor="rgb(128,128,128)" />
          <stop offset="70%" stopColor="rgb(128,128,128)" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
        <mask id="einstein-mask" maskUnits="userSpaceOnUse" x="-2500" y="-2500" width="5000" height="5000">
          <rect x="-2500" y="-2500" width="5000" height="5000" fill="url(#einstein-fade)" />
        </mask>
      </defs>
      <g mask="url(#einstein-mask)">
        {polygons.map((verts, i) =>
          i % 3 !== 0 ? (
            <path
              key={i}
              d={polygonToPath(verts)}
              fill="none"
              stroke="var(--theme-einstein-muted)"
              strokeWidth="0.6"
            />
          ) : null
        )}
      </g>
      <g style={{ opacity: "var(--theme-einstein-opacity, 0.55)" }}>
        {polygons.map((verts, i) =>
          i % 3 === 0 ? (
            <path
              key={i}
              d={polygonToPath(verts)}
              fill="none"
              stroke="var(--theme-einstein-stroke)"
              strokeWidth="0.8"
            />
          ) : null
        )}
      </g>
    </svg>
  );
}
