import { useQuery } from "react-query";
import axios from "axios";

// IMPORTANT: To stop useQuery hook from fetching on Mount, pass 'enabled: false' property in the 3rd argument object.

const fetchSuperHeroes = () => {
   return axios.get('http://localhost:4000/superheroes');
}

const RQSuperHeroesPage = () => {
   const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
      'super-heroes',
      fetchSuperHeroes,
      {
         cacheTime: 120000, // 120 seconds, default is 5 minutes
         staleTime: 30000, // 30 seconds, stale data for 30 seconds, ie. wont fetch for 30 secs, then refetch fresh data in the background (DEFAULT IS 0 SECONDS)
         refetchOnMount: true, // true by default, will refetch on mount  if stale data, 'always' options will fetch even if data is not stale
         refetchOnWindowFocus: true, // default: true, refetches fresh data when browser tab is on focus again, if data is stale. ('always' will always fetch)
         refetchInterval: false, // set to false by default, if set to 2000 for 2 seconds, will always fetch every 2 seconds, if tab in focus.
         refetchIntervalInBackground: true, // false by default, will refetch every interval even if tab is out of focus.
         enabled: false, // won't fetch on Component Mount (to prevent FETCHING BY DEFAULT ON COMPONENT MOUNT)
      }
   );

   // DISPLAY LOADING if 'Loading' or 'fetching' fresh data. (not needed)
   if (isLoading || isFetching) {
      return <h1>Loading...</h1>;
   }

   if (isError) {
      return <h1>{error.message}</h1>;
   }

   return (
      <>
         <h1>RQ Super Heroes Page</h1>

         <button onClick={refetch}>fetch Data</button>

         {data?.data.map((hero) => {
            return <div key={hero.id}>{hero.name}</div>;
         })}
      </>
   );
}

export default RQSuperHeroesPage