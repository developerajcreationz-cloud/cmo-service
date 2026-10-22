type P = { size?: number; className?: string };

export const ArrowUpRight = ({ size = 20, className = "icon" }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 15 15 5M15 5H7M15 5v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M16 10H4m5-5-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const External = ({ size = 20 }: P) => (
  <svg className="icon" width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M11 4h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 4l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 12.5V15a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 15V7.5A1.5 1.5 0 0 1 5 6h2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Close = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const QuoteMark = () => (
  <svg className="reviews__quote" width="33" height="24" viewBox="0 0 33 24" fill="none" aria-hidden="true" data-quote>
    <circle cx="7.4" cy="7.6" r="5.4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12.8 7.6c0 6.2-2 10.6-6.6 14.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="24.6" cy="7.6" r="5.4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M30 7.6c0 6.2-2 10.6-6.6 14.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const PlayMark = () => (
  <svg className="mark" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M10 7l5 5-5 5V7z" fill="#7430F7" />
  </svg>
);

export const CheckMark = () => (
  <svg className="mark" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="#fff" fillOpacity=".22" />
    <circle cx="10" cy="10" r="9" stroke="#fff" strokeWidth="1.4" />
    <path d="M6.2 10.4l2.6 2.6L14 7.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StatIcon = ({ tone }: { tone: "purple" | "yellow" | "green" }) => {
  if (tone === "purple")
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (tone === "yellow")
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <circle cx="9" cy="10" r="1.2" fill="#111" />
        <circle cx="15" cy="10" r="1.2" fill="#111" />
        <path d="M8 14.5c1 1.4 2.3 2.1 4 2.1s3-.7 4-2.1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.6 15.9 8.1 13.4c.4-3.6 2-6.6 4.5-8.6a10 10 0 0 1 7.9-2.2 10 10 0 0 1-2.2 7.9c-2 2.5-5 4.1-8.6 4.5Z" fill="currentColor" />
      <path d="M8.4 16.2c-1.3-.3-2.6.2-3.5 1.4-.7 1-1 2.3-.9 3.4 1.1.1 2.4-.2 3.4-.9 1.2-.9 1.7-2.2 1.4-3.5" fill="currentColor" />
      <circle cx="15.2" cy="8.8" r="1.9" fill="#fff" />
    </svg>
  );
};

/** Six simple line icons for the "What I Own" grid. */
export const OwnIcon = ({ name }: { name: string }) => {
  const common = { width: 64, height: 64, viewBox: "0 0 64 64", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "fc__ownicon", "aria-hidden": true };
  switch (name) {
    case "growth":
      return (<svg {...common}><path d="M8 50 24 32l10 10 22-26" /><path d="M42 16h14v14" /></svg>);
    case "acquisition":
      return (<svg {...common}><circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="13" /><circle cx="32" cy="32" r="4" /></svg>);
    case "outcomes":
      return (<svg {...common}><path d="M8 12h48L38 34v16l-12 6V34z" /></svg>);
    case "team":
      return (<svg {...common}><circle cx="32" cy="22" r="8" /><path d="M16 52c0-9 7-15 16-15s16 6 16 15" /><circle cx="12" cy="26" r="5" /><circle cx="52" cy="26" r="5" /></svg>);
    case "analytics":
      return (<svg {...common}><path d="M10 54V10" /><path d="M10 54h46" /><rect x="18" y="32" width="8" height="16" rx="2" /><rect x="32" y="22" width="8" height="26" rx="2" /><rect x="46" y="12" width="8" height="36" rx="2" /></svg>);
    default:
      return (<svg {...common}><rect x="10" y="10" width="20" height="20" rx="5" /><rect x="34" y="34" width="20" height="20" rx="5" /><path d="M30 20h10a6 6 0 0 1 6 6v8" /><path d="M34 44H24a6 6 0 0 1-6-6V30" /></svg>);
  }
};
