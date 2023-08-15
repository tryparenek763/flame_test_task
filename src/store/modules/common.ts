import { PeopleBriefWithId } from '@/shared/types'
import { ADD_FAVORITE_PERSON, ADD_FROM_STORAGE, REMOVE_FAVORITE_PERSON } from '../mutations'
import { INITIALIZE_STORE, GET_FAVORITES_PEOPLE } from '../actions'

interface PeopleStore {
  favoritesPeople: PeopleBriefWithId[]
}

const PeopleStore = {
  state: {
    favoritesPeople: []
  },

  actions: {
    [INITIALIZE_STORE]: ({ commit }: any) => {
      if (localStorage.getItem('common')) {
        commit(ADD_FROM_STORAGE, JSON.parse(localStorage.getItem('common') as string).favoritesPeople)
      }
    },
    [GET_FAVORITES_PEOPLE]: (state: PeopleStore): PeopleBriefWithId[] => {
      return state.favoritesPeople
    }
  },

  mutations: {
    [ADD_FROM_STORAGE]: (state: PeopleStore, storageData: PeopleBriefWithId[]) => {
      state.favoritesPeople = storageData
    },
    [ADD_FAVORITE_PERSON]: (state: PeopleStore, people: PeopleBriefWithId) => {
      const isIncludedOnList = state.favoritesPeople.find((el: PeopleBriefWithId) => el.id === people.id)

      if (!isIncludedOnList) {
        state.favoritesPeople.push(people)
        localStorage.setItem('common', JSON.stringify(state))
      }
    },
    [REMOVE_FAVORITE_PERSON]: (state: PeopleStore, people: PeopleBriefWithId) => {
      const findedIndex = state.favoritesPeople.findIndex((el: PeopleBriefWithId) => el.id === people.id)

      if (findedIndex > -1) {
        state.favoritesPeople.splice(findedIndex, 1)
        localStorage.setItem('common', JSON.stringify(state))
      }
    }
  }
}

export default PeopleStore
