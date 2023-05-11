import React, { ReactNode, useCallback, useEffect } from "react";
import { PATH, STATUS_CODE, STORAGE_KEY } from "../../const/app-const";
import { useLoading, useUser } from "../../hooks";
import { AuthenApi } from "../../pages/api/user.api";
import { useRouter } from "next/router";
import { checkRes } from "@/network/services/api-handler";
import { GetMyCartApi } from "@/pages/api/cart.api";
import { useCart } from "@/hooks/useAppContext";
import { message } from "antd";
interface Props {
  children: ReactNode;
}

const Auth: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { user, update, reset } = useUser();
  const { updateAll } = useCart();
  const { setIsLoading } = useLoading();
  const localToken =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem(STORAGE_KEY.LOCAL_USER)
      : null;

  async function getUserCart(token: string) {
    setIsLoading(true);
    const result = await GetMyCartApi(token);
    if (result.code === STATUS_CODE.OK) {
      updateAll(result.data ?? []);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  const authChecker = useCallback(
    async (token: string) => {
      const result = await AuthenApi(token);
      checkRes(
        result,
        () => {
          update({ ...result.data, token });
          getUserCart(token);
          if (currentPath === `/${PATH.LOGIN}`) {
            router.push(`/`);
            // message.info(`Chào mừng quý khách`)
          }
        },
        () => {
          reset();
          router.push(`/${PATH.LOGIN}`);
        },
        () => setIsLoading(false)
      );
    },
    [router, reset, update, currentPath]
  );

  useEffect(() => {
    if (!user.id && localToken) {
      setIsLoading(true);
      authChecker(localToken);
    }
  }, [user, localToken, authChecker]);

  return <React.Fragment>{children}</React.Fragment>;
};

export { Auth };
