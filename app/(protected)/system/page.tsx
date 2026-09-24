import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "System" };

export default function SystemPage() {
  redirect("/dashboard/permissions");
}
