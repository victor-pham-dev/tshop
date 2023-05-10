import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<Product | null>>
) {
  if (req.method !== METHOD.GET) {
    return res.status(STATUS_CODE.INVALID_METHOD).json({
      code: STATUS_CODE.INVALID_METHOD,
      data: null,
      msg: "Invalid method",
    });
  }
  const { id } = req.query;
  try {
    const product = await prisma.product.findUnique({
      where: { id: id?.toString() },
      include: {
        classifications: true,
      },
    });

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: product,
      msg: "ok",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
