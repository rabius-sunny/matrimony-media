export default function FieldInput({
  legend,
  handleChange,
  description,
  placeholder,
  type,
  required,
  name
}) {
  return (
    <fieldset className='rounded-md border-2 border-red-300 p-4'>
      <legend className='ml-4 text-lg font-bold text-red-700'>
        {legend} {required && '*'}
      </legend>
      <input
        type={type ?? 'text'}
        placeholder={placeholder ?? ''}
        handleChange={handleChange}
        name={name}
        className='w-full rounded border-2 border-red-200 bg-red-100 px-4 py-2 font-medium text-red-400 shadow-md focus:outline-red-500'
      />
      <p className='pl-2 pt-4 text-red-400'>{description}</p>
    </fieldset>
  )
}
