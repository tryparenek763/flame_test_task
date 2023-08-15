import { PeopleListBriefWithId } from '@/shared/types'
import { ADD_FAVORITE_PERSON, ADD_FROM_STORAGE, REMOVE_FAVORITE_PERSON } from '../mutations'
import { INITIALIZE_STORE, GET_FAVORITES_PEOPLE } from '../actions'

interface PeopleStore {
  favoritesPeople: PeopleListBriefWithId[]
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
    [GET_FAVORITES_PEOPLE]: (state: PeopleStore): PeopleListBriefWithId[] => {
      return state.favoritesPeople
    }
  },

  mutations: {
    [ADD_FROM_STORAGE]: (state: PeopleStore, storageData: PeopleListBriefWithId[]) => {
      state.favoritesPeople = storageData
    },
    [ADD_FAVORITE_PERSON]: (state: PeopleStore, people: PeopleListBriefWithId) => {
      const isIncludedOnList = state.favoritesPeople.find((el: PeopleListBriefWithId) => el.id === people.id)

      if (!isIncludedOnList) {
        state.favoritesPeople.push(people)
        localStorage.setItem('common', JSON.stringify(state))
      }
    },
    [REMOVE_FAVORITE_PERSON]: (state: PeopleStore, people: PeopleListBriefWithId) => {
      const findedIndex = state.favoritesPeople.findIndex((el: PeopleListBriefWithId) => el.id === people.id)

      if (findedIndex > -1) {
        state.favoritesPeople.splice(findedIndex, 1)
        localStorage.setItem('common', JSON.stringify(state))
      }
    }
  }
}

export default PeopleStore
