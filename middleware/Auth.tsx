import React, { ReactNode, useCallback, useEffect } from "react";
import { PATH, STORAGE_KEY } from "../const/app-const";
import { useLoading, useUser } from "../hooks";
import { AuthenApi } from "../pages/api/user.api";
import { useActor } from "../ultis/useActor";
import { useRouter } from "next/router";
import { checkRes } from "@/network/services/api-handler";
interface Props {
  children: ReactNode;
}

const Auth: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const actor = useActor();
  const { user, update, reset } = useUser();
  const { setIsLoading } = useLoading();
  const localToken =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem(STORAGE_KEY.LOCAL_USER)
      : null;
  const authChecker = useCallback(
    async (token: string) => {
      const result = await AuthenApi(token);
      checkRes(
        result,
        () => {
          update({ ...result.data, token });
          if (currentPath === `/${PATH.LOGIN}`) {
            router.push(`/`);
          }
        },
        () => {
          reset();
          router.push(`/${PATH.LOGIN}`);
        },
        () => setIsLoading(false)
      );
    },
    [actor, router, reset, update, currentPath]
  );

  useEffect(() => {
    if (!user._id && localToken) {
      setIsLoading(true);
      authChecker(localToken);
    }
  }, [user, localToken, authChecker]);

  return <React.Fragment>{children}</React.Fragment>;
};

export { Auth };
