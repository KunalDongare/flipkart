import useSWR from 'swr';
import fetcher from '../utils/fetcher';

function useProductsData(url) {
  const {data, error} = useSWR(url, fetcher);

  return {
    products: data,
    error,
    isLoading: !data && !error,
  };
}

export default useProductsData;
