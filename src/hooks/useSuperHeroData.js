import { useQuery } from "react-query";
import axios from "axios";

// destructure react-query params
const fetchSuperHero = ({ queryKey }) => {
   // ID is in index postion 1
   const heroId = queryKey[1];
   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export const useSuperHeroData = (heroId) => {
   // IMPORTANT: react-query automatically passes the ID in fetcher function
   return useQuery(['super-hero', heroId], fetchSuperHero);
}