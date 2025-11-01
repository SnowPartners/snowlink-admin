import { getOwnerList } from '@/apis/users';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useOwnerList = () => {
  const {
    data: ownerList,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.users.getOwnerList],
    queryFn: getOwnerList,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.data,
  });

  return {
    ownerList,
    isLoading,
    error,
    refetch,
  };
};
