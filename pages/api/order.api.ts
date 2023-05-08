import { ResponseProps } from "@/network/services/api-handler";
import { METHOD } from "../../const/app-const";
import { Order } from "@prisma/client";
import { localToken } from "@/ultis/useActor";

async function CreateOrderApi(
  data: Order
): Promise<ResponseProps<string | null>> {
  const url = `/api/order/create`;
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localToken ?? "",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

// export interface UpdateCartItemProps {
//   id: string;
//   quantity: number;
// }
// async function UpdateCartItemApi(
//   data: UpdateCartItemProps
// ): Promise<ResponseProps<null>> {
//   const url = `/api/cart/update`;
//   const response = await fetch(url, {
//     method: METHOD.PATCH,
//     headers: {
//       "Content-Type": "application/json",
//       "x-access-token": localToken ?? "",
//     },
//     body: JSON.stringify(data),
//   });
//   const result = await response.json();
//   return result;
// }

// async function DeleteCartItemApi(id: string): Promise<ResponseProps<null>> {
//   const url = `/api/cart/delete?id=${id}`;
//   const response = await fetch(url, {
//     method: METHOD.DELETE,
//     headers: {
//       "x-access-token": localToken ?? "",
//     },
//   });
//   const result = await response.json();
//   return result;
// }

async function GetMyOrdersApi(): Promise<ResponseProps<Order[] | null>> {
  const url = `/api/order/myorder`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "x-access-token": localToken ?? "",
    },
  });
  const result = await response.json();
  return result;
}

async function GetInfoOrderByIdApi(
  id: string,
  token: string
): Promise<ResponseProps<Order | null>> {
  const url = `/api/order/info?id=${id}`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "x-access-token": token,
    },
  });
  const result = await response.json();
  return result;
}

export { CreateOrderApi, GetInfoOrderByIdApi, GetMyOrdersApi };
