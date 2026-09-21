import FooterBrandHeader from "./FooterBrandHeader";
import FooterContact from "./FooterContact";
import FooterLinksColumn from "./FooterLinksColumn";
import FooterConnect from "./FooterConnect";
import FooterBottomBar from "./FooterBottomBar";
import FooterDecoration from "./FooterDecoration";
import {
  CONTACT_INFO,
  DEVELOPER,
  QUICK_LINKS,
  SOCIALS,
  UNIVERSITY_LINKS,
} from "../../_constants/footer.data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <FooterDecoration />

      <div className="relative mx-auto max-w-screen-2xl">
        <FooterBrandHeader
          title="CSE Alumni Association"
          tagline={
            <>
              Department of Computer Science & Engineering
              <br className="sm:hidden" /> · Netrokona University, Netrokona,
                        <br className="sm:hidden" /> Netrokona University, Netrokona,
              Bangladesh
            </>
          }
        />

        <div className="mx-auto px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <FooterContact info={CONTACT_INFO} />
            <FooterLinksColumn title="QUICK LINKS" links={QUICK_LINKS} />
            <FooterLinksColumn title="UNIVERSITY" links={UNIVERSITY_LINKS} />
            <FooterConnect socials={SOCIALS} />
          </div>
        </div>

        <FooterBottomBar
          year={year}
          organization="CSE Alumni Association, Department of CSE, Netrokona University"
          developerName={DEVELOPER.name}
          developerHref={DEVELOPER.href}
        />
      </div>
    </footer>
  );
}
