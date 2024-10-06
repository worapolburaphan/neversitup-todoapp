'use client'
import React, { FC, PropsWithChildren } from 'react'
import { NextUIProvider } from '@nextui-org/react'

const NextUIProviderCSR: FC<PropsWithChildren> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>
}

export default NextUIProviderCSR
