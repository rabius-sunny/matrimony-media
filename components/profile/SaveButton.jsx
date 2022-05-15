export default function SaveButton({ body }) {
  return (
    <div className='my-8'>
      <button
        onClick={() => console.log('body from save button', body)}
        className='rounded-md bg-red-500 px-6 py-3 text-xl font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-800'
      >
        Save changes
      </button>
    </div>
  )
}
