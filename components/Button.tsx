import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  variant?: "primary" | "purple" | "secondary";
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  children: string;
};

/** Pill button with the rolling-label hover. `data-magnetic` is picked up by Motion. */
export function Button({ href, variant = "primary", external, icon, className = "", children }: Props) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const label = (
    <>
      <span className="btn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon}
    </>
  );
  const common = { className: cls, "data-magnetic": "", "data-cursor-hover": "" };
  if (external) {
    const isMail = href.startsWith("mailto:");
    return (
      <a href={href} {...common} {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} {...common}>
      {label}
    </Link>
  );
}
