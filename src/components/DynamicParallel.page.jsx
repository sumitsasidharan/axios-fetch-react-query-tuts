import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId) => {
   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

// heroIds is an Array of Hero IDs
const DynamicParallelPage = ({ heroIds }) => {
   // Another way of caling useQuery, to prevent violating the rules of hooks
   // useQueries return an Array of query Results
   const queryResults = useQueries(
      heroIds.map(id => {
         return {
            queryKey: ['super-hero', id],
            queryFn: () => fetchSuperHero(id)
         }
      })
   )

   console.log({ queryResults });

   return <div>DynamicParallelPage</div>;
};

export default DynamicParallelPage;
