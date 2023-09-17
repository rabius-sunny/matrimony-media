import requests from 'services/network/http'
import useSWR from 'swr'

export default function getData() {
  const { data, error, isLoading, mutate } = useSWR(
    `/bio/6291c5ac73f888b0bd348ee2`,
    requests.get
  )
  return {
    data: data?.response,
    error,
    loading: isLoading,
    mutate
  }
}
