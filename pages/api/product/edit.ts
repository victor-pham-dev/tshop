import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<null>>
) {
  if (req.method !== METHOD.PATCH) {
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

  const payload = req.body as Product;
  try {
    await prisma.product.update({
      where: { id: payload.id },
      data: {
        name: payload.name,
        status: payload.status,
        category: payload.category,
        images: payload.images.toString().split(","),
        description: payload.description,
      },
    });

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: null,
      msg: "Cập nhật sản phẩm thành công",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
