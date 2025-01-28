import Cookies from "js-cookie";
import { useUserStore } from "@/store/user-store";

export const useSignout = () => {
  const clearUser = useUserStore((state) => state.clearUser);

  const signout = () => {
    Cookies.remove("auth-token");

    clearUser();

    window.location.href = "/login";
  };

  return { signout };
};
