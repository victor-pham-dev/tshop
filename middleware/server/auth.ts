import { STATUS_CODE, TOKEN_KEY } from "@/const/app-const";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

//types
export interface DecodedTokenProps {
  email: string;
  role: "USER" | "ADMIN";
  id: string;
  iat: number;
  exp: number;
}

interface ResultProps {
  pass: Boolean;
  data: DecodedTokenProps;
}

export function AuthToken(
  req: NextApiRequest,
  res: NextApiResponse,
  role: "USER" | "ADMIN"
): ResultProps {
  let pass = true;
  const token = req.headers["x-access-token"] as string | undefined;
  let sentResponse = false;
  try {
    const user = jwt.verify(token ?? "", TOKEN_KEY) as DecodedTokenProps;
    if (role === "ADMIN" && user.role !== "ADMIN") {
      res.status(STATUS_CODE.MISSING_TOKEN).json({
        code: STATUS_CODE.AUTH_FAILED,
        data: null,
        msg: "Không có quyền",
      });
      sentResponse = true;
      pass = false;
    }

    return {
      pass,
      data: user,
    };
  } catch (error) {
    if (!sentResponse) {
      res.status(STATUS_CODE.AUTH_FAILED).json({
        code: STATUS_CODE.AUTH_FAILED,
        data: null,
        msg: "Hết phiên sử dụng",
      });
    }
    return {
      pass: false,
      data: {} as DecodedTokenProps,
    };
  }
}
