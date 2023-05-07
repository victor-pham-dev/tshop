import axios, { AxiosResponse } from "axios";
import { METHOD, STORAGE_KEY } from "../../const/app-const";

interface headerProps {
  "Content-Type"?: string;
  "X-Access-Token"?: string;
}

export interface ResponseProps<p> {
  code: number;
  msg: string;
  data: p;
}
interface apihanlderProps extends headerProps {
  url: string;
  method: METHOD.GET | METHOD.POST | METHOD.PATCH | METHOD.PUT | METHOD.DELETE;
  token?: string;
  data?: any;
}
interface headersProps {
  "x-access-token"?: string;
  "Content-Type": "application/json";
}
export async function apiHandler<T>({
  url,
  method,
  data,
}: apihanlderProps): Promise<ResponseProps<T>> {
  const headers: headersProps = {
    "Content-Type": "application/json",
  };

  headers["x-access-token"] =
    window.sessionStorage.getItem(STORAGE_KEY.LOCAL_USER) ?? "";

  try {
    //console.log(headers)
    const response: AxiosResponse = await axios({
      method: method,
      url: url,
      data: JSON.stringify(data) ?? undefined,
      headers: { ...headers },
    });
    if (response) {
      return response.data;
    } else {
      throw new Error("no response - sender: `api-handler.ts`");
    }
  } catch (error: any) {
    return error;
  }
}

import { RESPONSE_CODE } from "../../const/app-const";

export interface PagingResponseProps<T> {
  dataTable: T[];
  paging: { page: number; pageSize: number };
  totalCount: number;
}

export function checkRes(
  response: { code: number; msg: string; data: any } | null,
  success: (props?: any) => void,
  failed: (props?: any) => void,
  always: (props?: any) => void
) {
  setTimeout(() => {
    if (
      (response !== null && response.code === RESPONSE_CODE.CREATED) ||
      (response !== null && response.code === RESPONSE_CODE.OK)
    ) {
      if (response.data && response.data !== null) {
        success();
      }
    } else {
      failed();
    }
    always();
  }, 1000);
}
