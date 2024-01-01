import { BaseService } from '@/@App/Core/service/BaseService'
import { SYSTEM_BANNER_API } from '../configs/api'

class Banner extends BaseService {}
export const bannerService = new Banner(SYSTEM_BANNER_API.endpoint)
