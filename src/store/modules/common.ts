import { PeopleListBriefWithId } from '@/shared/types'
import { ADD_FAVORITE_PERSON, REMOVE_FAVORITE_PERSON } from '../mutations'
import { GET_FAVORITES_PEOPLE } from '../actions'

interface PeopleStore {
  favoritesPeople: PeopleListBriefWithId[]
}

const PeopleStore = {
  state: {
    favoritesPeople: []
  },

  actions: {
    [GET_FAVORITES_PEOPLE]: (state: PeopleStore): PeopleListBriefWithId[] => {
      return state.favoritesPeople
    }
  },

  mutations: {
    [ADD_FAVORITE_PERSON]: (state: PeopleStore, people: PeopleListBriefWithId) => {
      const isIncludedOnList = state.favoritesPeople.find((el: PeopleListBriefWithId) => el.id === people.id)

      if (!isIncludedOnList) {
        state.favoritesPeople.push(people)
      }
    },
    [REMOVE_FAVORITE_PERSON]: (state: PeopleStore, people: PeopleListBriefWithId) => {
      const findedIndex = state.favoritesPeople.findIndex((el: PeopleListBriefWithId) => el.id === people.id)

      if (findedIndex > -1) {
        state.favoritesPeople.splice(findedIndex, 1)
      }
    }
  }
}
export default PeopleStore
