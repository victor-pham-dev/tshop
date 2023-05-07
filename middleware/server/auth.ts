import { STATUS_CODE, TOKEN_KEY } from "@/const/app-const";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

//types
export interface DecodedTokenProps {
  email: string;
  role: "USER" | "ADMIN";
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
  let data: DecodedTokenProps = {} as DecodedTokenProps;
  const token = req.headers["x-access-token"] as string | undefined;
  if (!token) {
    res.status(STATUS_CODE.MISSING_TOKEN).json({
      code: STATUS_CODE.MISSING_TOKEN,
      data: null,
      msg: "Hết phiên sử dụng, vui lòng đăng nhập lại",
    });
    pass = false;
  }
  //decode and check role
  try {
    if (token !== undefined) {
      const user = jwt.verify(token, TOKEN_KEY) as DecodedTokenProps;

      if (role === "ADMIN" && user.role !== "ADMIN") {
        res.status(STATUS_CODE.MISSING_TOKEN).json({
          code: STATUS_CODE.AUTH_FAILED,
          data: null,
          msg: "Không có quyền",
        });
        pass = false;
      }

      return {
        pass,
        data: user,
      };
    } else {
      return {
        pass: false,
        data: {} as DecodedTokenProps,
      };
    }
  } catch (error) {
    res.status(STATUS_CODE.AUTH_FAILED).json({
      code: STATUS_CODE.AUTH_FAILED,
      data: null,
      msg: "Hết phiên sử dụng",
    });
    return {
      pass: false,
      data: {} as DecodedTokenProps,
    };
  }
}
