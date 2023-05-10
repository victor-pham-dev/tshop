// import { NextApiRequest, NextApiResponse } from "next";
// import { METHOD, ORDER_STATUS, STATUS_CODE } from "@/const/app-const";
// import { ResponseProps } from "@/network/services/api-handler";
// import { prisma } from "@/lib/prisma";
// import {
//   Classification,
//   Order,
//   Product,
//   WarehouseImport,
//   Warranty,
// } from "@prisma/client";

// export interface SearchWarrantyResultProps extends Warranty {
//   Order: Order | null;
//   Product: Product | null;
//   Classification: Classification | null;
// }
// export interface WarehouseBillProps extends WarehouseImport {
//   Classification: Classification | null;
//   Product: Product | null;
// }
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseProps<SearchWarrantyResultProps[] | null>>
// ) {
//   if (req.method !== METHOD.GET) {
//     return res.status(STATUS_CODE.INVALID_METHOD).json({
//       code: STATUS_CODE.INVALID_METHOD,
//       data: null,
//       msg: "Invalid method",
//     });
//   }
//   const { phone } = req.query;
//   try {
//     const result = await prisma.warranty.findMany({
//       where: { phone: phone?.toString() },
//       include: {
//         Order: { select: { createdAt: true } },
//         Product: true,
//         Classification: true,
//       },
//       orderBy: { startedAt: "desc" },
//     });

//     return res.status(STATUS_CODE.OK).json({
//       code: STATUS_CODE.OK,
//       //   data: result,
//       msg: "ok",
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(STATUS_CODE.INTERNAL)
//       .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
//   }
// }
