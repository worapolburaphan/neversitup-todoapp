import React, { FC } from 'react'

import { Button, Input } from '@nextui-org/react'

import { AnimatePresence, motion } from 'framer-motion'
import SecretInput from '@/features/shared/components/input/SecretInput'
import { useToggle } from '@/features/shared/hooks'
import { Controller } from 'react-hook-form'
import { SignUpFormValue, useSignUpForm } from '@/features/authentication/hooks'
import { useMutation } from '@tanstack/react-query'
import { postAccount } from '@/features/authentication/auth.service'
import { useAuthStore } from '@/features/authentication/stores'
import toast from 'react-hot-toast'
import { PostUserResp } from '@/features/authentication/auth.model'
import { AxiosError } from 'axios'

const SignUpForm: FC = () => {
  const [isPasswordVisible, togglePasswordVisibility] = useToggle()
  const { setUser } = useAuthStore()
  const { control, handleSubmit, watch, setValue } = useSignUpForm()
  const step = watch('step')

  const createAccount = useMutation({
    mutationFn: postAccount,
    onSuccess: (result: PostUserResp) => {
      if (!result.data?.username) return
      setUser(result.data.username)
    },
  })

  const navigate = (direction: number) => {
    setValue('step', step + direction, { shouldValidate: true })
  }

  const onSubmit = async (data: SignUpFormValue) => {
    try {
      await createAccount.mutateAsync({
        username: data.email,
        password: data.password,
      })

      toast.success('Account created successfully')
    } catch (error) {
      navigate(-1)
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  const submitSequence = [
    handleSubmit(() => {
      navigate(1)
    }),
    handleSubmit(onSubmit),
  ]

  return (
    <motion.form
      className="flex flex-col gap-4"
      exit={{ opacity: 0, x: '-5%' }}
      initial={{ opacity: 0, x: '5%' }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={submitSequence[step]}
    >
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Controller
              rules={{ required: true }}
              render={({ field, formState: { errors, touchedFields } }) => (
                <Input
                  isInvalid={touchedFields?.email && !!errors?.email}
                  errorMessage={errors?.email?.message}
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  classNames={{
                    inputWrapper: 'bg-white',
                  }}
                  {...field}
                />
              )}
              name="email"
              control={control}
            />
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
          >
            <Controller
              render={({ field, formState: { touchedFields, errors } }) => (
                <SecretInput
                  isInvalid={touchedFields?.password && !!errors?.password}
                  errorMessage={errors?.password?.message}
                  isVisible={isPasswordVisible}
                  toggleVisibility={togglePasswordVisibility}
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  classNames={{
                    inputWrapper: 'bg-white',
                  }}
                  {...field}
                />
              )}
              name="password"
              control={control}
            />
            <Controller
              render={({ field, formState: { errors, touchedFields } }) => (
                <SecretInput
                  isInvalid={
                    touchedFields?.confirmPassword && !!errors?.confirmPassword
                  }
                  errorMessage={errors?.confirmPassword?.message}
                  isVisible={isPasswordVisible}
                  toggleVisibility={togglePasswordVisibility}
                  label="Confirm Password"
                  variant="bordered"
                  placeholder="Re-enter your password"
                  classNames={{
                    inputWrapper: 'bg-white',
                  }}
                  {...field}
                />
              )}
              name="confirmPassword"
              control={control}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Button color="primary" variant="shadow" type="submit">
        {step === 0 ? 'Next' : 'Sign Up'}
      </Button>
    </motion.form>
  )
}

export default SignUpForm
