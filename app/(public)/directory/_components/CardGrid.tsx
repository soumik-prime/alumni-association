"use client";

import Card from "./Card";

const cardData = {
  photoUrl: "/placeholder.jpeg",
  name: "Md. Samiul Islam Soumik",
  status: "student" as "student" | "alumni",
  session: "2022-23",
  batch: "4",
  location: "Thakurgaon, Bangladesh",
  href: "/directory",
};

export default function CardGrid() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-6 md:gap-4 md:justify-between lg:gap-6">
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          className="flex h-full w-full items-center justify-center"
        >
          <Card {...cardData} />
        </div>
      ))}
    </div>
  );
}
