export interface ResponseProps<p> {
  code?: number;
  msg: string;
  data: p;
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
