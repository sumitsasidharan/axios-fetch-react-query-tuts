import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import CustomRQSuperHeroes from './components/CustomRQSuperHeroes';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import RQSuperHeroPage from './components/RQSuperHero';
import ParallelQuerries from './components/ParallelQuerries.page';

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <nav>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/super-heroes">Traditional Super Heroes</Link>
               </li>
               <li>
                  <Link to="/rq-super-heroes">RQ Super Heroes</Link>
               </li>
               <li>
                  <Link to="/custom-rq-hook">Custom RQ Super Heroes</Link>
               </li>
               <li>
                  <Link to="/rq-parallel">Parallel Querries Page</Link>
               </li>
            </ul>
         </nav>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHeroPage />} />
            <Route path="/custom-rq-hook" element={<CustomRQSuperHeroes />} />
            <Route path="/rq-parallel" element={<ParallelQuerries />} />

            <Route path="*" element={<h1>Not Found</h1>} />
         </Routes>

         <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
   );
}

export default App;
