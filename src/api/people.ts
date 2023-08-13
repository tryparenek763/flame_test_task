export const getPeople = async () => (await fetch('https://swapi.dev/api/people')).json()
