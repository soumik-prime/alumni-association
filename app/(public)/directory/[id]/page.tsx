import { notFound } from "next/navigation";
import { getProfileByRegNo } from "./_services/profile.service";
import { Breadcrumbs } from "./_components/Breadcrumbs";
import { ProfileHeader } from "./_components/ProfileHeader";
import ProfileTabs from "./_components/ProfileTabs";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getProfileByRegNo(id);

  if (!profile) notFound();

  const bgColor = "bg-linear-to-r from-green-50/80 via-white to-emerald-50/80";
  const maxWidth = "w-full max-w-screen-2xl mx-auto";

  return (
    <main className={`${bgColor}`}>
      <div className={maxWidth}>
        <Breadcrumbs name={profile.name} />

        <div className="px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <ProfileHeader profile={profile} />

          <ProfileTabs profile={profile} />
        </div>
      </div>
    </main>
  );
}
