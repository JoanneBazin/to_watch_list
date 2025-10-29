import { z } from "zod";

export const mediaSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  tmdbId: z.number().optional().nullable(),
  originalTitle: z
    .string()
    .transform((val) => (val.trim() === "" ? null : val))
    .nullable(),
  synopsis: z
    .string()
    .transform((val) => (val.trim() === "" ? null : val))
    .nullable(),
  year: z
    .string()
    .transform((val) => (val.trim() === "" ? null : val))
    .nullable(),
  real: z
    .string()
    .transform((val) => (val.trim() === "" ? null : val))
    .nullable(),
  platform: z
    .string()
    .transform((val) => (val.trim() === "" ? null : val))
    .nullable(),

  categories: z
    .union([z.string(), z.array(z.string())])
    .transform((val) =>
      Array.isArray(val) ? val : val.trim() === "" ? [] : [val]
    )
    .pipe(z.array(z.string()).min(1, "La catégorie est obligatoire")),

  type: z.enum(["FILM", "SERIE"], {
    required_error: "Le type de média est obligatoire",
    invalid_type_error: "Type invalide",
  }),
});

export const mediaServerSchema = mediaSchema.transform((data) => ({
  ...data,
  year: data.year === null ? null : Number(data.year),
}));

export const updateMediaSchema = mediaSchema.pick({
  synopsis: true,
  year: true,
  real: true,
  platform: true,
});

export const updateMediaServerSchema = updateMediaSchema.transform((data) => ({
  ...data,
  year: data.year === null ? null : Number(data.year),
}));
export type MediaFormData = z.infer<typeof mediaSchema>;
export type UpdateMediaFormData = z.infer<typeof updateMediaSchema>;
