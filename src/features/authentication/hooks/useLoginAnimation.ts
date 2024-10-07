'use client'
import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'

export function useLoginAnimation<T extends HTMLElement>() {
  const [scope, animate] = useAnimate<T>()

  useEffect(() => {
    animate(
      'img',
      {
        opacity: 1,
      },
      { delay: 0.25, duration: 1.25 }
    )
    animate(
      'img',
      {
        width: 120,
        y: '-50%',
        marginBottom: '10%',
      },
      { delay: 2, duration: 0.5 }
    )
  }, [animate])

  return scope
}
