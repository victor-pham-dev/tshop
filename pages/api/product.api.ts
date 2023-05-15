import {
  PagingResponseProps,
  ResponseProps,
} from "@/network/services/api-handler";
import { METHOD } from "../../const/app-const";
import { Classification, Product } from "@prisma/client";
import { ProductWithClassifyProps } from "@/contexts/CartContext";

async function CreateProductApi(
  data: Product,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/product/create`;
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

async function EditProductApi(
  data: Product,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/product/edit`;
  const response = await fetch(url, {
    method: METHOD.PATCH,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

async function CreateClassifyProductApi(
  data: Classification,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/product/classify/create`;
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

async function EditClassifyProductApi(
  data: Classification,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/product/classify/edit`;
  const response = await fetch(url, {
    method: METHOD.PATCH,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token ?? "",
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
): Promise<
  ResponseProps<PagingResponseProps<ProductWithClassifyProps> | null>
> {
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

async function DeleteProductApi(
  id: string,
  token: string
): Promise<ResponseProps<null>> {
  const url = `/api/product/delete?${id}`;
  const response = await fetch(url, {
    method: METHOD.DELETE,
    headers: {
      "x-access-token": token,
    },
  });
  const result = await response.json();
  return result;
}

export interface ClassifyProps {
  classifications: Classification[];
}
async function GetInfoProductByIdApi(
  id: string
): Promise<ResponseProps<Product & ClassifyProps>> {
  const url = `/api/product/info?id=${id}`;
  const response = await fetch(url, {
    method: METHOD.GET,
  });
  const result = await response.json();
  return result;
}

async function GetRelatedProductByIdApi(
  id: string
): Promise<ResponseProps<ProductWithClassifyProps[]>> {
  const url = `/api/product/related?id=${id}`;
  const response = await fetch(url, {
    method: METHOD.GET,
  });
  const result = await response.json();
  return result;
}

async function GetAllProductApi(
  token: string
): Promise<ResponseProps<ProductWithClassifyProps[] | null>> {
  const url = `/api/product/all`;
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
  CreateProductApi,
  EditProductApi,
  CreateClassifyProductApi,
  EditClassifyProductApi,
  SearchProductApi,
  DeleteProductApi,
  GetInfoProductByIdApi,
  GetRelatedProductByIdApi,
  GetAllProductApi,
};
