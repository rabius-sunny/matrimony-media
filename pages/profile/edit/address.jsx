import { useRouter } from 'next/router'
import ProfileLayout from 'components/profile/ProfileLayout'
import ProfileRoutes from 'components/profile/ProfileRoutes'
import FieldInput from 'components/profile/FieldInput'

export default function Address() {
  const router = useRouter()
  const activeRoute = routename =>
    router.route.split('/edit')[1] === routename ? true : false
  const handlechange = e => {}
  return (
    <ProfileLayout>
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
        name='being_address'
      />
    </ProfileLayout>
  )
}
