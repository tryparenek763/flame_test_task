export const getPeople = async (searchParam?: string) => {
  const url = searchParam
    ? 'https://swapi.dev/api/people?' + new URLSearchParams({ search: searchParam }).toString()
    : 'https://swapi.dev/api/people'

  return (await fetch(url)).json()
}
export const getPersonById = async (id: string) => {
  return (await fetch(`https://swapi.dev/api/people/${id}`)).json()
}
