import { z, ZodError } from "zod";
import { ApiError } from "../shared";

export const strictValidateSchema = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: boolean; data: z.output<T> } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiError(400, JSON.stringify(error.flatten().fieldErrors));
    }
    throw error;
  }
};
