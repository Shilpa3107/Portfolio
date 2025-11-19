import { cn } from '@/lib/utils';
import type React from 'react';

type SectionProps = {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hideTitle?: boolean;
};

export default function Section({
  id,
  title,
  icon,
  children,
  className,
  hideTitle = false,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20', className)}>
      <div className="container mx-auto px-4">
        {!hideTitle && (
          <div className="mb-12 flex items-center gap-4">
            <span className="rounded-lg bg-primary p-3 text-primary-foreground">
              {icon}
            </span>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          </div>
        )}
        {hideTitle && <div className="mb-12"></div>}
        {children}
      </div>
    </section>
  );
}
