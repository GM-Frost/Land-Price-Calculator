import type { ReactNode } from "react";

import Button from "../button/Button";
import Card from "./Card";

type CardWithButtonProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
  eyebrow?: string;
  badge?: string;
  footerText?: ReactNode;
  className?: string;
  buttonVariant?: "primary" | "secondary" | "ghost";
};

export default function CardWithButton({
  title,
  description,
  buttonLabel,
  buttonHref,
  eyebrow,
  badge,
  footerText,
  className,
  buttonVariant = "primary",
}: CardWithButtonProps) {
  return (
    <Card
      title={title}
      description={description}
      eyebrow={eyebrow}
      badge={badge}
      className={className}
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {footerText ? (
            <p className="text-sm text-slate-500">{footerText}</p>
          ) : (
            <span />
          )}
          <Button href={buttonHref} variant={buttonVariant} size="md">
            {buttonLabel}
          </Button>
        </div>
      }
    />
  );
}
