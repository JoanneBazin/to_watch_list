import { useMediaStore } from "../features/media/media.store";
import { useUserStore } from "../features/user/user.store";
import { signOut } from "../lib/auth-client";

export const handleSignOut = async () => {
  try {
    await signOut();
  } finally {
    useUserStore.getState().reset();
    useMediaStore.getState().reset();
  }
};
