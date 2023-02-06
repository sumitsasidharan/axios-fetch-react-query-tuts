## REACT TANSTACK QUERY TUTORIAL

### REACT TANSTACK QUERY DOCS LINK:

[React-Tanstack-Query Docs](https://tanstack.com/query/v4/docs/react/overview)

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

         <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
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
import { useQuery } from 'react-query';
import axios from 'axios';

// IMPORTANT: To stop useQuery hook from fetching on Mount, pass 'enabled: false' property in the 3rd argument object.

const fetchSuperHeroes = () => {
   return axios.get('http://localhost:4000/superheroes');
};

const RQSuperHeroesPage = () => {
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
         onSuccess: onSuccess, // side effect callback on success
         onError: onError, // side effect code on error
         select: (data) => {
            // function for transforming data if needed. Like a middleware that transforms and provides data that is required directly
            const newTransformedData = data.data.map((hero) => hero.name);
            return newTransformedData;
         },
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

         {/* {data?.data.map((hero) => {
            return <div key={hero.id}>{hero.name}</div>;
         })} */}

         {/* DATA AFTER TRANSFORMING in the 'select' function */}
         {data?.map((heroName) => {
            return <div key={heroName}>{heroName}</div>;
         })}
      </>
   );
};

export default RQSuperHeroesPage;
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

1. 'Polling' refers to fetching data at regular intervals, useful for stocks trading.

## How to disable fetch by default.

-  To stop useQuery hook from fetching on Component Mount, pass 'enabled: false' property in the 3rd argument object.

-  Destructure the function called `refetch` in the `useQuery` hook and pass it in the `onClick` event on a button, etc.

```js
const { isLoading, ... , refetch } = useQuery(
      '<unique-id-string>',
      fetchData,
      {
         enabled: false,  // this will stop useQuery from fetching automatically at Component Mount
      }

<button onClick={refetch}>fetch Data</button>
```

## Custom `useQuery' hook, for global configuration.

### the `useQuery` Custom Hook code example

```js
import { useQuery } from 'react-query';

import axios from 'axios';

// IMPORTANT: To stop useQuery hook from fetching on Mount, pass 'enabled: false' property in the 3rd argument object.

const fetchSuperHeroes = () => {
   return axios.get('http://localhost:4000/superheroes');
};

export const useSuperHeroesData = (onSuccess, onError) => {
   return useQuery('super-heroes', fetchSuperHeroes, {
      cacheTime: 120000, // 120 seconds, default is 5 minutes
      staleTime: 30000, // 30 seconds, stale data for 30 seconds, ie. wont fetch for 30 secs, then refetch fresh data in the background (DEFAULT IS 0 SECONDS)
      refetchOnMount: true, // true by default, will refetch on mount  if stale data, 'always' options will fetch even if data is not stale
      refetchOnWindowFocus: true, // default: true, refetches fresh data when browser tab is on focus again, if data is stale. ('always' will always fetch)
      refetchInterval: false, // set to false by default, if set to 2000 for 2 seconds, will always fetch every 2 seconds, if tab in focus.
      refetchIntervalInBackground: true, // false by default, will refetch every interval even if tab is out of focus.
      enabled: false, // won't fetch on Component Mount (to prevent FETCHING BY DEFAULT ON COMPONENT MOUNT)
      onSuccess: onSuccess, // side effect callback on success
      onError: onError, // side effect code on error
      select: (data) => {
         // function for transforming data if needed. Like a middleware that transforms and provides data that is required directly
         const newTransformedData = data.data.map((hero) => hero.name);
         return newTransformedData;
      },
   });
};
```

-  In the component:

```js
const onSuccess = (data) => {
   // receives data, can be dispatched to 'redux' or other state manager
   // it should be 'data.data' for axios.
   console.log('perform side effect after data fetching successfully...');
};

// callback when there's error while fetching.
const onError = (error) => {
   console.log('perform side effect after encountering error..');
};

// call the custom hook
const { isLoading, data, isError, error, isFetching, refetch } =
   useSuperHeroesData(onSuccess, onError);
```

### Custom Query Hook for ID (Single Page)

-  the Custom Hook for Single ID

```js
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
```

-  In the component, pass the ID in custom hook:

```js
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

const { heroId } = useParams();
const { isLoading, data, isError, error } = useSuperHeroData(heroId);
```

## Fetching Multiple API Engpoints in parallel:

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
   return axios.get('http://localhost:4000/superheroes');
};

const fetchFriends = () => {
   return axios.get('http://localhost:4000/friends');
};

const ParallelQuerries = () => {
   // use ALIASES to prevent variable name clash
   const { data: superHeroesData } = useQuery('super-heroes', fetchSuperHeroes);
   const { data: friendsData } = useQuery('friends', fetchFriends);

   return <div>ParallelQuerries</div>;
};

