import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
   return axios.get('http://localhost:4000/superheroes');
}

const fetchFriends = () => {
   return axios.get('http://localhost:4000/friends');
}

const ParallelQuerries = () => {
   // use ALIASES to prevent variable name clash
   const { data: superHeroesData } = useQuery('super-heroes', fetchSuperHeroes);
   const { data: friendsData } = useQuery('friends', fetchFriends);

   return <div>ParallelQuerries</div>;
};

export default ParallelQuerries;
