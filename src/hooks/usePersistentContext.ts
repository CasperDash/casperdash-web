import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _isEmpty from 'lodash-es/isEmpty';

export const usePersistentContext = (key: string, defaultValues = {}) => {
  const queryClient = useQueryClient();
  const getItem = () => {
    const item = JSON.parse(localStorage.getItem(key) || '{}');
    if (_isEmpty(item)) {
      return defaultValues;
    }

    return {
      ...defaultValues,
      ...item,
    };
  };

  const { data } = useQuery([key], () => getItem());

  const { mutateAsync: setValue } = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => {
      const item = getItem();

      localStorage.setItem(
        key,
        JSON.stringify({
          ...item,
          ...value,
        })
      );

      return {
        ...item,
        ...value,
      };
    },
    {
      onMutate: (mutatedData) => {
        const current = data;
        const oldData = queryClient.getQueryData([key]);
        queryClient.setQueryData([key], {
          ...(oldData || {}),
          ...mutatedData,
        });
        return current;
      },
      onError: (_, __, rollback) => {
        queryClient.setQueryData([key], rollback);
      },
    }
  );

  return [data || defaultValues, setValue];
};
