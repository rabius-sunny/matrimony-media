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
        errors[name] ? 'border-red-500' : 'border-gray-300'
      } p-4`}
    >
      <legend
        className={`ml-4 font-bold ${
          errors[name] ? 'text-red-500' : 'text-secondary'
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
            errors[name] ? 'bg-red-100' : 'bg-green-100'
          } px-4 py-2 font-medium text-green-400 shadow-md ${
            errors[name] ? 'focus:outline-red-500' : 'focus:outline-secondary'
          }`}
        />
      ) : (
        <input
          {...register(name, { required: message && message })}
          {...rest}
          className={`w-full rounded ${
            errors[name] ? 'bg-red-100' : 'bg-green-100'
          } px-4 py-2 font-medium text-green-400 shadow-md ${
            errors[name] ? 'focus:outline-red-500' : 'focus:outline-secondary'
          }`}
        />
      )}
      {errors[name] && (
        <p className='text-primary py-2 pl-2'>{errors[name].message}</p>
      )}
      {description && <p className='pl-2 pt-4 text-secondary'>{description}</p>}
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
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } p-4`}
      >
        <legend
          className={`ml-4 font-bold ${
            errors[name] ? 'text-primary' : 'text-secondary'
          }`}
        >
          {legend}
        </legend>
        <select
          className={`w-full focus:outline-none border-2 ${
            errors[name] ? 'border-red-500' : 'border-green-300'
          } p-2 rounded-md`}
          {...register(name, { required: message && message })}
          onClick={onClick ? (e) => onClick(e.target.value) : null}
          onChange={onChange ? (e) => onChange(e.target.value) : null}
          {...rest}
        >
          <option value=''>---</option>
          {options.map((value) => (
            <option
              key={value}
              value={value}
            >
              {value}
            </option>
          ))}
        </select>
        {errors[name] && (
          <p className='text-primary py-2 pl-2'>{errors[name].message}</p>
        )}
      </fieldset>
    </>
  )
}
