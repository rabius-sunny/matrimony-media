import { Fade } from 'react-reveal'

export function CInput({
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
    <fieldset
      className={`my-6 rounded-md border-2 ${
        errors[name] ? 'border-red-500' : 'border-blue-300'
      } p-4`}
    >
      <legend
        className={`ml-4 font-bold ${
          errors[name] ? 'text-red-500' : 'text-blue-500'
        }`}
      >
        {legend}
      </legend>
      {textarea ? (
        <textarea
          rows={5}
          {...register(name, { required: message && message })}
          {...rest}
          className={`w-full rounded ${
            errors[name] ? 'bg-red-100' : 'bg-blue-100'
          } px-4 py-2 font-medium text-blue-400 shadow-md ${
            errors[name] ? 'focus:outline-red-500' : 'focus:outline-blue-500'
          }`}
        />
      ) : (
        <input
          {...register(name, { required: message && message })}
          {...rest}
          className={`w-full rounded ${
            errors[name] ? 'bg-red-100' : 'bg-blue-100'
          } px-4 py-2 font-medium text-blue-400 shadow-md ${
            errors[name] ? 'focus:outline-red-500' : 'focus:outline-blue-500'
          }`}
        />
      )}
      <Fade right when={errors[name] ? true : false}>
        {errors[name] && (
          <p className='text-red-500 py-2 pl-2'>{errors[name].message}</p>
        )}
      </Fade>
      {description && <p className='pl-2 pt-4 text-blue-400'>{description}</p>}
    </fieldset>
  )
}
export function CSelect({
  legend,
  message,
  register,
  options,
  name,
  errors,
  onClick,
  onChange,
  ...rest
}) {
  return (
    <>
      <fieldset
        className={`my-6 rounded-md border-2 ${
          errors[name] ? 'border-red-500' : 'border-blue-300'
        } p-4`}
      >
        <legend
          className={`ml-4 font-bold ${
            errors[name] ? 'text-red-500' : 'text-blue-500'
          }`}
        >
          {legend}
        </legend>
        <select
          className={`w-full focus:outline-none border-2 ${
            errors[name] ? 'border-red-500' : 'border-blue-300'
          } p-2 rounded-md`}
          {...register(name, { required: message && message })}
          onClick={onClick ? e => onClick(e.target.value) : null}
          onChange={onChange ? e => onChange(e.target.value) : null}
          {...rest}
        >
          <option value=''>---</option>
          {options.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <Fade right when={errors[name] ? true : false}>
          {errors[name] && (
            <p className='text-red-500 py-2 pl-2'>{errors[name].message}</p>
          )}
        </Fade>
      </fieldset>
    </>
  )
}
