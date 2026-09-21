import { Mail, MapPin, Phone } from "lucide-react";

import FooterTitle from "./FooterTitle";
import type { FooterContactInfo } from "../../_types/footer.types";

interface FooterContactProps {
  info: FooterContactInfo;
}

export default function FooterContact({ info }: FooterContactProps) {
  return (
    <div>
      <FooterTitle title="CONTACT US" />

      <div className="mt-6 space-y-3 text-[15px] text-slate-400">
        <div className="flex items-start gap-4">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-(--neu-emerald)/80" />

          <p className="leading-7">
            {info.addressLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < info.addressLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        <a
          href={`tel:${info.phone}`}
          className="
            flex items-center gap-4
            text-slate-400
            transition-colors duration-200
            hover:text-slate-200
          "
        >
          <Phone className="h-5 w-5 shrink-0 text-(--neu-emerald)/80" />
          <span>{info.phone}</span>
        </a>

        <a
          href={`mailto:${info.email}`}
          className="
            flex items-center gap-4
            text-slate-400
            transition-colors duration-200
            hover:text-slate-200
          "
        >
          <Mail className="h-5 w-5 shrink-0 text-(--neu-emerald)/80" />
          <span>{info.email}</span>
        </a>
      </div>
    </div>
  );
}
