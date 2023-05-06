import { ResponseProps } from '@/network/services/api-handler'
import { API, METHOD } from '../../const/app-const'
import { localToken } from '@/ultis/useActor'
import { CourseProps } from '@/entities/course.entities'

async function CreateCourseApi(
  data: CourseProps
): Promise<ResponseProps<string | null>> {
  const url = `${API}/course`
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

async function SearchCourseApi(): Promise<ResponseProps<CourseProps[]>> {
  // params: string
  const url = `${API}/course/search`
  const response = await fetch(url, {
    method: METHOD.GET
  })
  const result = await response.json()
  return result
}

async function GetCourseByIdApi(
  id: string
): Promise<ResponseProps<CourseProps>> {
  const url = `${API}/course/id=${id}`
  const response = await fetch(url, {
    method: METHOD.GET
  })
  const result = await response.json()
  return result
}

async function EditCourseApi(
  payload: CourseProps
): Promise<ResponseProps<null>> {
  const url = `${API}/course`
  const response = await fetch(url, {
    method: METHOD.PATCH
  })
  const result = await response.json()
  return result
}

export { CreateCourseApi, GetCourseByIdApi, SearchCourseApi, EditCourseApi }
