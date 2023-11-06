import { BaseService } from '@/@App/@Core/service/BaseService'
import { BANNER_API } from '../configs/api'

class Banner extends BaseService {}
export const bannerService = new Banner(BANNER_API.endpoint)
