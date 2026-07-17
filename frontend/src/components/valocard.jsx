export default function ValoCard() {
  // All coordinates are based on a 320×480 viewBox
  const w = 320;
  const h = 480;
  const r = 20;
  const pad = 16;
  const stroke = "#e84a2e";
  const strokeDim = "rgba(232, 74, 46, 0.5)";

  const ix = pad, iy = pad;
  const iw = w - pad * 2, ih = h - pad * 2;
  const ir = 12;
  const cx = w / 2, cy = h / 2;
  const ds = 72;
  const crossY1 = iy + ih * 0.18;
  const crossY2 = iy + ih - ih * 0.18 + iy;

  const Crosshair = ({ y }) => (
    <g transform={`translate(${cx}, ${y})`} filter="url(#valoGlow)">
      <circle r={10} fill="none" stroke={stroke} strokeWidth={1} />
      <circle r={4} fill="none" stroke={stroke} strokeWidth={0.8} />
      <line y1={-14} y2={-6} stroke={stroke} strokeWidth={0.8} />
      <line y1={6} y2={14} stroke={stroke} strokeWidth={0.8} />
      <line x1={-14} x2={-6} stroke={stroke} strokeWidth={0.8} />
      <line x1={6} x2={14} stroke={stroke} strokeWidth={0.8} />
    </g>
  );

  return (
    <div className="relative w-full h-full">
      {/* Outer glow */}
      <div
        className="absolute rounded-[32px] pointer-events-none"
        style={{
          inset: -12,
          background: "radial-gradient(ellipse at center, rgba(232,74,46,0.6) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      <svg
        viewBox={`0 0 ${w} ${h}`}
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-[1] block w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="valoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="valoGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="valoInnerClip">
            <rect x={ix} y={iy} width={iw} height={ih} rx={ir} />
          </clipPath>
        </defs>

        {/* Card background + outer border */}
        <rect x={1} y={1} width={w - 2} height={h - 2} rx={r}
          fill="#0a0a0a" stroke={stroke} strokeWidth={2.5} filter="url(#valoGlowStrong)" />

        {/* Inner border */}
        <rect x={ix} y={iy} width={iw} height={ih} rx={ir}
          fill="none" stroke={stroke} strokeWidth={1.5} filter="url(#valoGlow)" />

        {/* Diagonal X-lines from corners */}
        <g clipPath="url(#valoInnerClip)" opacity={0.7}>
          <line x1={ix} y1={iy} x2={cx - 10} y2={cy - 50} stroke={strokeDim} strokeWidth={1.2} />
          <line x1={ix + iw} y1={iy} x2={cx + 10} y2={cy - 50} stroke={strokeDim} strokeWidth={1.2} />
          <line x1={ix} y1={iy + ih} x2={cx - 10} y2={cy + 50} stroke={strokeDim} strokeWidth={1.2} />
          <line x1={ix + iw} y1={iy + ih} x2={cx + 10} y2={cy + 50} stroke={strokeDim} strokeWidth={1.2} />
        </g>

        {/* Angular brackets (top & bottom) */}
        <g clipPath="url(#valoInnerClip)">
          <polyline points={`${ix + 30},${iy + 8} ${ix + 8},${iy + 8} ${ix + 8},${iy + ih * 0.28} ${cx - 55},${cy - 65}`}
            fill="none" stroke={strokeDim} strokeWidth={1} />
          <polyline points={`${ix + iw - 30},${iy + 8} ${ix + iw - 8},${iy + 8} ${ix + iw - 8},${iy + ih * 0.28} ${cx + 55},${cy - 65}`}
            fill="none" stroke={strokeDim} strokeWidth={1} />
          <polyline points={`${ix + 30},${iy + ih - 8} ${ix + 8},${iy + ih - 8} ${ix + 8},${iy + ih - ih * 0.28} ${cx - 55},${cy + 65}`}
            fill="none" stroke={strokeDim} strokeWidth={1} />
          <polyline points={`${ix + iw - 30},${iy + ih - 8} ${ix + iw - 8},${iy + ih - 8} ${ix + iw - 8},${iy + ih - ih * 0.28} ${cx + 55},${cy + 65}`}
            fill="none" stroke={strokeDim} strokeWidth={1} />
        </g>

        {/* Horizontal connector lines */}
        <g clipPath="url(#valoInnerClip)" opacity={0.5}>
          <line x1={ix + 8} y1={cy} x2={cx - ds - 8} y2={cy} stroke={strokeDim} strokeWidth={0.8} />
          <line x1={ix + iw - 8} y1={cy} x2={cx + ds + 8} y2={cy} stroke={strokeDim} strokeWidth={0.8} />
        </g>

        {/* Side angular shapes */}
        <g clipPath="url(#valoInnerClip)">
          <polyline points={`${ix + 8},${cy - 40} ${ix + 35},${cy - 40} ${ix + 50},${cy - 20} ${ix + 50},${cy + 20} ${ix + 35},${cy + 40} ${ix + 8},${cy + 40}`}
            fill="none" stroke={strokeDim} strokeWidth={1} />
          <polyline points={`${ix + iw - 8},${cy - 40} ${ix + iw - 35},${cy - 40} ${ix + iw - 50},${cy - 20} ${ix + iw - 50},${cy + 20} ${ix + iw - 35},${cy + 40} ${ix + iw - 8},${cy + 40}`}
            fill="none" stroke={strokeDim} strokeWidth={1} />
        </g>

        {/* Center diamond */}
        <g filter="url(#valoGlow)">
          <polygon points={`${cx},${cy - ds} ${cx + ds},${cy} ${cx},${cy + ds} ${cx - ds},${cy}`}
            fill="#0a0a0a" stroke={stroke} strokeWidth={2} />
          <polygon points={`${cx},${cy - ds + 14} ${cx + ds - 14},${cy} ${cx},${cy + ds - 14} ${cx - ds + 14},${cy}`}
            fill="none" stroke={stroke} strokeWidth={1} opacity={0.6} />
        </g>

        {/* R² logo */}
        <text x={cx} y={cy + 6} textAnchor="middle" dominantBaseline="middle"
          fontFamily="'Inter','Arial Black',sans-serif" fontWeight="900" fontSize="42"
          fill={stroke} filter="url(#valoGlow)" style={{ fontStyle: "italic" }}>R</text>
        <text x={cx + 22} y={cy - 10} textAnchor="start" dominantBaseline="middle"
          fontFamily="'Inter','Arial Black',sans-serif" fontWeight="800" fontSize="20"
          fill={stroke} filter="url(#valoGlow)">2</text>

        {/* Crosshairs */}
        <Crosshair y={crossY1} />
        <Crosshair y={crossY2} />

        {/* Vertical lines connecting crosshairs to diamond */}
        <g clipPath="url(#valoInnerClip)" opacity={0.4}>
          <line x1={cx} y1={crossY1 + 14} x2={cx} y2={cy - ds - 8} stroke={strokeDim} strokeWidth={0.8} />
          <line x1={cx} y1={crossY2 - 14} x2={cx} y2={cy + ds + 8} stroke={strokeDim} strokeWidth={0.8} />
        </g>

        {/* Horizontal bars near crosshairs */}
        <g clipPath="url(#valoInnerClip)" opacity={0.4}>
          <line x1={cx - 40} y1={crossY1} x2={cx - 14} y2={crossY1} stroke={strokeDim} strokeWidth={0.6} />
          <line x1={cx + 14} y1={crossY1} x2={cx + 40} y2={crossY1} stroke={strokeDim} strokeWidth={0.6} />
          <line x1={cx - 40} y1={crossY2} x2={cx - 14} y2={crossY2} stroke={strokeDim} strokeWidth={0.6} />
          <line x1={cx + 14} y1={crossY2} x2={cx + 40} y2={crossY2} stroke={strokeDim} strokeWidth={0.6} />
        </g>
      </svg>
    </div>
  );
}
