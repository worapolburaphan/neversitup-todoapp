'use client'

import React, { FC, PropsWithChildren } from 'react'
import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  )
}

export default QueryClientProvider
