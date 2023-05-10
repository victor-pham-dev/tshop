import { ResponseProps } from "@/network/services/api-handler";
import { METHOD } from "../../const/app-const";
import { localToken } from "@/ultis/useActor";
import { WarehouseImport } from "@prisma/client";
import { WarehouseBillProps } from "./warehouse/all";

async function CreateWarehouseImportApi(
  data: WarehouseImport
): Promise<ResponseProps<string | null>> {
  const url = `/api/warehouse/create`;
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

async function GetWarehouseImportBillsApi(): Promise<
  ResponseProps<WarehouseBillProps[] | null>
> {
  const url = `/api/warehouse/all`;
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

export { CreateWarehouseImportApi, GetWarehouseImportBillsApi };
