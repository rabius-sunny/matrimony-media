export default function SaveButton({ body, warning }) {
  return (
    <div className='my-8'>
      <button
        onClick={() =>
          !warning()
            ? console.log('body from save button', body)
            : alert('please fill all required field!')
        }
        className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
      >
        Save changes
      </button>
    </div>
  )
}
