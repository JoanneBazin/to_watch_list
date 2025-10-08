import { createSectionContext } from "@/src/utils/createSectionContext";

export type DashboardSection = "films" | "series" | "categories";

export const [DashboardProvider, useDashboard] =
  createSectionContext<DashboardSection>();
