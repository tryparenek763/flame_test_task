export interface Columns {
    key: string,
    label: string,
}

export interface PeopleBrief {
    name: string,
    height: string,
    'hair_color': string,
    mass: string,
}
export interface PeopleBriefWithId extends PeopleBrief {
    id: string,
}

export interface People extends PeopleBrief {
    'skin_color': string,
    'eye_color': string,
    'birth_year': string,
    gender: string,
    homeworld: string, // example: 'https://swapi.dev/api/planets/1/',
    films: string[], // example: ['https://swapi.dev/api/films/1/'],
    species: string[],
    vehicles: string[], // example: ['https://swapi.dev/api/vehicles/14/']
    starships: string[], // example: ['https://swapi.dev/api/starships/12/']
    created: string,
    edited: string,
    url: string, // example: 'https://swapi.dev/api/people/1/
}
