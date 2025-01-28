import { deleteCookie } from "cookies-next";
import { useUserStore } from "@/store/user-store";

export const useSignout = () => {
  const clearUser = useUserStore((state) => state.clearUser);

  const signout = () => {
    deleteCookie("auth-token");
    clearUser();
    window.location.href = "/login";
  };

  return { signout };
};
