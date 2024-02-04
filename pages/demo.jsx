import { useForm } from '@mantine/form'
import { MyInput, MySelect } from 'components/profile/MyInputs'

export default function demo() {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      select: ''
    },

    validate: {
      name: (value) => (value.length > 5 ? null : 'Invalid name'),
      description: (value) => (value.length > 5 ? null : 'Invalid description'),
      select: (value) => (value.length > 2 ? null : 'Invalid select')
    }
  })
  return (
    <div className=' max-w-4xl mx-auto my-6 px-4'>
      <h1>Input DEMO</h1>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <MyInput
          label='Full name'
          placeholder='Enter your name'
          form={{ ...form.getInputProps('name') }}
        />
        <MyInput
          label='Full name'
          placeholder='Enter your name'
          description='This is description'
          withAsterisk={false}
          form={{ ...form.getInputProps('description') }}
        />
        <MySelect
          label='Select value'
          placeholder='select option'
          description='This is Select'
          data={['data1', 'data2']}
          form={{ ...form.getInputProps('select') }}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
