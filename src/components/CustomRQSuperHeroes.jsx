import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

const CustomRQSuperHeroes = () => {
   // callback when query succeeds, fetches data successfully
   const onSuccess = (data) => {
      // receives data, can be dispatched to 'redux' or other state manager
      // it should be 'data.data' for axios.
      console.log('perform side effect after data fetching successfully...');
   };

   // callback when there's error while fetching.
   const onError = (error) => {
      console.log('perform side effect after encountering error..');
   };

   // pass rest of the arguments inside object
   const { isLoading, data, isError, error, isFetching, refetch } =
      useSuperHeroesData(onSuccess, onError);

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
            return (
               <div key={hero.id}>
                  <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
               </div>
            );
         })}

         {/* DATA AFTER TRANSFORMING in the 'select' function */}
         {/* {data?.map((heroName) => {
            return <div key={heroName}>{heroName}</div>;
         })} */}
      </>
   );
};

export default CustomRQSuperHeroes;
