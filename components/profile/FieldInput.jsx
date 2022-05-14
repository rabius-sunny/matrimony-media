export default function FieldInput({
  legend,
  handlechange,
  description,
  placeholder,
  type,
  required,
  name,
  textarea
}) {
  return (
    <fieldset className='my-6 rounded-md border-2 border-red-300 p-4'>
      <legend className='ml-4 font-bold text-red-700'>
        {legend} {required && '*'}
      </legend>
      {textarea ? (
        <textarea
          type={type ?? 'text'}
          placeholder={placeholder ?? ''}
          handleChange={handlechange}
          name={name}
          rows={5}
          className='w-full rounded border-2 border-red-200 bg-red-100 px-4 py-2 font-medium text-red-400 shadow-md focus:outline-red-500'
        ></textarea>
      ) : (
        <input
          type={type ?? 'text'}
          placeholder={placeholder ?? ''}
          handleChange={handlechange}
          name={name}
          className='w-full rounded border-2 border-red-200 bg-red-100 px-4 py-2 font-medium text-red-400 shadow-md focus:outline-red-500'
        />
      )}
      <p className='pl-2 pt-4 text-red-400'>{description}</p>
    </fieldset>
  )
}
