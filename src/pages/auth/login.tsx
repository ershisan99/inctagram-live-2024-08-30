import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/components/ui/text-field/text-field'

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

const createLoginSchema = (t: ReturnType<typeof useI18n>) => {
  return z.object({
    email: z.string().min(1, 'Required').email(t('ERROR_INVALID_EMAIL')),
    password: z
      .string({ required_error: 'Required' })
      .min(1, 'Required')
      .min(3, 'Минимум 3 символа'),
  })
}

type LoginFields = z.infer<typeof loginSchema>

export default function Login() {
  const t = useI18n()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
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

        <button>Sign In</button>
      </form>
    </div>
  )
}

const useI18n = () => {
  const lang = 'ru'

  return (key: keyof (typeof translations)['ru']) => {
    return translations[lang][key]
  }
}

const translations = {
  ru: {
    ERROR_INVALID_EMAIL: 'Введите валидный адрес эл. почты',
  },
  en: {
    ERROR_INVALID_EMAIL: 'Invalid email',
  },
} as const
