import { useRouter } from 'next/router'
import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'
import { useState } from 'react'

export default function Address() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  const [input, setInput] = useState({
    permanent_address: '',
    current_address: '',
    where_lived: ''
  })
  const handlechange = e =>
    setInput({ ...input, [e.target.name]: e.target.value })

  const warning = () =>
    input.current_address.toString().length < 1 ||
    input.permanent_address.toString().length < 1 ||
    input.where_lived.toString().length < 1
      ? true
      : false
  return (
    <ProfileLayout body={input} warning={warning()}>
      <ProfileRoutes activeRoute={activeRoute} />
      <FieldInput
        legend='স্থায়ী ঠিকানা'
        handlechange={handlechange}
        placeholder='গুলশান-২, ঢাকা'
        required={true}
        name='permanent_address'
      />
      <FieldInput
        legend='বর্তমান ঠিকানা'
        handlechange={handlechange}
        placeholder='ভাটারা, গুলশান-২, ঢাকা'
        required={true}
        name='current_address'
      />
      <FieldInput
        legend='কোথায় বড় হয়েছেন?'
        handlechange={handlechange}
        required={true}
        name='where_lived'
      />
    </ProfileLayout>
  )
}
