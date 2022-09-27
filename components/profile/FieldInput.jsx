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
      <legend className='ml-4 font-bold text-primary'>
        {legend} {required && '*'}
      </legend>
      {textarea ? (
        <textarea
          type={type ?? 'text'}
          placeholder={placeholder ?? ''}
          onChange={e => handlechange(e.target.value)}
          name={name}
          rows={5}
          className='w-full rounded border-2 border-red-200 bg-red-100 px-4 py-2 font-medium text-primary shadow-md focus:outline-red-500'
        ></textarea>
      ) : (
        <input
          type={type ?? 'text'}
          placeholder={placeholder ?? ''}
          onChange={e => handlechange(e.target.value)}
          name={name}
          className='w-full rounded border-2 border-red-200 bg-red-100 px-4 py-2 font-medium text-primary shadow-md focus:outline-red-500'
        />
      )}
      <p className='pl-2 pt-4 text-primary'>{description}</p>
    </fieldset>
  )
}
