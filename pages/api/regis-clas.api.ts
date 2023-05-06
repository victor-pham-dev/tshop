import {
  PagingResponseProps,
  ResponseProps
} from '@/network/services/api-handler'
import { API, CLASS_LEVEL, METHOD, REGIS_STATUS } from '../../const/app-const'
import { RegisClassProps } from '@/entities/regisClass.entities'
import { localToken } from '@/ultis/useActor'

export interface CreatePostDto {
  title: string
  type: string
  content: string
}

export interface CreateRegisClassDto {
  name: string
  phone: string
  address: string
  email: string
  facebookLink: string
  method: 0
  classLevel: CLASS_LEVEL
  knowFrom: string
  everStudied: Boolean
  leanTo: string
  note: string
  userId: string
  classId: string
}

async function CreateRegisClassApi(
  data: CreateRegisClassDto
): Promise<ResponseProps<string | null>> {
  const url = `${API}/regis-class`
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}

export interface updateStatusProps {
  _id: string
  status:
    | REGIS_STATUS.INIT
    | REGIS_STATUS.CHECKED
    | REGIS_STATUS.CONFIRMED
    | REGIS_STATUS.CANCELED
}
async function UpdateStatusRegisClassApi(
  data: updateStatusProps
): Promise<ResponseProps<string | null>> {
  const url = `${API}/regis-class`
  const response = await fetch(url, {
    method: METHOD.PUT,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localToken ?? ''
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}

async function DeleteRegisClassApi(id: string): Promise<ResponseProps<null>> {
  const url = `${API}/regis-class/${id}`
  const response = await fetch(url, {
    method: METHOD.DELETE,
    headers: {
      'x-access-token': localToken ?? ''
    }
  })
  const result = await response.json()
  return result
}

export interface SearchRegisClassParamsProps {
  page: number
  pageSize: number
  status?: REGIS_STATUS
}

async function SearchRegisClassApi(
  params: string
): Promise<ResponseProps<PagingResponseProps<RegisClassProps> | null>> {
  const url = `${API}/regis-class/search?${params}`
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localToken ?? ''
    }
  })
  const result = await response.json()
  return result
}

export {
  CreateRegisClassApi,
  SearchRegisClassApi,
  DeleteRegisClassApi,
  UpdateStatusRegisClassApi
}
