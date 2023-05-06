import { CLASS_LEVEL } from '@/const/app-const'

export interface QuestionProps {
  _id?: string
  question: string
  answers: string[]
  level: CLASS_LEVEL
  deleted?: Boolean
  createdAt?: string
  updatedAt?: string
}
