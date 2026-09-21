interface FooterBottomBarProps {
  year: number;
  organization: string;
  developerName: string;
  developerHref: string;
}

export default function FooterBottomBar({
  year,
  organization,
  developerName,
  developerHref,
}: FooterBottomBarProps) {
  return (
    <div className="border-t border-slate-700/40 bg-slate-950/50">
      <div className="mx-auto px-5 py-4 sm:px-6 lg:px-8">
        <div
          className="
            flex flex-col gap-3
            text-sm text-slate-500
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p>
            © {year} {organization}. All rights reserved.
          </p>

          <p>
            Developed by{" "}
            <a
              href={developerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-medium
                text-(--neu-emerald)/80
                transition-colors duration-200
                hover:text-(--neu-emerald)
              "
            >
              {developerName}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
