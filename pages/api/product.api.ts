import {
  PagingResponseProps,
  ResponseProps,
} from "@/network/services/api-handler";
import { METHOD } from "../../const/app-const";
import { Classification, Product } from "@prisma/client";
import { localToken } from "@/ultis/useActor";

async function CreateProductApi(data: Product): Promise<ResponseProps<null>> {
  const url = `/api/product/create`;
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

export interface SearchProductParamsProps {
  page?: number;
  pageSize: number;
  name?: string;
}

async function SearchProductApi(
  params: string
): Promise<ResponseProps<PagingResponseProps<Product> | null>> {
  const url = `/api/product/search?${params}`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

async function DeleteProductApi(id: string): Promise<ResponseProps<null>> {
  const url = `/api/product/delete?${id}`;
  const response = await fetch(url, {
    method: METHOD.DELETE,
    headers: {
      "x-access-token": localToken ?? "",
    },
  });
  const result = await response.json();
  return result;
}

interface ClassifyProps {
  classifications: Classification[];
}
async function GetInfoProductByIdApi(
  id: string
): Promise<ResponseProps<Product & ClassifyProps>> {
  const url = `/api/product/info?id=${id}`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "x-access-token": localToken ?? "",
    },
  });
  const result = await response.json();
  return result;
}

export {
  CreateProductApi,
  SearchProductApi,
  DeleteProductApi,
  GetInfoProductByIdApi,
};
