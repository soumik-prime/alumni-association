import { redirect } from "next/navigation";
import { DASHBOARD_HOME_PATH } from "./_constants/navigation";

export default function DashboardPage() {
  redirect(DASHBOARD_HOME_PATH);
}
