import { GraduationCap } from "lucide-react";
import { ORBIT_RINGS } from "../_constants/home.constants";
import type { CommunitySample } from "../_types/home.types";
import { Avatar } from "./avatar";

export function HeroOrbit({ sample }: { sample: CommunitySample }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {ORBIT_RINGS.map((ring) => (
        <span
          key={ring.r}
          className="absolute rounded-full border border-emerald-200/70"
          style={{ width: `${ring.r * 2}%`, height: `${ring.r * 2}%`, left: `${50 - ring.r}%`, top: `${50 - ring.r}%` }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-emerald-700 text-white shadow-xl shadow-emerald-900/20">
        <GraduationCap className="h-1/2 w-1/2" />
      </div>
      {ORBIT_RINGS.flatMap((ring, ri) => {
        const source = ring.source === "current" ? sample.currentNames : sample.alumniNames;
        const names = ring.reverse ? [...source].reverse() : source;
        if (names.length === 0) return [];

        return ring.angles.map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const x = 50 + ring.r * Math.cos(rad);
          const y = 50 + ring.r * Math.sin(rad);
          return (
            <span
              key={`${ri}-${i}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%`, width: `${ring.s}%`, aspectRatio: "1" }}
            >
              <Avatar name={names[i % names.length]} alumni={ring.source === "alumni"} size="100%" />
            </span>
          );
        });
      })}
    </div>
  );
}
