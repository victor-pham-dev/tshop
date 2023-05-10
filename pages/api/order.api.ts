import {
  PagingResponseProps,
  ResponseProps,
} from "@/network/services/api-handler";
import { METHOD } from "../../const/app-const";
import { Order } from "@prisma/client";
import { localToken } from "@/ultis/useActor";
import { ConfirmOrderProps } from "./order/confirm";
import { MarkShippingOrderProps } from "./order/markshipping";
import { MarkDoneOrderProps } from "./order/markdone";
import { MarkCancelOrderProps } from "./order/cancel";

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
export interface SearchOrderParamsProps {
  page?: number;
  pageSize: number;
  status?: string;
}
async function SearchOrdertApi(
  params: string
): Promise<ResponseProps<PagingResponseProps<Order> | null>> {
  const url = `/api/order/search?${params}`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localToken ?? "",
    },
  });
  const result = await response.json();
  return result;
}

async function MarkShippingOrderApi(
  data: MarkShippingOrderProps
): Promise<ResponseProps<null>> {
  const url = `/api/order/markshipping`;
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

async function MarkDoneOrderApi(
  data: MarkDoneOrderProps
): Promise<ResponseProps<null>> {
  const url = `/api/order/markdone`;
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

async function CancelOrderApi(
  data: MarkCancelOrderProps
): Promise<ResponseProps<null>> {
  const url = `/api/order/cancel`;
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

async function ConfirmOrderApi(
  data: ConfirmOrderProps
): Promise<ResponseProps<null>> {
  const url = `/api/order/confirm`;
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
async function GetAllOrderApi(): Promise<ResponseProps<Order[] | null>> {
  const url = `/api/order/all`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localToken ?? "",
    },
  });
  const result = await response.json();
  return result;
}
export {
  CreateOrderApi,
  GetInfoOrderByIdApi,
  GetMyOrdersApi,
  SearchOrdertApi,
  ConfirmOrderApi,
  MarkShippingOrderApi,
  MarkDoneOrderApi,
  CancelOrderApi,
  GetAllOrderApi,
};
