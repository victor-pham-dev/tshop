import { POST_STATUS } from '@/const/app-const'

export interface PostProps {
  _id?: string
  title: string
  type: string
  cardImg: string
  author: {
    id: string
    name: string
  }
  content: string
  status: POST_STATUS
  deleted?: Boolean
  createdAt?: string
  updatedAt?: string
}
