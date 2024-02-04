import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppContext } from 'utils/context'

export default function CForm({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues })
  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const { setErrorState } = useAppContext()
  useEffect(() => {
    setErrorState(errors)
  }, [errors])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
                errors
              }
            })
          : child
      })}
    </form>
  )
}
