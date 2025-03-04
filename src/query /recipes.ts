import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchAllMeals, getByName, getMeal } from '../api/recipes';
import { IMeal } from '../type/meals.ts';

export const useGetAllMeals = (): UseQueryResult<IMeal[]> => {
  return useQuery({
    queryKey: ['allMeals'],
    queryFn: fetchAllMeals,
    staleTime: Infinity,
  });
};

export const useGetMeal = (id: string): UseQueryResult<IMeal[]> => {
  const queryFn = () => {
    if (id) {
      return getMeal(id);
    }
    return null;
  };

  return useQuery({
    queryKey: ['meal', id],
    queryFn,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetByName = (name: string): UseQueryResult<IMeal[]> => {
  const queryFn = () => {
    if (name) {
      return getByName(name);
    }
    return null;
  };

  return useQuery({
    queryKey: ['mealByName', name],
    queryFn,
    staleTime: 0,
    gcTime: 0,
  });
};
