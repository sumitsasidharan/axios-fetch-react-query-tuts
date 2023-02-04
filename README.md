## REACT TANSTACK QUERY TUTORIAL

### STEP 1

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
