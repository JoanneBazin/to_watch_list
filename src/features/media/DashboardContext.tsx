import { createSectionContext } from "@/src/utils/client";

export type DashboardSection = "films" | "series" | "categories";

export const [DashboardProvider, useDashboard] =
  createSectionContext<DashboardSection>();
