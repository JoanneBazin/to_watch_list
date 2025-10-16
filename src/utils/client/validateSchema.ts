import { z } from "zod";

export const safeValidateSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
) => {
  const result = schema.safeParse(data);

  return result.success
    ? { success: true, data: result.data }
    : { success: false, errors: result.error.flatten().fieldErrors };
};
