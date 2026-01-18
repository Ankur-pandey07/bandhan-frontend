import { ReactNode } from "react";

type SectionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 pt-6">

      <div className="w-full px-4 sm:px-6 lg:px-12">
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-gray-300 mt-1">
            {subtitle}
          </p>
        )}

        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

