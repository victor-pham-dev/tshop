import { REGIS_STATUS } from "@/const/app-const"

export interface RegisClassProps {
    _id?: string
    classId: string
    name: string
    phone: string
    address: string
    email: string
    facebookLink: string
    // method: LEARN_METHOD.OFFLINE | LEARN_METHOD.OFFLINE
    status: REGIS_STATUS.INIT | REGIS_STATUS.CHECKED | REGIS_STATUS.CONFIRMED | REGIS_STATUS.CANCELED
    // classLevel: CLASS_LEVEL.N1 | CLASS_LEVEL.N2 | CLASS_LEVEL.N3 | CLASS_LEVEL.N4 | CLASS_LEVEL.N5
    knowFrom: string
    everStudied: boolean
    leanTo: string
    note: string
    deleted: boolean
    userId: string
    createdAt: string
    updatedAt: string
  }