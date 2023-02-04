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

App.jsx Code:

```js
import { QueryClient, QueryClientProvider } from 'react-query';


```