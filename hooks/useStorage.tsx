import { useEffect, useState } from 'react'
import { STORAGE } from '../const/app-const'

export const useStorage = (type: string, key: string, initValue: any) => {
  // get exist data in storage
  const [value, setValue] = useState(() => {
    try {
      let item: any
      switch (type) {
        case STORAGE.LOCAL:
          item = localStorage.getItem(key)
          break
        case STORAGE.SESSION:
          item = sessionStorage.getItem(key)
          break
        default:
          break
      }
      return !item ? initValue : JSON.parse(item)
    } catch (error) {
      return initValue
    }
  })
  // auto update storage when data changed
  useEffect(() => {
    try {
      switch (type) {
        case STORAGE.LOCAL:
          localStorage.setItem(key, JSON.stringify(value))
          break
        case STORAGE.SESSION:
          sessionStorage.setItem(key, JSON.stringify(value))
          break
        default:
          break
      }
    } catch (error) {
      // console.error(error)
    }
  }, [type, key, value])

  return [value, setValue]
}
