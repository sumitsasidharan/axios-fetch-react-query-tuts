## REACT TANSTACK QUERY TUTORIAL

### STEP 1: Install json-server

1. Install `json-server`
2. Add `"serve-json": "json-server --watch db.json --port 4000"` in package.json under "scripts"
3. Run the json-server by typing `npm run json-server`

#### db.json file

```json
{
   "superheroes": [
      {
         "id": 1,
         "name": "Batman",
         "alterEgo": "Bruce Wayne"
      },
      {
         "id": 2,
         "name": "Superman",
         "alterEgo": "Clark Kent"
      },
      {
         "id": 3,
         "name": "Wonder Woman",
         "alterEgo": "Princess Diana"
      }
   ]
}
```

### STEP 2: React Tanstack Query Setup

1. Import `QueryClient` and `QueryClientProvider` from 'react-query' in App.jsx.
2. Wrap the whole component with QueryClientProvider.
3. Create an instance of the 'QueryClient':

   `const queryClient = new QueryClient();`

4. Add a 'client' prop in the <QueryClientProvider> component, and pass the 'queryClient' instance.

   `<QueryClientProvider client={queryClient} >`

5. App.jsx Code:

```js
import { Link, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
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
```

### STEP 3: React Query Fetching, http get method.

1. Import `useQuery` hook from `react-query`.

   `import { useQuery } from "react-query";`

2. `useQuery' hook requires at least 2 arguments. First argument is the unique key to identify this query. Second, a call back function that returns a Promise, which is the fetcher function to fetch data.

3. Code Example:

```js
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
   return axios.get('http://localhost:4000/superheroes');
}

const RQSuperHeroesPage = () => {
   const { isLoading, data, isError, error, isFetching } = useQuery('super-heroes', fetchSuperHeroes, {
      cacheTime: 5000,  // 5 seconds, default is 5 minutes
   });

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
```

### React Query Dev Tools.

1. Import `ReactQueryDevtools` from 'react-query/devtools'.
2. Add the `ReactQueryDevtools` component before the closing </QueryClientProvider> tag.
3. `Devtools` can also be added by installing `react-query-devtools`, and importing `ReactQueryDevtools` from `@tanstack/react-query-devtools`.

```node
npm i @tanstack/react-query-devtools
```

```js
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
```

### Points to Remember.

1. 'Polling' refers to fetching data at regular intervals, like in stocks trading.

## How to use `useQuery' hook to post data.

* To stop useQuery hook from fetching on Component Mount, pass 'enabled: false' property in the 3rd argument object.

* Destructure the function called `refetch` in the `useQuery` hook and pass it in the `onClick` event on a button, etc.

```js
const { isLoading, ... , refetch } = useQuery(
      '<unique-id-string>',
      fetchData,
      {
         enabled: false,  // this will stop useQuery from fetching automatically at Component Mount
      }

<button onClick={refetch}>fetch Data</button>
```