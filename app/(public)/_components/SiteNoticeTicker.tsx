import { Megaphone } from "lucide-react";

import type { SiteNotice } from "@/lib/notices/notices";

interface SiteNoticeTickerProps {
  notices: readonly SiteNotice[];
}

export default function SiteNoticeTicker({
  notices,
}: SiteNoticeTickerProps) {
  if (notices.length === 0) return null;

  const sequence = Array.from({ length: 16 }, () => notices).flat();
  const groups = [sequence, sequence];

  return (
    <div
      className="mx-auto w-full max-w-screen-2xl overflow-hidden border-b border-gray-200/50 bg-yellow-500/10"
      role="region"
      aria-label="Site announcements"
    >
      <div className="flex h-9 items-center">
        <div className="flex h-full shrink-0 items-center gap-1.5 px-4 text-sm font-medium">
          <Megaphone
            className="size-3.5 text-muted-foreground"
            aria-hidden="true"
          />
          <span>Updates</span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="animate-site-ticker flex w-max items-center whitespace-nowrap">
            {groups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="flex shrink-0 items-center"
              >
                {group.map((notice, index) => (
                  <div
                    key={`${notice.id}-${groupIndex}-${index}`}
                    className="flex items-center"
                  >
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/70">
                        {notice.type}
                      </span>{" "}
                      - {notice.message}
                    </p>

                    <span
                      className="px-8 text-muted-foreground/30"
                      aria-hidden="true"
                    >
                      •
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}