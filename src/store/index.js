import { createStore } from 'vuex'
import PeopleStore from './modules/common'

export default createStore({
  modules: {
    common: PeopleStore
  }
})
