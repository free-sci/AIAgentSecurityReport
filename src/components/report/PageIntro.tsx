import type { ReactNode } from 'react';

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description: string;
  icon: ReactNode;
  meta?: string;
}

export default function PageIntro({
  eyebrow,
  title,
  description,
  icon,
  meta,
}: PageIntroProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      {/* 重点：items-center 垂直居中！不要 items-start */}
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-10 md:px-8 md:py-12">
        <div className="flex h-12 w-12 flex-none items-center justify-center">
          {icon}
        </div>
        <div className="max-w-4xl">
          {eyebrow && (
            <div className="mb-2 text-xs font-bold text-blue-600 tracking-wide">
              {eyebrow}
            </div>
          )}
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-slate-950">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{description}</p>
          {meta && <div className="mt-4 text-xs font-semibold text-slate-400">{meta}</div>}
        </div>
      </div>
    </section>
  );
}