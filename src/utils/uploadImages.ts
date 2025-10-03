import sharp from "sharp";
import { supabaseAdmin } from "../lib/supabase-client";

export const uploadImages = async (
  file: File,
  userId: string
): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const optimizedImage = await sharp(buffer)
    .resize({ width: 500, height: 500, fit: "cover" })
    .webp({ quality: 80 })
    .toBuffer();

  const filename = `${userId}/avatar.webp`;

  const { error } = await supabaseAdmin.storage
    .from("watchers_images")
    .upload(filename, optimizedImage, {
      contentType: "image/webp",
      upsert: true,
    });

  if (error) {
    throw new Error(`Erreur lors de l'upload: ${error.message}`);
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/watchers_images/${filename}`;
};
