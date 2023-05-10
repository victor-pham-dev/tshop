import { NotFoundPage } from "@/components/notFoundPage/NotFoundPage";
import { PATH, ROLE } from "@/const/app-const";
import { useUser } from "@/hooks";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
interface ProtectPageProps {
  role: ROLE;
  children: ReactNode;
}
export function ProtectPage({ role, children }: ProtectPageProps): JSX.Element {
  const [allow, setAllow] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    if (user.role !== undefined && user.role <= role) {
      return setAllow(true);
    } else {
      setAllow(false);
    }
  }, [user]);
  return (
    <React.Fragment>
      {allow ? (
        <>{children}</>
      ) : (
        <Link href={`/${PATH.LOGIN}`}>
          <h3 style={{ textAlign: "center" }}>Click để đăng nhập</h3>
        </Link>
      )}
    </React.Fragment>
  );
}
