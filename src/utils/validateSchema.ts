import { z, ZodError } from "zod";
import { ApiError } from "./ApiError";

export const safeValidateSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
) => {
  const result = schema.safeParse(data);

  return result.success
    ? { success: true, data: result.data }
    : { success: false, errors: result.error.flatten().fieldErrors };
};

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
