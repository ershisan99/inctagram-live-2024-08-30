import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/components/ui/text-field/text-field'
import { useLoginMutation } from '@/services/instagram.api'
import { useRouter } from 'next/router'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Required')
    .email('Неверный адрес электронной почты'),
  password: z
    .string({ required_error: 'Required' })
    .min(1, 'Required')
    .min(3, 'Минимум 3 символа'),
})

type LoginFields = z.infer<typeof loginSchema>

export default function Login() {
  const [logIn, { data, isLoading, isError }] = useLoginMutation()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })
  console.log({ data, isError })

  const onSubmit = handleSubmit((data) => {
    logIn(data)
      .unwrap()
      .then((data) => {
        localStorage.setItem('access_token', data.accessToken)
        const payload = data.accessToken.split('.')[1]
        const id = JSON.parse(atob(payload)).userId
        router.push(`/profile/${id}`)
      })
  })

  return (
    <div className={'h-screen grid place-items-center'}>
      <form
        onSubmit={onSubmit}
        className={'space-y-10'}
      >
        <TextField
          placeholder='Email'
          label={'Email'}
          errorMessage={errors.email?.message}
          {...register('email')}
        />

        <TextField
          placeholder='Password'
          label={'Password'}
          errorMessage={errors.password?.message}
          {...register('password')}
        />

        <button disabled={isLoading}>Sign In</button>
      </form>
    </div>
  )
}
