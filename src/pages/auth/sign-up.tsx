import { z } from 'zod'
import { TextField } from '@/components/ui/text-field/text-field'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormCheckbox } from '@/components/form/form-checkbox'

const signUpSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    passwordConfirmation: z.string(),
    agreesToTOS: z.literal(true, {
      errorMap: () => ({ message: 'You have to accept our terms of service' }),
    }),
  })
  .refine((value) => value.password === value.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

type SignUpFields = z.infer<typeof signUpSchema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  console.log('render')
  return (
    <div className={'h-screen grid place-items-center'}>
      <form
        onSubmit={onSubmit}
        className={'space-y-10'}
      >
        <TextField
          placeholder='Username'
          label={'Username'}
          errorMessage={errors.username?.message}
          {...register('username')}
        />
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
          type={'password'}
          {...register('password')}
        />
        <TextField
          placeholder='Confirm password'
          label={'Confirm password'}
          type={'password'}
          errorMessage={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />
        <div>
          <FormCheckbox
            className={'mr-3'}
            label={'I agree to the Terms of Service and Privacy Policy'}
            control={control}
            name={'agreesToTOS'}
          />
        </div>
        {/*<div>*/}
        {/*  <label className={'block'}>*/}
        {/*    <Controller*/}
        {/*      render={({ field: { onChange, value, ...field } }) => {*/}
        {/*        return (*/}
        {/*          <Checkbox*/}
        {/*            className={'mr-3'}*/}
        {/*            {...field}*/}
        {/*            onCheckedChange={onChange}*/}
        {/*            checked={value}*/}
        {/*          />*/}
        {/*        )*/}
        {/*      }}*/}
        {/*      name={'agreesToTOS'}*/}
        {/*      control={control}*/}
        {/*    />*/}
        {/*    I agree to the Terms of Service and Privacy Policy*/}
        {/*  </label>*/}
        {/*  {errors.agreesToTOS && (*/}
        {/*    <p className={'text-red-500 text-sm'}>*/}
        {/*      {errors.agreesToTOS.message}*/}
        {/*    </p>*/}
        {/*  )}*/}
        {/*</div>*/}
        <button>Sign Up</button>
      </form>
    </div>
  )
}
