import useRequest from 'services/network/useRequest'
import useSWR from 'swr'

export default function getData(key) {
  const { data, error, isLoading, mutate } = useSWR(
    `/get-specific-data/${key}`,
    useRequest('auth').get
  )
  return {
    data,
    error,
    loading: isLoading,
    mutate
  }
}
