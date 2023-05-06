import { ClassProps } from './class.entities'
import { RegisClassProps } from './regisClass.entities'

export interface StudentProps {
  _id?: string
  regisId: string
  deleted?: Boolean
  classId: string
  createdAt?: string
  updatedAt?: string
  classInfo?: ClassProps[]
  regisInfo?: RegisClassProps[]
}
