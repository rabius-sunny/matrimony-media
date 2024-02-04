import useSWR from 'swr'

export default function useAsync(key, asyncFunction) {
  const { data, error, isLoading } = useSWR(key, asyncFunction)

  return {
    data,
    error,
    isLoading
  }
}
