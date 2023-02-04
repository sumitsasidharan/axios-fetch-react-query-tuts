import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
   return axios.get('http://localhost:4000/superheroes');
}

const RQSuperHeroesPage = () => {
   const { isLoading, data, isError, error } = useQuery('super-heroes', fetchSuperHeroes);

   if (isLoading) {
      return <h1>Loading...</h1>
   }

   if (isError) {
      return <h1>{error.message}</h1>
   }

  return (
     <>
        <h1>RQ Super Heroes Page</h1>

        {data?.data.map(hero => {
         return <div key={hero.id} >{hero.name}</div>
        })}
     </>
  );
}

export default RQSuperHeroesPage