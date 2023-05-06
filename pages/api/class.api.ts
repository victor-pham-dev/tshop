import {
  PagingResponseProps,
  ResponseProps
} from '@/network/services/api-handler'
import { API, CLASS_LEVEL, METHOD } from '../../const/app-const'
import { ClassProps } from '@/entities/class.entities'
import { localToken } from '@/ultis/useActor'

export interface CreatePostDto {
  title: string
  type: string
  content: string
}

//class
export interface CreateClassDto {
  classLevel:
    | CLASS_LEVEL.N1
    | CLASS_LEVEL.N2
    | CLASS_LEVEL.N3
    | CLASS_LEVEL.N4
    | CLASS_LEVEL.N5
  numberOfStudents: number
  cardImg: string
  schedule: any
  time: any
  description: string
  creatorId: string
  teacher?: string
}

async function CreateClassApi(
  data: CreateClassDto
): Promise<ResponseProps<string | null>> {
  const url = `${API}/class`
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localToken ?? ''
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}

async function SearchClassApi(
  params: string
): Promise<ResponseProps<PagingResponseProps<ClassProps> | null>> {
  const url = `${API}/class/search?${params}`
  const response = await fetch(url, {
    method: METHOD.GET
  })
  const result = await response.json()
  return result
}

async function GetClassByIdApi(
  id: string
): Promise<ResponseProps<ClassProps | null>> {
  const url = `${API}/class/id=${id}`
  const response = await fetch(url, {
    method: METHOD.GET
  })
  const result = await response.json()
  return result
}

export { CreateClassApi, SearchClassApi, GetClassByIdApi }
