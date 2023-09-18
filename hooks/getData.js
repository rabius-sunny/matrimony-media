import requests from 'services/network/http'
import useSWR from 'swr'

export default function getData() {
  const id = typeof window !== 'undefined' ? localStorage.getItem('id') : ''
  const { data, error, isLoading, mutate } = useSWR(`/bio/${id}`, requests.get)
  return {
    data: data?.response,
    error,
    loading: isLoading,
    mutate
  }
}
