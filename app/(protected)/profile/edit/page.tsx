import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Edit Profile" };

export default function EditProfilePage() {
  redirect("/dashboard/profile");
}
