import { getInstructorList } from '@/apis/users';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useInstructorList = () => {
  const {
    data: instructorList,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.users.getInstructorList],
    queryFn: getInstructorList,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.data,
  });

  return {
    instructorList,
    isLoading,
    error,
    refetch,
  };
};
