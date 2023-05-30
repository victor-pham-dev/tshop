import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<null>>
) {
  if (req.method !== METHOD.DELETE) {
    return res.status(STATUS_CODE.INVALID_METHOD).json({
      code: STATUS_CODE.INVALID_METHOD,
      data: null,
      msg: "Invalid method",
    });
  }
  const tokenValid = AuthToken(req, res, "ADMIN");
  if (!tokenValid.pass) {
    return;
  }

  const productId = req.query.id as string;
  try {
    await prisma.product.delete({ where: { id: productId } });
    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: null,
      msg: "Đã xoá",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
