import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import bcrypt from "bcrypt";
import { ResponseProps } from "@/network/services/api-handler";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<null>>
) {
  if (req.method !== METHOD.POST) {
    return res.status(STATUS_CODE.INVALID_METHOD).json({
      code: STATUS_CODE.INVALID_METHOD,
      data: null,
      msg: "Invalid method",
    });
  }

  const { name, email, password } = req.body;

  try {
    const findExisted = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (findExisted !== null) {
      return res.status(STATUS_CODE.CONFLICT).json({
        code: STATUS_CODE.CONFLICT,
        data: null,
        msg: "Email đã được sử dụng",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        role: "USER",
        password: encryptedPassword,
      },
    });
    return res.status(STATUS_CODE.CREATED).json({
      code: STATUS_CODE.CREATED,
      data: null,
      msg: "Đăng ký thành công",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
