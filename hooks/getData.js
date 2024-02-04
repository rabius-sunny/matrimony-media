import requests from 'services/network/http'
import useSWR from 'swr'

export default function getData(key) {
  const { data, error, isLoading, mutate } = useSWR(
    `/get-specific-data/${key}`,
    requests.get
  )
  return {
    data,
    error,
    loading: isLoading,
    mutate
  }
}
