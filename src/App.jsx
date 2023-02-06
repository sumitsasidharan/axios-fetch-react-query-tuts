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
import DynamicParallelPage from './components/DynamicParallel.page';
import { DependentQueries } from './components/DependentQueries.page';
import { PaginatedQueriesPage } from './components/PaginatedQueries.page';
import { InfiniteQueriesPage } from './components/InfiniteQueries.page';

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
               <li>
                  <Link to="/rq-dynamic-parallel">Dynamic Parallel</Link>
               </li>
               <li>
                  <Link to="/rq-dependent">Dependent Queries</Link>
               </li>
               <li>
                  <Link to="/rq-paginated">Paginated Queries</Link>
               </li>
               <li>
                  <Link to="/rq-infinite">Infinite Queries</Link>
               </li>
            </ul>
         </nav>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
            <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route
               path="/rq-super-heroes/:heroId"
               element={<RQSuperHeroPage />}
            />
            <Route path="/custom-rq-hook" element={<CustomRQSuperHeroes />} />
            <Route path="/rq-parallel" element={<ParallelQuerries />} />
            <Route
               path="/rq-dynamic-parallel"
               element={<DynamicParallelPage heroIds={[1, 3]} />}
            />
            {/* LoggedIn user's email, can be fetched from context */}
            <Route
               path="/rq-dependent"
               element={<DependentQueries email="sumit@gmail.com" />}
            />

            <Route path="*" element={<h1>Not Found</h1>} />
         </Routes>

         <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
   );
}

export default App;
