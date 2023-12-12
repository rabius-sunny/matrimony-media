import { Select, TextInput, Textarea } from '@mantine/core'

export function MyInput({
  label,
  placeholder,
  description,
  withAsterisk = true,
  form,
  error
}) {
  return (
    <TextInput
      mt={15}
      label={label}
      placeholder={placeholder}
      description={description}
      withAsterisk={withAsterisk}
      classNames={{
        label: `ml-1 font-bold ${error ? 'text-danger' : 'text-secondary'}`,
        input: `shadow-md bg-${
          error ? 'red' : 'green'
        }-100 border-0 focus:border-[1px] focus:border-green-300`,
        description: 'mt-1 text-secondary'
      }}
      inputWrapperOrder={['label', 'input', 'error', 'description']}
      {...form}
    />
  )
}
export function MyTextarea({
  label,
  placeholder,
  description,
  withAsterisk = true,
  form,
  error
}) {
  return (
    <Textarea
      mt={15}
      label={label}
      placeholder={placeholder}
      description={description}
      withAsterisk={withAsterisk}
      classNames={{
        label: `ml-1 font-bold ${error ? 'text-danger' : 'text-secondary'}`,
        input: `shadow-md bg-${
          error ? 'red' : 'green'
        }-100 border-0 focus:border-[1px] focus:border-green-300`,
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
  onDropdownClose,
  form,
  error
}) {
  return (
    <Select
      onClick={onClick}
      onDropdownClose={onDropdownClose}
      mt={15}
      label={label}
      placeholder={placeholder}
      description={description}
      withAsterisk={withAsterisk}
      searchable
      classNames={{
        label: `ml-1 font-bold ${error ? 'text-danger' : 'text-secondary'}`,
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
