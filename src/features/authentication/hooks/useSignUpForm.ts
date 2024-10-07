import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z
  .object({
    step: z.number(),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      if (data.step === 0) {
        return true
      } else if (data.step === 1 && data.password) {
        return data.password.length >= 8
      }
    },
    {
      message: 'Password must be at least 8 characters',
      path: ['password'],
    }
  )
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  )

export type SignUpFormValue = z.infer<typeof schema>

export function useSignUpForm(initialValues?: Partial<SignUpFormValue>) {
  return useForm<SignUpFormValue>({
    values: {
      step: 0,
      email: '',
      password: '',
      confirmPassword: '',
      ...initialValues,
    },
    resolver: zodResolver(schema),
  })
}
