import type { ReactNode } from 'react';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  meta?: string;
}

export default function PageIntro({ eyebrow, title, description, icon, meta }: PageIntroProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl items-start gap-5 px-5 py-10 md:px-8 md:py-12">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-blue-600 text-white">
          {icon}
        </div>
        <div className="max-w-4xl">
          <div className="mb-2 text-xs font-bold text-blue-600">{eyebrow}</div>
          <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{description}</p>
          {meta && <div className="mt-4 text-xs font-semibold text-slate-400">{meta}</div>}
        </div>
      </div>
    </section>
  );
}

