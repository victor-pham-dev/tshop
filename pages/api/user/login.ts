import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE, TOKEN_KEY } from "@/const/app-const";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResponseProps } from "@/network/services/api-handler";
import { prisma } from "@/lib/prisma";

interface ResProps {
  accessToken: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<ResProps | null>>
) {
  if (req.method !== METHOD.POST) {
    return res.status(STATUS_CODE.INVALID_METHOD).json({
      code: STATUS_CODE.INVALID_METHOD,
      data: null,
      msg: "Invalid method",
    });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(STATUS_CODE.FAILED).json({
        code: STATUS_CODE.FAILED,
        data: null,
        msg: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
    const comparePassword = bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(STATUS_CODE.FAILED).json({
        code: STATUS_CODE.FAILED,
        data: null,
        msg: "Mật khẩu không chính xác",
      });
    }

    const accessToken = jwt.sign(
      { email: email, role: user.role, id: user.id },
      TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );

    return res
      .status(STATUS_CODE.OK)
      .json({ code: STATUS_CODE.OK, data: { accessToken }, msg: "Thành công" });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
