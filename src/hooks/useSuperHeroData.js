import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

// destructure react-query params
const fetchSuperHero = ({ queryKey }) => {
   // ID is in index postion 1
   const heroId = queryKey[1];
   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
   // IMPORTANT: react-query automatically passes the ID in fetcher function

   // queryClient instance has access to data cache
   const queryClient = useQueryClient();
   return useQuery(['super-hero', heroId], fetchSuperHero, {
      initialData: () => {
         // pass the query id, for which cache data is needed
         const hero = queryClient
            .getQueriesData('super-heroes')
            ?.data?.find((hero) => hero.id === parseInt(heroId));

         if (hero) {
            return { data: hero };
         } else {
            return undefined;  // imp
         }
      },
   });
};
