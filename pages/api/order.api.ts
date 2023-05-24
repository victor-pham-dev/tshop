import {
  PagingResponseProps,
  ResponseProps,
} from "@/network/services/api-handler";
import { METHOD } from "../../const/app-const";
import { Order } from "@prisma/client";
import { ConfirmOrderProps } from "./order/confirm";
import { MarkShippingOrderProps } from "./order/markshipping";
import { MarkDoneOrderProps } from "./order/markdone";
import { MarkCancelOrderProps } from "./order/cancel";
import { adminCreateOrderProps } from "./order/admincreate";

async function CreateOrderApi(
  data: Order,
  token: string
): Promise<ResponseProps<string | null>> {
  const url = `/api/order/create`;
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

async function AdminCreateOrderApi(
  data: adminCreateOrderProps,
  token: string
): Promise<ResponseProps<string | null>> {
  const url = `/api/order/admincreate`;
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

async function GetMyOrdersApi(
  token: string
): Promise<ResponseProps<Order[] | null>> {
  const url = `/api/order/myorder`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "x-access-token": token,
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
  params: string,
  token: string
): Promise<ResponseProps<PagingResponseProps<Order> | null>> {
  const url = `/api/order/search?${params}`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  const result = await response.json();
  return result;
}

async function MarkShippingOrderApi(
  data: MarkShippingOrderProps,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/order/markshipping`;
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

async function MarkDoneOrderApi(
  data: MarkDoneOrderProps,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/order/markdone`;
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

async function CancelOrderApi(
  data: MarkCancelOrderProps,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/order/cancel`;
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

async function ConfirmOrderApi(
  data: ConfirmOrderProps,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/order/confirm`;
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}
async function GetAllOrderApi(
  token: string
): Promise<ResponseProps<Order[] | null>> {
  const url = `/api/order/all`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  const result = await response.json();
  return result;
}
export {
  CreateOrderApi,
  AdminCreateOrderApi,
  GetInfoOrderByIdApi,
  GetMyOrdersApi,
  SearchOrdertApi,
  ConfirmOrderApi,
  MarkShippingOrderApi,
  MarkDoneOrderApi,
  CancelOrderApi,
  GetAllOrderApi,
};