export default ParallelQuerries;
```

## Fetching Dynamic Multiple API Engpoints in parallel:

-  Import `useQueries` from 'react-query'.

```js
import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId) => {
   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// heroIds is an Array of Hero IDs
const DynamicParallelPage = ({ heroIds }) => {
   // Another way of caling useQuery, to prevent violating the rules of hooks
   // useQueries return an Array of query Results
   const queryResults = useQueries(
      heroIds.map((id) => {
         return {
            queryKey: ['super-hero', id],
            queryFn: () => fetchSuperHero(id),
         };
      })
   );

   console.log({ queryResults });

   return <div>DynamicParallelPage</div>;
};

export default DynamicParallelPage;
```

## Fetching API Engpoints sequentially, one after another.

-  When one query is dependent on another query.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) => {
   return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
   return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueries = ({ email }) => {
   // the LoggedIn user's email is passed as a prop
   const { data: user } = useQuery(['user', email], () =>
      fetchUserByEmail(email)
   );
   const channelId = user?.data.channelId;

   // this useQuery should only be fired when the channelId has been retrieved above.
   const { data: coursesData } = useQuery(
      ['courses', channelId],
      () => fetchCoursesByChannelId(channelId),
      {
         enabled: !!channelId,
      }
   );

   console.log(coursesData?.data.courses);

   return (
      <div>
         <h1>DependentQueries</h1>

         {coursesData?.data.courses.map((course) => {
            return <h2 key={course}>{course}</h2>;
         })}
      </div>
   );
};
```

## Initial Query Data

```js
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

// destructure react-query params
const fetchSuperHero = ({ queryKey }) => {
   // ID is in index postion 1
   const heroId = queryKey[1];
   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
   // IMPORTANT: react-query automatically passes the ID in fetcher function

   // queryClient instance has access to data cache
   const queryClient = useQueryClient();
   return useQuery(['super-hero', heroId], fetchSuperHero, {
      initialData: () => {
         // pass the query id, for which cache data is needed
         const hero = queryClient
            .getQueriesData('super-heroes')
            ?.data?.find((hero) => hero.id === parseInt(heroId));

         if (hero) {
            return { data: hero };
         } else {
            return undefined; // imp
         }
      },
   });
};
```

## Paginated Queries

-  json-server supports pagination. So better to do pagination with REST API, not from frontend. Example API Endpoint:

   `http://localhost:4000/colors?_limit=2&_page=2`

```js
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchColors = (pageNumber) => {
   return axios.get(
      `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
   );
};

export const PaginatedQueriesPage = () => {
   const [pageNumber, setPageNumber] = useState(1);
   const { isLoading, isError, error, data, isFetching } = useQuery(
      ['colors', pageNumber],
      () => fetchColors(pageNumber),
      {
         keepPreviousData: true, // maintain data from last successfull fetch
      }
   );

   if (isLoading) {
      return <h2>Loading...</h2>;
   }

   if (isError) {
      return <h2>{error.message}</h2>;
   }

   return (
      <>
         <div>
            {data?.data.map((color) => {
               return (
                  <div key={color.id}>
                     <h2>
                        {color.id}. {color.label}
                     </h2>
                  </div>
               );
            })}
         </div>

         <div>
            <button
               onClick={() => setPageNumber((page) => page - 1)}
               disabled={pageNumber === 1}>
               Prev Page
            </button>
            <button
               onClick={() => setPageNumber((page) => page + 1)}
               disabled={pageNumber === 4}>
               Next Page
            </button>
         </div>

         {isFetching && 'Loading'}
      </>
   );
};
```

## Infinite Queries

```js
import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

// pageParam refers to PageNumber
const fetchColors = ({ pageParam = 1 }) => {
   return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
   const {
      isLoading,
      isError,
      error,
      data,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
   } = useInfiniteQuery(['colors'], fetchColors, {
      getNextPageParam: (_lastPage, pages) => {
         // hardcoded values due to json-server limitation
         if (pages.length < 4) {
            return pages.length + 1;
         } else {
            return undefined;
         }
      },
   });

   if (isLoading) {
      return <h2>Loading...</h2>;
   }

   if (isError) {
      return <h2>{error.message}</h2>;
   }

   return (
      <>
         <div>
            {data?.pages.map((group, i) => {
               return (
                  <Fragment key={i}>
                     {group.data.map((color) => (
                        <h2 key={color.id}>
                           {color.id} {color.label}
                        </h2>
                     ))}
                  </Fragment>
               );
            })}
         </div>

         <div>
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
               Load more
            </button>
         </div>
         <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </>
   );
};
```

## Mutations (POST - Sending Data to Backend)

-  Mutations are what we use to Create, Update or Delete data in react-query.

Code for Custom hook:

```js
// fetcher for useMutation
const addSuperHero = (hero) => {
   return axios.post('http://localhost:4000/superheroes', hero);
};

export const useAddSuperHeroData = () => {
   // doesn't need a key, just a mutation function
   return useMutation(addSuperHero);
};
```

In the Component:

```js
// Alias mutate function, if multiple
const {
   mutate: addHero,
   isLoading: isAddHeroLoading,
   isError: isAddHeroError,
   error: addHeroError,
} = useAddSuperHeroData();

const handleAddHeroClick = () => {
   console.log({ name, alterEgo });

   const hero = { name, alterEgo };
   addHero(hero);
};
```

## Query Invalidation (Automatically Refetch After Mutation)

- Add the below code in Custom Hook:

```js
import { useQueryClient } from 'react-query';

// Custom Hook for useMutation
export const useAddSuperHeroData = () => {
   const queryClient = useQueryClient();

   // doesn't need a key, just a mutation function
   return useMutation(addSuperHero, {
      onSuccess: () => {
         // callback after successful mutation
         // key is from the fetch useQuery above
         queryClient.invalidateQueries('super-heroes');
      }
   })
}
```

## Alternative for Query Invalidation