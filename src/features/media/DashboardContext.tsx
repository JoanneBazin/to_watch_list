import { createSectionContext } from "@/src/utils";

export type DashboardSection = "films" | "series" | "categories";

export const [DashboardProvider, useDashboard] =
  createSectionContext<DashboardSection>();
