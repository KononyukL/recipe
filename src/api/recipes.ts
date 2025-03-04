import axiosInstance from './axiosInstance';

export const fetchAllMeals = async () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const requests = alphabet.map((letter) =>
    axiosInstance
      .get(`/search.php`, {
        params: {
          f: letter,
        },
      })
      .then((res) => res.data.meals || [])
  );

  const meals = await Promise.all(requests);
  return meals.flat();
};

export const getByName = async (name: string) => {
  const result = await axiosInstance.get(`/search.php`, {
    params: {
      s: name,
    },
  });

  return result.data.meals;
};

export const getMeal = async (id: string) => {
  const result = await axiosInstance.get(`/lookup.php`, {
    params: {
      i: id,
    },
  });

  return result.data.meals;
};
