import { ResponseProps } from "@/network/services/api-handler";
import { METHOD } from "@/const/app-const";
import { SearchWarrantyResultProps } from "./warranty";

async function GetMyWarrantyList(
  token: string
): Promise<ResponseProps<SearchWarrantyResultProps[] | null>> {
  const url = `/api/warranty`;
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      "x-access-token": token,
    },
  });
  const result = await response.json();
  return result;
}

export { GetMyWarrantyList };
