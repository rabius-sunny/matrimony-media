import { useForm } from 'react-hook-form'

export default function Formed() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName', { required: true })} />
      {errors.firstName && 'First name is required'}

      <input {...register('lastName', { required: true })} />
      {errors.lastName && 'Last name is required'}

      <input type='submit' />
    </form>
  )
}
