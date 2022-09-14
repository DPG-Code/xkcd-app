import algoliasearch from 'algoliasearch'

const APP_ID = process.env.APP_ID
const API_KEY = process.env.API_KEY

const client = algoliasearch(APP_ID, API_KEY)
const index = client.initIndex('prod_comics')

const CACHE = {}

export const search = async ({ query }) => {
  if(CACHE[query]) return { results: CACHE[query] }

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt', 'day', 'month', 'year'],
    hitsPerPage: 10
  })

  CACHE[query] = hits

  return { results: hits }
}