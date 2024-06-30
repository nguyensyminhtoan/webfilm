const api = 'https://phimapi.com'

async function fetchMovies(endpoint, page)
{
  try
  {
    const response = await fetch(`${api}/${endpoint}?${page}`)
    if (!response.ok)
    {
      throw new Error(`Fetch request failed with status ${response.status}`);
    }
    const data = await response.json()
    return data
  } catch (error)
  {
    throw new Error(`Fetch request failed with status ${response.status}`);
  }
}
export default fetchMovies