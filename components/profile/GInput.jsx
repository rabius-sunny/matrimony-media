import { Fade } from 'react-reveal'

export default function GInput({
  legend,
  description,
  register,
  name,
  errors,
  message,
  textarea,
  ...rest
}) {
  return (
    <div className='my-4'>
      <label
        className={`font-bold mb-2 ${
          errors[name] ? 'text-primary' : 'text-gray-600'
        }`}
      >
        {legend}
      </label>
      <input
        {...register(name, { required: message && message })}
        {...rest}
        className={`w-full rounded ${
          errors[name] ? 'bg-red-100' : 'bg-green-100'
        } px-4 py-2 font-medium text-secondary shadow-md focus:ring-2 ${
          errors[name] ? 'focus:ring-red-500' : 'focus:ring-secondary'
        }`}
      />
      <Fade right when={errors[name] ? true : false}>
        {errors[name] && (
          <p className='text-primary py-2 pl-2'>{errors[name].message}</p>
        )}
      </Fade>
      {description && <p className='pl-2 pt-4 text-secondary'>{description}</p>}
    </div>
  )
}
