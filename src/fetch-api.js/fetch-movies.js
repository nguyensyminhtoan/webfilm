const api = 'https://phimapi.com'

async function fetchMovies(endpoint)
{
  try
  {
    const response = await fetch(`${api}/${endpoint}?page=0`)
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