import { Select, TextInput } from '@mantine/core'

export function MyInput({
  label,
  placeholder,
  description,
  withAsterisk = true,
  form
}) {
  return (
    <TextInput
      mt={10}
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
export function MySelect({
  label,
  placeholder,
  description,
  withAsterisk = true,
  data,
  onClick,
  form
}) {
  return (
    <Select
      onClick={onClick}
      mt={15}
      label={label}
      placeholder={placeholder}
      description={description}
      withAsterisk={withAsterisk}
      searchable
      classNames={{
        label: 'ml-1 text-lg font-bold text-secondary',
        input:
          'shadow-md bg-green-100 border-0 focus:border-[1px] focus:border-green-300',
        description: 'mt-1 text-secondary'
      }}
      inputWrapperOrder={['label', 'input', 'error', 'description']}
      nothingFound='no record found'
      {...form}
      data={data}
    />
  )
}
