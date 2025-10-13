import { z } from "zod";

export const validate = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);

  return result.success
    ? { success: true, data: result.data }
    : { success: false, errors: result.error.flatten().fieldErrors };
};
