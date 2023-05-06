import React, { ReactNode, createContext, useState } from 'react'

interface Props {
  children: ReactNode
}

interface loadingContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const LoadingContext = createContext<loadingContextType>(
  {} as loadingContextType
)
const AppLoadingProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, AppLoadingProvider }
