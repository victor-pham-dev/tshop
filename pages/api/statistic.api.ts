import { METHOD } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { localToken } from "@/ultis/useActor";
import { StatisticProps } from "./sellstatistic/all";

async function GetAllStatisticApi(): Promise<
  ResponseProps<StatisticProps[] | null>
> {
  const url = `/api/sellstatistic/all`;
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

export { GetAllStatisticApi };
