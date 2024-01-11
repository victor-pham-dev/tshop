import { BaseService } from "@/@App/Core/service/BaseService";
import { SYSTEM_CATEGORY_FILTER } from "../configs/api";


class CategoryFilter extends BaseService {

}
export const systemDetailCategoryFilterService = new CategoryFilter(SYSTEM_CATEGORY_FILTER.endpoint)