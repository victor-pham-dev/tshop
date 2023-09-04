import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import bcrypt from "bcrypt";
import { ResponseProps } from "@/network/services/api-handler";
import { prisma } from "@/services/prisma";
import { AuthToken } from "@/middleware/server/auth";

interface PayloadProps {
  token: string;
  newPassword: string;
}

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
  const tokenValid = AuthToken(req, res, "USER");
  if (!tokenValid.pass) {
    return;
  }

  const { newPassword } = req.body as PayloadProps;

  try {
    const encryptPw = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: {
        email: tokenValid.data.email,
      },
      data: {
        password: encryptPw,
      },
    });
    return res
      .status(STATUS_CODE.OK)
      .json({ code: STATUS_CODE.OK, data: null, msg: "Thành công" });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
