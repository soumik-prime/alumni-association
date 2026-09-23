"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HEADER_UI, NAV_LINKS } from "../../_constants/header.data";
import { isActive } from "../../_lib/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const activeIndex = NAV_LINKS.findIndex((link) => isActive(pathname, link.href));

  const moveIndicatorTo = (index: number) => {
    const el = linkRefs.current[index];
    const nav = navRef.current;
    if (!el || !nav) return;
    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    setIndicator({
      left: elRect.left - navRect.left + 14, // 14 ≈ px-3.5
      width: elRect.width - 28,
    });
  };

  useEffect(() => {
    if (activeIndex !== -1) moveIndicatorTo(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (activeIndex !== -1) moveIndicatorTo(activeIndex);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <nav
      ref={navRef}
      aria-label={HEADER_UI.mainNavigationLabel}
      className="relative py-0.5 hidden border-b border-gray-200/50 bg-white/80 backdrop-blur md:sticky md:top-0 md:z-30 md:flex md:w-full md:items-center md:justify-center md:gap-4"
      onMouseLeave={() => activeIndex !== -1 && moveIndicatorTo(activeIndex)}
    >
      {NAV_LINKS.map((link, i) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            ref={(el) => {
              linkRefs.current[i] = el;
            }}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className="relative rounded-md px-3.5 py-2 text-lg transition-colors duration-150 hover:text-(--neu-green-hover)"
            style={{ color: active ? "var(--neu-green)" : "#010a08d4" }}
            onMouseEnter={() => moveIndicatorTo(i)}
          >
            {link.label}
          </Link>
        );
      })}
      {indicator && (
        <span
          className="pointer-events-none absolute -bottom-px h-0.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{
            left: indicator.left,
            width: indicator.width,
            backgroundColor: "var(--neu-emerald)",
          }}
        />
      )}
    </nav>
  );
}