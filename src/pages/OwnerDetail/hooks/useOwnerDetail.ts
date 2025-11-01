import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getOwnerDetail } from '@/apis/users';

export const useOwnerDetail = (ownerId: string) => {
  const {
    data: ownerDetail,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.users.getOwnerDetail, ownerId],
    queryFn: () => getOwnerDetail(ownerId),
    enabled: !!ownerId,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.data,
  });

  return {
    ownerDetail,
    isLoading,
    error,
    refetch,
  };
};
