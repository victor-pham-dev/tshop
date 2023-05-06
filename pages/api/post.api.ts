import {
  PagingResponseProps,
  ResponseProps
} from '@/network/services/api-handler'
import { API, METHOD, POST_TYPE } from '../../const/app-const'
import { localToken } from '@/ultis/useActor'
import { PostProps } from '@/entities/post.entities'

async function CreatePostApi(
  data: PostProps
): Promise<ResponseProps<string | null>> {
  const url = `${API}/post`
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

async function SearchPostApi(
  params: string
): Promise<ResponseProps<PagingResponseProps<PostProps> | null>> {
  const url = `${API}/post/search?${params}`
  const response = await fetch(url, {
    method: METHOD.GET
  })
  const result = await response.json()
  return result
}

async function GetPostByIdApi(
  id: string
): Promise<ResponseProps<PostProps | null>> {
  const url = `${API}/post/id=${id}`
  const response = await fetch(url, {
    method: METHOD.GET
  })
  const result = await response.json()
  return result
}

async function GetRelatedPostApi(
  curentId: string,
  type: POST_TYPE
): Promise<ResponseProps<PostProps[]>> {
  const url = `${API}/post/related?currentId=${curentId}&type=${type}`
  const response = await fetch(url, {
    method: METHOD.GET
  })
  const result = await response.json()
  return result
}

export { CreatePostApi, SearchPostApi, GetPostByIdApi, GetRelatedPostApi }
