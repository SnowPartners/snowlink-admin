import { getInstructorDetail } from '@/apis/users';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useInstructorDetail = (instructorId: string) => {
  const {
    data: instructorDetail,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.users.getInstructorDetail, instructorId],
    queryFn: () => getInstructorDetail(instructorId),
    enabled: !!instructorId,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.data,
  });

  return {
    instructorDetail,
    isLoading,
    error,
    refetch,
  };
};
