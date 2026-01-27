'use client';

import { useEffect, useRef, useState } from 'react';

const plans = [
  {
    id: 'plus',
    title: 'Bandhan Plus',
    price: '₹199 / month',
    tag: 'POPULAR',
    tagColor: 'bg-pink-500',
    features: [
      'Unlimited Likes',
      'Unlimited Rewinds',
      '1 Free Boost every week',
    ],
  },
  {
    id: 'gold',
    title: 'Bandhan Gold',
    price: '₹399 / month',
    tag: 'BEST VALUE',
    tagColor: 'bg-pink-600',
    features: [
      'See Who Likes You',
      'Top Picks',
      '5 Free Super Likes daily',
    ],
  },
  {
    id: 'platinum',
    title: 'Bandhan Platinum',
    price: '₹699 / month',
    special: true,
    features: [
      'Priority Likes',
      'Message before matching',
      'See Who Likes You',
    ],
  },
];

export default function UpgradeCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handler = () => {
      const children = Array.from(container.children) as HTMLElement[];
      const center = container.scrollLeft + container.offsetWidth / 2;

      let closest = 0;
      let minDist = Infinity;

      children.forEach((child, i) => {
        const childCenter =
          child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - childCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    container.addEventListener('scroll', handler, { passive: true });
    return () => container.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    container.scrollTo({
      left:
        child.offsetLeft -
        container.offsetWidth / 2 +
        child.offsetWidth / 2,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mt-10 px-2">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-6 scroll-smooth"
      >
        {plans.map((plan, i) => {
          const isActive = i === activeIndex;
          const isPlatinum = plan.special;

          return (
            <div
              key={plan.id}
              className={`relative min-w-[280px] rounded-3xl p-6 pt-10
                transition-all duration-300
                ${isActive ? 'scale-[1.04]' : 'scale-[0.96] opacity-80'}
                ${
                  isPlatinum
                    ? 'bg-gradient-to-br from-[#1f1f1f] via-[#0e0e0e] to-black border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.08)]'
                    : 'bg-white/5'
                }`}
            >
              {plan.tag && (
                <div className="mb-3 flex justify-center">
                  <span
                    className={`${plan.tagColor}
                      text-white text-xs font-semibold
                      px-4 py-1.5 rounded-full`}
                  >
                    {plan.tag}
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold mb-1">
                {plan.title}
              </h3>

              <p className="text-sm text-white/70 mb-4">
                {plan.price}
              </p>

              <ul className="space-y-2 text-sm mb-6">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-full py-3 text-sm font-semibold transition
                  ${
                    isPlatinum
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600'
                      : 'bg-pink-500 hover:bg-pink-600'
                  }`}
              >
                UPGRADE
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {plans.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex
                ? 'w-6 bg-pink-500'
                : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
