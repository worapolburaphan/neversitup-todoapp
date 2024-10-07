'use client'
import React, { FC, useState } from 'react'
import { Link } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { LoginForm, SignUpForm } from '@/features/authentication/components'
import { useLoginAnimation } from '@/features/authentication/hooks'

type Mode = 'login' | 'signup'

interface Props {
  defaultMode?: Mode
}

const AuthContainer: FC<Props> = ({ defaultMode = 'login' }) => {
  const [mode, setMode] = useState<Mode>(defaultMode)
  const scope = useLoginAnimation<HTMLDivElement>()

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex w-full justify-center">
        <motion.div
          ref={scope}
          initial={{ opacity: 0, y: '50%' }}
          animate={{ opacity: 1, y: '-50%' }}
          className="absolute flex aspect-square w-1/2 items-center justify-center rounded-full bg-gradient-to-t from-primary to-primary-foreground to-90% opacity-0"
        >
          <img
            className="transition-scale w-2/3 object-contain opacity-0 hover:scale-110"
            alt="logo"
            src="https://neversitup.com/assets/images/icon.svg"
          />
        </motion.div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.25, delay: 2 }}
          className="w-full overflow-clip rounded-2xl shadow-md"
        >
          <div className="relative flex w-full flex-col gap-4 bg-primary-foreground/20 px-8 py-8 backdrop-blur-3xl">
            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.p
                  key="login"
                  initial={{ opacity: 0, x: '50%' }}
                  exit={{ opacity: 0, x: '-10%' }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.1 } }}
                  className="pb-4 text-left text-3xl font-semibold text-primary"
                >
                  Log In
                  <span aria-label="emoji" className="ml-2" role="img">
                    👋
                  </span>
                </motion.p>
              ) : (
                <motion.p
                  key="signup"
                  initial={{ opacity: 0, x: '50%' }}
                  exit={{ opacity: 0, x: '-10%' }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.1 } }}
                  className="pb-4 text-left text-3xl font-semibold text-primary"
                >
                  Sign Up
                  <span aria-label="emoji" className="ml-2" role="img">
                    🚀
                  </span>
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {mode === 'login' ? <LoginForm /> : <SignUpForm />}
            </AnimatePresence>
            <p className="text-center text-small">
              <AnimatePresence>
                {mode === 'login' ? (
                  <Link href="#" size="sm" onClick={() => setMode('signup')}>
                    Create an account
                  </Link>
                ) : (
                  <Link href="#" size="sm" onClick={() => setMode('login')}>
                    Already have an account?
                  </Link>
                )}
              </AnimatePresence>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthContainer
