import React, { FC } from 'react'

import { Button, Checkbox, Input } from '@nextui-org/react'

import { motion } from 'framer-motion'
import SecretInput from '@/features/shared/components/input/SecretInput'
import { useToggle } from '@/features/shared/hooks'
import { useAuthStore } from '@/features/authentication/stores'
import { Controller } from 'react-hook-form'
import { useLoginForm } from '@/features/authentication/hooks'

const LoginForm: FC = () => {
  const [isPasswordVisible, togglePasswordVisibility] = useToggle()
  const { setIsRememberMe, isRememberMe } = useAuthStore()

  const { control, watch, handleSubmit } = useLoginForm({
    remember: isRememberMe,
  })

  const watchRemember = watch('remember')
  React.useEffect(() => {
    setIsRememberMe(watchRemember)
  }, [watchRemember, setIsRememberMe])

  return (
    <motion.form
      className="flex flex-col gap-4"
      exit={{ opacity: 0, x: '-5%' }}
      initial={{ opacity: 0, x: '5%' }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit((value) => {
        console.log('submit', value)
      })}
    >
      <Controller
        rules={{ required: true }}
        render={({ field, formState: { errors } }) => (
          <Input
            isInvalid={!!errors?.email}
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
      <Controller
        rules={{ required: true }}
        render={({ field, formState: { errors } }) => (
          <SecretInput
            isInvalid={!!errors?.password}
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
      <div className="flex items-center justify-between px-1 py-2">
        <Controller
          render={({ field }) => (
            <Checkbox
              defaultSelected
              size="sm"
              ref={field.ref}
              isDisabled={field.disabled}
              name={field.name}
              onBlur={field.onBlur}
              isSelected={field.value}
              onChange={field.onChange}
            >
              Remember me
            </Checkbox>
          )}
          name="remember"
          control={control}
        />
      </div>
      <Button color="primary" variant="shadow" type="submit">
        Log In
      </Button>
    </motion.form>
  )
}

export default LoginForm
