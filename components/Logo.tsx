/* ============================================================
   Momentum Mentoring — tokenised logo
   ------------------------------------------------------------
   Colour variants are CSS classes that set three custom props:
     --logo-ink     wordmark text colour
     --logo-mark-a  left "m" of the logomark
     --logo-mark-b  right "m" of the logomark

   Variants (matching the source files):
     "teal"  = LM1 / LT1 / L1   (all teal)
     "navy"  = LM2 / LT2         (all navy)   — default
     "duo"   = LM3 / LT3 / L3   (left navy, right teal)
     "white" = Logo White

   The logotype is REAL TEXT (Podium Soft + Barlow Semi Condensed),
   not outlined paths, so it can be themed / animated / given text
   effects. The original LT*.svg files are the visual reference.
   ============================================================ */

type Variant = "teal" | "navy" | "duo" | "white";

export function Logomark({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 47.87 24.73"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Momentum Mentoring logomark"
    >
      {/* left m */}
      <g fill="var(--logo-mark-a, currentColor)">
        <circle cx="11.79" cy="3.86" r="3.86" />
        <path d="M23.57,11.06v12.02c0,.9-.71,1.63-1.6,1.65h-4.78c-.12,0-.24,0-.36-.01h-.01c-.11-.02-.22-.03-.33-.05-.11-.02-.21-.04-.3-.07h-.01c-.39-.19-.66-.56-.71-1l.02-.45.3-6.09s-.02-.08-.05-.11c-.04-.02-.07-.03-.11-.03s-.08.01-.11.03c-.04.03-.07.06-.08.11l-1.68,6.82c-.04.2-.22.35-.53.47-.3.12-.68.18-1.14.18h-.61c-.45,0-.83-.06-1.14-.18-.3-.12-.48-.27-.52-.47l-1.68-6.82s-.03-.09-.07-.11c-.04-.03-.08-.04-.12-.04s-.08,0-.11.04c-.03.02-.05.06-.05.11l.3,6.12s.01.01,0,.02l.02.33c-.03.47-.31.87-.72,1.07h-.01c-.09.03-.18.05-.29.07-.11.02-.22.03-.34.05h-.01c-.11.01-.23.01-.36.01H1.61c-.89-.02-1.61-.75-1.61-1.65v-12.02c0-.9.72-1.63,1.61-1.65h7.4s.06,0,.09,0c.09,0,.17.01.25.02.63.14,1.12.63,1.27,1.25l.02.18s.02.06.01.09l.9,6.1c.02.06.05.11.09.15.05.03.1.05.15.05s.1-.02.15-.05c.04-.03.07-.08.08-.15l.92-6.21.02-.16c.15-.62.64-1.11,1.27-1.25.08-.01.16-.02.25-.02.04,0,.08,0,.13,0h7.36c.89.02,1.6.75,1.6,1.65Z" />
      </g>
      {/* right m */}
      <g fill="var(--logo-mark-b, currentColor)">
        <circle cx="36.09" cy="3.86" r="3.86" />
        <path d="M47.87,11.06v12.02c0,.9-.71,1.63-1.6,1.65h-4.78c-.12,0-.24,0-.36-.01h-.01c-.11-.02-.22-.03-.33-.05-.11-.02-.21-.04-.3-.07h-.01c-.39-.19-.66-.56-.71-1l.02-.45.3-6.09s-.02-.08-.05-.11c-.04-.02-.07-.03-.11-.03s-.08.01-.11.03c-.04.03-.07.06-.08.11l-1.68,6.82c-.04.2-.22.35-.53.47-.3.12-.68.18-1.14.18h-.61c-.45,0-.83-.06-1.14-.18-.3-.12-.48-.27-.52-.47l-1.68-6.82s-.03-.09-.07-.11c-.04-.03-.08-.04-.12-.04s-.08,0-.11.04c-.03.02-.05.06-.05.11l.3,6.12s.01.01,0,.02l.02.33c-.03.47-.31.87-.72,1.07h-.01c-.09.03-.18.05-.29.07-.11.02-.22.03-.34.05h-.01c-.11.01-.23.01-.36.01h-4.77c-.89-.02-1.61-.75-1.61-1.65v-12.02c0-.9.72-1.63,1.61-1.65h7.4s.06,0,.09,0c.09,0,.17.01.25.02.63.14,1.12.63,1.27,1.25l.02.18s.02.06.01.09l.9,6.1c.02.06.05.11.09.15.05.03.1.05.15.05s.1-.02.15-.05c.04-.03.07-.08.08-.15l.92-6.21.02-.16c.15-.62.64-1.11,1.27-1.25.08-.01.16-.02.25-.02.04,0,.08,0,.13,0h7.36c.89.02,1.6.75,1.6,1.65Z" />
      </g>
    </svg>
  );
}

export function Logotype({ className = "" }: { className?: string }) {
  return (
    <span className={`logotype ${className}`}>
      <span className="logo__word">Momentum</span>
      <span className="logo__sub">Mentoring</span>
    </span>
  );
}

export default function Logo({
  variant = "navy",
  withType = true,
  className = "",
  style,
}: {
  variant?: Variant;
  withType?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`logo logo--${variant} ${className}`} style={style}>
      <Logomark className="logo__mark" />
      {withType && <Logotype />}
    </span>
  );
}
