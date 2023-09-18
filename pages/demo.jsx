import { useForm } from '@mantine/form'
import { MyInputs } from 'components/profile/MyInputs'

export default function demo() {
  const form = useForm({
    initialValues: {
      name: '',
      description: ''
    },

    validate: {
      name: (value) => (value.length > 5 ? null : 'Invalid name'),
      description: (value) => (value.length > 5 ? null : 'Invalid description')
    }
  })
  return (
    <div className=' max-w-4xl mx-auto my-6 px-4'>
      <h1>Input DEMO</h1>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <MyInputs
          label='Full name'
          placeholder='Enter your name'
          form={{ ...form.getInputProps('name') }}
        />
        <MyInputs
          label='Full name'
          placeholder='Enter your name'
          description='This is description'
          withAsterisk={false}
          form={{ ...form.getInputProps('description') }}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
