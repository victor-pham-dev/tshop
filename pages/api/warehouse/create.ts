import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";
import { WarehouseImport } from "@prisma/client";

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
  const tokenValid = AuthToken(req, res, "ADMIN");
  if (!tokenValid.pass) {
    return;
  }
  const payload = req.body as WarehouseImport;
  try {
    await prisma.warehouseImport.create({
      data: payload,
    });

    await prisma.classification.update({
      where: { id: payload.classificationId },
      data: {
        quantity: { increment: payload.quantity },
      },
    });
    const statistic = await prisma.sellstatistic.findFirst({
      where: { classificationId: payload.classificationId },
    });

    if (statistic === null) {
      await prisma.sellstatistic.create({
        data: {
          importQuantity: payload.quantity,
          importAveragePrice: payload.importPrice,
          sellAveragePrice: 0,
          sellQuantity: 0,
          classificationId: payload.classificationId,
          productId: payload.productId,
        },
      });
    } else {
      const newQuantity = statistic.importQuantity + payload.quantity;
      const newAverage =
        (statistic.importAveragePrice * statistic.importQuantity +
          payload.quantity * payload.importPrice) /
        newQuantity;
      await prisma.sellstatistic.update({
        where: { id: statistic.id },
        data: {
          importQuantity: newQuantity,
          importAveragePrice: newAverage,
        },
      });
    }
    return res.status(STATUS_CODE.CREATED).json({
      code: STATUS_CODE.CREATED,
      data: null,
      msg: "Thêm thành công",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
