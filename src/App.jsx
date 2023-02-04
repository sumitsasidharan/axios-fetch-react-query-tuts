import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SuperHeroesPage from './components/SuperHeroes.page';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';

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
            </ul>
         </nav>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />

            <Route path="*" element={<h1>Not Found</h1>} />
         </Routes>

         <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
   );
}

export default App;
