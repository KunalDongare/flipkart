import useSWR from 'swr';
import fetcher from '../utils/fetcher';

function useProductDetails(url) {
  const {data, error} = useSWR(url, fetcher);

  return {
    productDetails: data,
    error,
    isLoading: !data && !error,
  };
}

export default useProductDetails;
