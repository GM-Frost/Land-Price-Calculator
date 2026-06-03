import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
  badge?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Card({
  title,
  description,
  eyebrow,
  badge,
  footer,
  children,
  className,
  contentClassName,
}: CardProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[28px] border border-black/5 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.22)] backdrop-blur",
        className
      )}
    >
      {(eyebrow || badge || title || description) && (
        <div className="flex items-start justify-between gap-4 border-b border-black/5 px-5 py-5 sm:px-6">
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-2xl md:text-sm leading-5 text-slate-600 sm:text-xs">
                {description}
              </p>
            ) : null}
          </div>
          {badge ? (
            <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {badge}
            </span>
          ) : null}
        </div>
      )}

      <div className={cn("px-5 py-5 sm:px-6", contentClassName)}>{children}</div>

      {footer ? (
        <div className="border-t border-black/5 px-5 py-4 sm:px-6">{footer}</div>
      ) : null}
    </section>
  );
}
