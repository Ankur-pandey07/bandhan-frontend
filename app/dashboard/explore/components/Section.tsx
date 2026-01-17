import { ReactNode } from "react";

type SectionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="px-4 mt-6">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>

      {children}
    </section>
  );
}
