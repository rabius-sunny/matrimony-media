import { TextInput } from '@mantine/core'

export function MyInputs({
  label,
  placeholder,
  description,
  withAsterisk = true,
  form
}) {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      description={description}
      withAsterisk={withAsterisk}
      classNames={{
        label: 'ml-1 text-lg font-bold text-secondary',
        input:
          'shadow-md bg-green-100 border-0 focus:border-[1px] focus:border-green-300',
        description: 'mt-1 text-secondary'
      }}
      inputWrapperOrder={['label', 'input', 'error', 'description']}
      {...form}
    />
  )
}
