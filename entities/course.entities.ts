import { CLASS_LEVEL } from '@/const/app-const'

export interface CourseProps {
  _id?: string
  level:
    | CLASS_LEVEL.N1
    | CLASS_LEVEL.N2
    | CLASS_LEVEL.N3
    | CLASS_LEVEL.N4
    | CLASS_LEVEL.N5
  numberOfLessons: number
  cardImg: string
  description: string
  deleted: Boolean
}
