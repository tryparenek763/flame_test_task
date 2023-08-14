export interface Columns {
    key: string,
    label: string,
}

export interface PeopleListBrief {
    name: string,
    height: string,
    'hair_color': string,
    mass: string
}

export interface PeopleList extends PeopleListBrief {
    'skin_color': string,
    'eye_color': string,
    'birth_year': string,
    gender: string,
    homeworld: string, // example: 'https://swapi.dev/api/planets/1/',
    films: string[], // example: ['https://swapi.dev/api/films/1/'],
    species: string[],
    vehicles: string[], // example: ['https://swapi.dev/api/vehicles/14/']
    starships: string[], // example: ['https://swapi.dev/api/starships/12/']
    created: string | Date,
    edited: string | Date,
    url: string, // example: 'https://swapi.dev/api/people/1/
}
