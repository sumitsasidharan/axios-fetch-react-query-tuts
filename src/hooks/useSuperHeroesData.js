import { useQuery, useMutation, useQueryClient } from 'react-query';

import axios from 'axios';

// IMPORTANT: To stop useQuery hook from fetching on Mount, pass 'enabled: false' property in the 3rd argument object.

const fetchSuperHeroes = () => {
   return axios.get('http://localhost:4000/superheroes');
};

// fetcher for useMutation
const addSuperHero = (hero) => {
   return axios.post('http://localhost:4000/superheroes', hero);
}

export const useSuperHeroesData = (onSuccess, onError) => {
   return useQuery('super-heroes', fetchSuperHeroes, {
      cacheTime: 120000, // 120 seconds, default is 5 minutes
      staleTime: 30000, // 30 seconds, stale data for 30 seconds, ie. wont fetch for 30 secs, then refetch fresh data in the background (DEFAULT IS 0 SECONDS)
      refetchOnMount: true, // true by default, will refetch on mount  if stale data, 'always' options will fetch even if data is not stale
      refetchOnWindowFocus: true, // default: true, refetches fresh data when browser tab is on focus again, if data is stale. ('always' will always fetch)
      refetchInterval: false, // set to false by default, if set to 2000 for 2 seconds, will always fetch every 2 seconds, if tab in focus.
      refetchIntervalInBackground: true, // false by default, will refetch every interval even if tab is out of focus.
      enabled: false, // won't fetch on Component Mount (to prevent FETCHING BY DEFAULT ON COMPONENT MOUNT)
      onSuccess: onSuccess, // side effect callback on success
      onError: onError, // side effect code on error
      // select: (data) => {
      //    // function for transforming data if needed. Like a middleware that transforms and provides data that is required directly
      //    const newTransformedData = data.data.map((hero) => hero.name);
      //    return newTransformedData;
      // },
   });
};


// WITH QUERY INVALIDATION (USE THIS)
// export const useAddSuperHeroData = () => {
//    const queryClient = useQueryClient();

//    // doesn't need a key, just a mutation function
//    return useMutation(addSuperHero, {
//       onSuccess: () => {
//          // callback after successful mutation
//          // key is from the fetch useQuery above
//          queryClient.invalidateQueries('super-heroes');
//       }
//    })
// }

// FOR UPDATING QUERY CACHE WITHOUT A NETWORK REQUEST
export const useAddSuperHeroData = () => {
   const queryClient = useQueryClient();

   // doesn't need a key, just a mutation function
   return useMutation(addSuperHero, {
      onSuccess: (data) => {
         queryClient.setQueryData('super-heroes', (oldQueryData) => {
            return {
               ...oldQueryData,
               data: [...oldQueryData.data, data.data]
            }
         })
      },
   });
};


// FOR OPTIMISTIC QUERIES ONLY
export const useAddSuperHeroData_OPTI = () => {
   const queryClient = useQueryClient();

   // doesn't need a key, just a mutation function
   return useMutation(addSuperHero, {
      onMutate: async (newHero) => {
         await queryClient.cancelQueries('super-heroes');
         const previousHeroData = queryClient.getQueryData('super-heroes');
         queryClient.setQueryData('super-heroes', (oldQueryData) => {
            return {
               ...oldQueryData,
               data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newHero }],
            };
         });

         return {
            previousHeroData,
         }
      },
      onError: (_error, _hero, context) => {
         queryClient.setQueryData('super-heroes', context.previousHeroData);
      },
      // onSettled is called  when mutation is either  successfull or encounters error
      onSettled: () => {
         // refetching super-heroes
         queryClient.invalidateQueries('super-heroes');
      },
   });
};