import { useMediaStore } from "@/src/features/media/media.store";
import { useUserStore } from "@/src/features/user/user.store";
import { signOut } from "@/src/lib/client";

export const handleSignOut = async () => {
  try {
    await signOut();
  } finally {
    useUserStore.getState().reset();
    useMediaStore.getState().reset();
  }
};
