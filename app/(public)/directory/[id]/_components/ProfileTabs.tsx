"use client";

import { useState } from "react";
import { BookOpen, Briefcase, GraduationCap, MapPin, PenLine } from "lucide-react";
import { Profile } from "../_types/profile.types";
import EducationSection from "./EducationSection";
import CareerSection from "./CareerSection";
import PublicationSection from "./PublicationSection";
import BlogsSection from "./BlogsSection";
import LocationSection from "./LocationSection";

const tabs = [
  { label: "Education", icon: GraduationCap, Panel: EducationSection },
  { label: "Career", icon: Briefcase, Panel: CareerSection },
  { label: "Publications", icon: BookOpen, Panel: PublicationSection },
  { label: "Blogs", icon: PenLine, Panel: BlogsSection },
  { label: "Location", icon: MapPin, Panel: LocationSection },
] as const;

type Tab = (typeof tabs)[number]["label"];

interface ProfileTabsProps {
  profile: Profile;
}

export default function ProfileTabs({ profile }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0].label);
  const ActivePanel = tabs.find((tab) => tab.label === activeTab)!.Panel;

  return (
    <section className="overflow-hidden mt-4 sm:mt-6 rounded-3xl border border-(--neu-gray-200) bg-(--neu-white) shadow-(--neu-shadow-card)">
      {/* Tab Navigation */}
      <div className="border-b border-(--neu-gray-200) bg-(--neu-gray-50) px-4 sm:px-8">
        <div
          role="tablist"
          aria-label="Profile sections"
          className="flex overflow-x-auto scrollbar-none"
        >
          {tabs.map(({ label, icon: Icon }) => {
            const isActive = activeTab === label;
            return (
              <button
                key={label}
                id={`tab-${label.toLowerCase()}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="profile-tab-panel"
                onClick={() => setActiveTab(label)}
                className={`hover:cursor-pointer inline-flex items-center gap-1.5 pl-0.5 pr-3 sm:pl-4 sm:pr-6 mx-1  relative shrink-0 whitespace-nowrap py-4 sm:py-5 text-[15px] font-semibold tracking-tight transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--neu-green) focus-visible:ring-offset-2 sm:text-base ${
                  isActive
                    ? "text-(--neu-green)"
                    : "text-(--neu-gray-500) hover:text-(--neu-gray-700)"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {label}
                <span
                  className={`absolute inset-x-0 -bottom-px h-0.75 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-(--neu-green) opacity-100"
                      : "bg-transparent opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div
        id="profile-tab-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab.toLowerCase()}`}
        tabIndex={0}
        className="min-h-[14rem] max-h-[30rem] overflow-y-auto scrollbar-none bg-(--neu-white)"
      >
        <ActivePanel profile={profile} />
      </div>
    </section>
  );
}
