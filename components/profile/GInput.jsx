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
        className={`font-bold ${
          errors[name] ? 'text-primary' : 'text-gray-600'
        }`}
      >
        {legend}
      </label>
      <input
        {...register(name, { required: message && message })}
        {...rest}
        className={`w-full rounded ${
          errors[name] ? 'bg-red-100' : 'bg-blue-100'
        } px-4 py-2 font-medium text-blue-400 shadow-md ${
          errors[name] ? 'focus:outline-red-500' : 'focus:outline-blue-500'
        }`}
      />
      <Fade right when={errors[name] ? true : false}>
        {errors[name] && (
          <p className='text-primary py-2 pl-2'>{errors[name].message}</p>
        )}
      </Fade>
      {description && <p className='pl-2 pt-4 text-blue-400'>{description}</p>}
    </div>
  )
}
