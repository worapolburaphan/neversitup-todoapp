import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  remember: z.boolean(),
})
export type LoginFormValue = z.infer<typeof schema>

export function useLoginForm(initialValues?: Partial<LoginFormValue>) {
  return useForm<LoginFormValue>({
    values: {
      email: '',
      password: '',
      remember: false,
      ...initialValues,
    },
    resolver: zodResolver(schema),
  })
}
