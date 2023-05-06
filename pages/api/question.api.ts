import {
  PagingResponseProps,
  ResponseProps
} from '@/network/services/api-handler'
import { API, CLASS_LEVEL, METHOD, REGIS_STATUS } from '../../const/app-const'
import { RegisClassProps } from '@/entities/regisClass.entities'
import { localToken } from '@/ultis/useActor'
import { QuestionProps } from '@/entities/question.entites'

async function CreateQuestionApi(
  data: QuestionProps
): Promise<ResponseProps<string | null>> {
  const url = `${API}/question`
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

// export interface updateStatusProps {
//   _id: string
//   status:
//     | REGIS_STATUS.INIT
//     | REGIS_STATUS.CHECKED
//     | REGIS_STATUS.CONFIRMED
//     | REGIS_STATUS.CANCELED
// }
// async function UpdateStatusRegisClassApi(
//   data: updateStatusProps
// ): Promise<ResponseProps<string | null>> {
//   const url = `${API}/regis-class`
//   const response = await fetch(url, {
//     method: METHOD.PUT,
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': localToken ?? ''
//     },
//     body: JSON.stringify(data)
//   })
//   const result = await response.json()
//   return result
// }

// async function DeleteRegisClassApi(id: string): Promise<ResponseProps<null>> {
//   const url = `${API}/regis-class/${id}`
//   const response = await fetch(url, {
//     method: METHOD.DELETE,
//     headers: {
//       'x-access-token': localToken ?? ''
//     }
//   })
//   const result = await response.json()
//   return result
// }

export interface getQuestionParamsProps {
  level?: CLASS_LEVEL
  quantity: number
}

async function GetTestQuestionApi(
  params: string
): Promise<ResponseProps<QuestionProps[]>> {
  const url = `${API}/question/test?${params}`
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

export { CreateQuestionApi, GetTestQuestionApi }
