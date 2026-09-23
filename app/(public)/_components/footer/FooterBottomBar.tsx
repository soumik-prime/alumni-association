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
      {" "}
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-4 sm:px-6 lg:px-8">
        {" "}
        <div className=" grid items-center gap-2 text-center text-xs text-slate-500 sm:grid-cols-2 sm:text-sm ">
          {" "}
          <p className="sm:text-left">
            {" "}
            © {year} {organization}. All rights reserved.{" "}
          </p>{" "}
          <p className="sm:text-right">
            {" "}
            Developed by{" "}
            <a
              href={developerHref}
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium text-(--neu-emerald)/80 transition-colors duration-200 hover:text-(--neu-emerald) "
            >
              {" "}
              {developerName}{" "}
            </a>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
