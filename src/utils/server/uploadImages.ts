import { MOCK_UTAPI } from "@/src/mocks/uploadthing";
import sharp from "sharp";
import { UTApi } from "uploadthing/server";

const getUTApi = () => {
  if (process.env.USE_MOCK_DATA === "true") {
    return MOCK_UTAPI;
  }
  return new UTApi();
};
const utApi = getUTApi();

const getFileKeyFromUrl = (url: string) => {
  if (!url || !url.includes("ufs.sh/f/")) return null;
  return url.split("ufs.sh/f/")[1];
};

export const uploadImages = async (
  file: File,
  userId: string,
  oldAvatarUrl: string | null,
): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const optimizedImage = await sharp(buffer)
    .resize({ width: 500, height: 500, fit: "cover" })
    .webp({ quality: 80 })
    .toBuffer();

  const uint8Array = new Uint8Array(optimizedImage);

  const optimizedFile = new File([uint8Array], `avatar-${userId}.webp`, {
    type: "image/webp",
  });

  const response = await utApi.uploadFiles(optimizedFile);

  if (response.error) {
    throw new Error(`Erreur lors de l'upload: ${response.error.message}`);
  }

  if (oldAvatarUrl) {
    const oldFileKey = getFileKeyFromUrl(oldAvatarUrl);
    if (oldFileKey) {
      try {
        await utApi.deleteFiles(oldFileKey);
        console.log(`Avatar supprimé de UploadThing : ${oldFileKey}`);
      } catch (error) {
        console.error("Impossible de supprimer l'ancien avatar:", error);
      }
    }
  }

  return response.data.ufsUrl;
};
