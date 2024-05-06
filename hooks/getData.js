import useRequest from 'services/network/useRequest'
import useSWR from 'swr'

export default function getData(key) {
  const request = useRequest()
  const { data, error, isLoading, mutate } = useSWR(
    `/get-specific-data/${key}`,
    request.get
  )
  return {
    data,
    error,
    loading: isLoading,
    mutate
  }
}
