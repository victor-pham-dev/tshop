import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import {
  PagingResponseProps,
  ResponseProps,
} from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<PagingResponseProps<Order> | null>>
) {
  if (req.method !== METHOD.GET) {
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

  const { status, page = 1, pageSize = 10 } = req.query;

  try {
    const [orders, total] = await Promise.all([
      await prisma.order.findMany({
        where: {
          status: status?.toString(),
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      }),
      prisma.order.count({
        where: {
          status: status?.toString(),
        },
      }),
    ]);

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: {
        dataTable: orders,
        paging: {
          page: Number(page),
          pageSize: Number(pageSize),
        },
        totalCount: total,
      },
      msg: "OK",
    });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL).json({
      code: STATUS_CODE.INTERNAL,
      data: null,
      msg: "Internal server error",
    });
  }
}
